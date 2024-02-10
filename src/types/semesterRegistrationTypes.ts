import { TAcademicSemister } from "./academicManagementTypes";

export type TSemisterRegistration = {
  _id: string;
  academicSemester: TAcademicSemister;
  status: string;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
