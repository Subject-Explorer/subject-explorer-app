export default interface SubjectData {
  id: string;
  code: string;
  name: string;
  lessonCount: LessonCount;
  test: Test;
  credit: number;
  semesters: number[];
  prerequisites: Prerequisite[];
  field: Field;
  specializations: Specialization[];
}
export type Field = "informatika" | "számítástechnika" | "matematika";
export type Specialization = "A" | "B" | "C";
export type Test = "G" | "K" | "FG" | "XG" | "XFG" | "XK";

export interface LessonCount {
  lecture: number;
  practice: number;
  laboratory: number;
  consultation: number;
}
export interface Prerequisite{
    id: string;
    weak: boolean;
}
