import { Table, TableColumnsType } from "antd";
import { useGetAllacademicFacultyQuery } from "../../../redux/feature/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagementTypes";

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAllacademicFacultyQuery(undefined);

  const data = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<Pick<TAcademicFaculty, "name">> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  return (
    <div>
      <h2>Academic Faculties</h2>
      <Table loading={isFetching} columns={columns} dataSource={data} />
    </div>
  );
};

export default AcademicFaculty;
