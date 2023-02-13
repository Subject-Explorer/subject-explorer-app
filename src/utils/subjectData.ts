export default interface SubjectData {
  id: string;
  name: string;
  lessonCount: LessonCount;
  test: string;
  credit: number;
  semesters: number[];
  prerequisites: Prerequisite[];
  field: Field;
  specializations: Specialization[];
}
export type Field = "informatics" | "computers" | "mathematics";
export type Specialization = "A" | "B" | "C";
export interface LessonCount {
  lecture: number;
  practice: number;
  laboratory: number;
  consultation: number;
}
export interface Prerequisite{
    parent: string;
    weak: boolean;
}
