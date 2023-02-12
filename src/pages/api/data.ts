// /api/data?table=FILENAME (.csv nélkül)

import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import path from 'path';

type SubjectData = {
    subject_code: string
    subject_field: string
    subject_weekly_distribution: WeeklyLessonDistribution;
    exam_type: string
    credit_value: number
    recommended_semesters: number[]
    requirements: RequiredSubject[]
    subject_type: string
    specialization_ftm: string
}

type RequiredSubject = {
    subject_code: string
    is_weak: boolean
}

type WeeklyLessonDistribution = {
    lecture_count: number
    exercise_count: number
    lab_count: number
    consultation_count: number
}

function parseSubjectsCSV(fileName: string): SubjectData[] {
    const fileData = fs.readFileSync(fileName, 'utf8');
    const lines = fileData.trim().split('\r').slice(1);
    let data = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const fields = line.split(';').map((x) => x.replace('\n', '').trim());

        let record = {} as SubjectData;
        let lessonDistribution = {} as WeeklyLessonDistribution;
        let requirements = [] as RequiredSubject[];

        record.subject_code = fields[0].replace(' ', '');
        record.subject_field = fields[1];

        lessonDistribution.lecture_count = parseInt(fields[2]);
        lessonDistribution.exercise_count = parseInt(fields[3]);
        lessonDistribution.lab_count = parseInt(fields[4]);
        lessonDistribution.consultation_count = parseInt(fields[5]);
        record.subject_weekly_distribution = lessonDistribution;

        record.exam_type = fields[6];
        record.credit_value = parseInt(fields[7]);
        record.recommended_semesters = fields[8].split(',').map((x) => parseInt(x));

        const requirementsCSVArray = fields[9].trim().split(', ');
        for (let j = 0; j < requirementsCSVArray.length; j++) {
            if (requirementsCSVArray[j] == "") continue;
            const currentRequirement = requirementsCSVArray[j];
            let requirement = {} as RequiredSubject;
            requirement.subject_code = currentRequirement.split('(gyenge)')[0].replace(' ', '');
            requirement.is_weak = currentRequirement.includes('(gyenge)');
            requirements.push(requirement);
        }
        record.requirements = requirements;

        record.subject_type = fields[16];
        if (fields[17] == null)
            record.specialization_ftm = '-';
        else
            record.specialization_ftm = fields[17];

        data.push(record);
    }

    return data;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SubjectData[]>
) {
    const dataDirectory = path.join(process.cwd(), 'data\\csv');
    const filename = req.query.table;
    const filePath = dataDirectory + '\\' + filename + '.csv';
    if (!fs.existsSync(filePath)) {
        res.status(400).json([])
        return;
    }
    const jsonData = parseSubjectsCSV(filePath);
    res.status(200).json(jsonData)
}
