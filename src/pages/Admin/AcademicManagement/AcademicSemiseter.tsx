import { useGetAllacademicSemisterQuery } from "../../../redux/feature/admin/academicManagement.api";

const AcademicSemiseter = () => {
  const { data } = useGetAllacademicSemisterQuery(undefined);
  console.log(data);

  return <div>AcademicSemiseter</div>;
};

export default AcademicSemiseter;
