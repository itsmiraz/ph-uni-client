import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemister,
} from "./academicManagementTypes";

export type TUser = {
  userId: number;
  role: string;
  iat: number;
  exp: number;
};

// {userId: '2025010001', role: 'student', iat: 1707730105, exp: 1708334905}

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
export type TFaculty = {
  _id: string;
  id: string;
  user: string;
  name: TUserName;
  gender: string;
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  designation: string;
  profile?: string;
  isDeleted: boolean;
};
