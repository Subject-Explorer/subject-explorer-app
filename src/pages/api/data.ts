import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import path from 'path';
import SubjectData from '@/utils/subjectData';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SubjectData[]>
) {
    const dataDirectory = path.join(process.cwd(), 'public');
    let data = [] as SubjectData[];
    let datastring = fs.readFileSync(dataDirectory + '\\data.json', 'utf8');
    data = JSON.parse(datastring);
    res.status(200).json(data);
}