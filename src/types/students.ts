import { CoursesType } from "./courses";

export type StudentsType = {
  id: number;
  name: string;
  nickname: string;
  phone: string;
  email: string;
};

export type StudentListType = {
  id: number;
  dp: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  major?: string;
  year: string;
  status: "good" | "probation" | "inactive" | "Withdrawn";
  total_courses?: number;
  courses: Omit<CoursesType, "id" | "user_id">[];
};
