import { z } from "zod";

export const createStudentDataSchema = z.object({
  name: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  email: z.string().email(),
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.string(), // You might want to use z.date() if you want to validate the date format
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  contactNumber: z.string().length(10),
  emergencyContactNo: z.string().length(10),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  admissionSemester: z.string(),
  academicDepartment: z.string(),
  Guardian: z.object({
    fatherName: z.string(),
    fatherContact: z.string().length(10),
    fatherOccupation: z.string(),
    motherName: z.string(),
    motherContact: z.string().length(10),
    motherOccupation: z.string(),
  }),
  localGuardian: z.object({
    occupation: z.string(),
    name: z.string(),
    contact: z.string().length(10),
    address: z.string(),
  }),
});
