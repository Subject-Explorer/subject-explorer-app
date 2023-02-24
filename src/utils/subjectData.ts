export default interface SubjectData {
  id: string;
  type: SubjectType;
  name: string;
  lessonCount: LessonCount;
  test: Test;
  credit: number;
  semesters: number[];
  children: string[];
  siblings: string[];
  field: Field;
  specializations: Specialization[];
}
export type Field = "informatika" | "számítástechnika" | "matematika" | "egyéb";
export type Specialization = "A" | "B" | "C";
export type Test = "G" | "K" | "FG" | "XG" | "XFG" | "XK";
export type SubjectType = "torzsanyag" | "spec-kot" | "spec-kotval";

export interface LessonCount {
  lecture: number;
  practice: number;
  laboratory: number;
  consultation: number;
}
export interface Prerequisite {
  id: string;
  weak: boolean;
}
