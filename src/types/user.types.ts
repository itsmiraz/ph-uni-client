import {
  TAcademicDepartment,
  TAcademicSemister,
} from "./academicManagementTypes";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contact: string;
  address: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TStuedent = {
  id: string;
  user: string;
  name: TUserName;
  fullName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: string;
  presentAddress: string;
  permanentAddress: string;
  Guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profile?: string;
  admissionSemester: TAcademicSemister;
  academicDepartment: TAcademicDepartment;
  academicFaculty: string;
  isDeleted: boolean;
  _id: string;
};
