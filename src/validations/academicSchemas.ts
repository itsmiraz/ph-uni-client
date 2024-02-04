import { z } from "zod";

export const createSemesterShcema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  startMonth: z.string({ required_error: "Please select a Month" }),
  endMonth: z.string({ required_error: "Please select a Month" }),
  year: z.string({ required_error: "Please select a Year" }),
});
