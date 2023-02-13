// /api/data?table=FILENAME (.csv nélkül)

import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import path from 'path';
import SubjectData, { LessonCount, Prerequisite } from '@/utils/subjectData';

function parseSubjectsCSV(fileName: string): SubjectData[] {
    const fileData = fs.readFileSync(fileName, 'utf8');
    const lines = fileData.trim().split('\r').slice(1);
    let data = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const fields = line.split(';').map((x) => x.replace('\n', '').trim());

        let record = {} as SubjectData;
        let lessonCount = {} as LessonCount;
        let prerequisites = [] as Prerequisite[];

        record.id = fields[0].replace(' ', '');
        record.name = fields[1];

        lessonCount.lecture = parseInt(fields[2]);
        lessonCount.practice = parseInt(fields[3]);
        lessonCount.laboratory = parseInt(fields[4]);
        lessonCount.consultation = parseInt(fields[5]);
        record.lessonCount = lessonCount;

        record.test = fields[6];
        record.credit = parseInt(fields[7]);
        record.semesters = fields[8].split(',').map((x) => parseInt(x));

        const requirementsCSVArray = fields[9].trim().split(', ');
        for (let j = 0; j < requirementsCSVArray.length; j++) {
            if (requirementsCSVArray[j] == "") continue;
            const currentRequirement = requirementsCSVArray[j];
            let prerequisite = {} as Prerequisite;
            prerequisite.parent = currentRequirement.split('(gyenge)')[0].replace(' ', '');
            prerequisite.weak = currentRequirement.includes('(gyenge)');
            prerequisites.push(prerequisite);
        }
        record.prerequisites = prerequisites;

        switch (fields[16]) {
            case 'Inf':
                record.field = 'informatics';
                break;
            case 'Szám':
                record.field = 'computers';
                break;
            case 'Mat':
                record.field = 'mathematics';
                break;
        }

        if (fields[17] == null)
            record.specializations = [];
        else {
            if (fields[17].includes('M'))
                record.specializations.push('A');
            if (fields[17].includes('T'))
                record.specializations.push('B');
            if (fields[17].includes('F'))
                record.specializations.push('C');
        }

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