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
  gender: "Male" | "Female";
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "B+" | "AB+" | "O+";
  presentAddress: string;
  permanentAddress: string;
  Guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profile?: string;
  admissionSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  isDeleted: boolean;
};
