import { Field, Specialization, Test } from "./subjectData";

export default interface Settings {
  query: string;
  fields: CheckGroup<Field>;
  specializations: CheckGroup<Specialization>;
  tests: CheckGroup<Test>;
  credits: CreditRange;
}

export type MaybeSettings = Partial<Settings>;

export interface Check<T> {
  value: T;
  label: string;
  checked: boolean;
}
export type CheckGroup<T> = Check<T>[];

export type CreditRange = {
  min: number;
  max: number;
};
