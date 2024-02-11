import { TAcademicSemister } from "./academicManagementTypes";
import { TFaculty } from "./user.types";

export type TSemisterRegistration = {
  _id: string;
  academicSemester: TAcademicSemister;
  status: string;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};

export type TPreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: TPreRequisiteCourse[];
};
export type TCourseFaculty = {
  _id: string;
  course: TCourse;
  faculties: [TFaculty];
};
