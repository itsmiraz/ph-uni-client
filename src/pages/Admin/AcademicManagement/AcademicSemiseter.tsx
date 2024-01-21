import { useAcademicSemisterQuery } from "../../../redux/feature/academicSemister/academicSemisterApi";

const AcademicSemiseter = () => {
  const { data, error } = useAcademicSemisterQuery(undefined);
  console.log(data);
  console.log(error);

  return <div>AcademicSemiseter</div>;
};

export default AcademicSemiseter;
