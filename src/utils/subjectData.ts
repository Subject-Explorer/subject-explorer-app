export default interface SubjectData {
  id: string;
  name: string;
  lessonCount: LessonCount;
  test: string;
  credit: number;
  semesters: number[];
  prerequisites: string[];
  field: "informatics" | "computers" | "mathematics";
  specializations: ("A" | "B" | "C")[];
}

interface LessonCount {
  lecture: number;
  practice: number;
  laboratory: number;
  consultation: number;
}
