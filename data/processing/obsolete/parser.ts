export {};
/*
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import path from 'path';
import SubjectData, { LessonCount, Prerequisite, Test } from '@/utils/subjectData';

let alldata = [[],[],[],[],[],[]] as SubjectData[][];

function parseSubjectsCSV(fileName: string, letter: string) {
    // read the file
    const fileData = fs.readFileSync(fileName, 'utf8');

    // split the file into lines, remove the first line (header)
    const lines = fileData.trim().split('\r').slice(1);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const fields = line.split(';').map((x) => x.replace('\n', '').trim());

        let record = {} as SubjectData;
        let lessonCount = {} as LessonCount;
        let prerequisites = [] as Prerequisite[];

        record.id = fields[0] + '_' + letter;
        record.code = fields[0];
        record.name = fields[1];

        lessonCount.lecture = parseInt(fields[2]);
        lessonCount.practice = parseInt(fields[3]);
        lessonCount.laboratory = parseInt(fields[4]);
        lessonCount.consultation = parseInt(fields[5]);
        record.lessonCount = lessonCount;

        record.test = fields[6] as Test;
        record.credit = parseInt(fields[7]);
        record.semesters = fields[8].split(',').map((x) => parseInt(x));

        const requirementsCSVArray = fields[9].trim().split(', ');
        for (let j = 0; j < requirementsCSVArray.length; j++) {
            if (requirementsCSVArray[j] == "") continue;
            const currentRequirement = requirementsCSVArray[j];
            let prerequisite = {} as Prerequisite;
            prerequisite.id = currentRequirement.split('(gyenge)')[0].replace(' ', '');
            prerequisite.weak = currentRequirement.includes('(gyenge)');
            prerequisites.push(prerequisite);
        }
        record.prerequisites = prerequisites;

        switch (fields[16]) {
            case 'Inf':
                record.field = 'informatika';
                break;
            case 'Szám':
                record.field = 'számítástechnika';
                break;
            case 'Mat':
                record.field = 'matematika';
                break;
        }

        if (fields[17] == null) {
            if (letter != '') {
                record.specializations = [letter as 'A' | 'B' | 'C'];
            } else {
                record.specializations = ['A', 'B', 'C'];
            }
        }
        else {
            record.specializations = [];
            if (fields[17].includes('M'))
                record.specializations.push('A');
            if (fields[17].includes('T'))
                record.specializations.push('B');
            if (fields[17].includes('F'))
                record.specializations.push('C');
        }

        alldata[record.semesters[0] - 1].push(record);
    }
}

function parseCVSs(files: string[]) {
    const dataDirectory = path.join(process.cwd(), 'data\\csv');
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = dataDirectory + '\\' + file;
        if (file[0] == 't')
            parseSubjectsCSV(filePath, '');
        else
            parseSubjectsCSV(filePath, file[0]);
    }
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SubjectData[][]>
) {
    const filesToProcess = [
        "A_spec_kotelezo.csv",
        "A_spec_kotval.csv",
        "B_spec_kotelezo.csv",
        "B_spec_kotval.csv",
        "C_spec_kotelezo.csv",
        "C_spec_kotval.csv",
        "torzsanyag.csv",
    ];
    alldata = [[],[],[],[],[],[]] as SubjectData[][];
    parseCVSs(filesToProcess);
    //fs.writeFileSync('\\public\\data.json', JSON.stringify(alldata));
    res.status(200).json(alldata);
}
*/