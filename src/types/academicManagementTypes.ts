export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemisterNames = "Autumn" | "Summer" | "Fall";
export type TAcademicSemisterCodes = "01" | "02" | "03";

export type TAcademicSemister = {
  _id: string;
  name: TAcademicSemisterNames;
  code: TAcademicSemisterCodes;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};
export type TAcademicSemisterQueryParam = {
  name: string;
  value: boolean | React.Key;
};
export type TAcademicFaculty = {
  name: string;
};
