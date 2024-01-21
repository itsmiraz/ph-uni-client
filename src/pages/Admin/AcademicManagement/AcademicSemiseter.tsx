import { useAcademicSemisterQuery } from "../../../redux/feature/academicSemister/academicSemisterApi";

const AcademicSemiseter = () => {
  const { data, error } = useAcademicSemisterQuery(undefined);
  console.log(data);

  return <div>AcademicSemiseter</div>;
};

export default AcademicSemiseter;
