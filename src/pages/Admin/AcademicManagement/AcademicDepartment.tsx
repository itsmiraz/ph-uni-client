import { Table, TableColumnsType } from "antd";
import { useGetAllacademicAcademicDepartmentQuery } from "../../../redux/feature/admin/academicManagement.api";

type TTableProps = {
  name: string;
  academicFaculty: string;
};

export const AcademicDepartment = () => {
  const { data: deparmentData, isFetching } =
    useGetAllacademicAcademicDepartmentQuery(undefined);
  const data = deparmentData?.data?.map(({ _id, name, academicFaculty }) => ({
    key: _id,
    name,
    academicFaculty: academicFaculty?.name,
  }));
  const columns: TableColumnsType<TTableProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
  ];

  return (
    <div>
      <h2>Academic Department</h2>
      <Table loading={isFetching} columns={columns} dataSource={data} />
    </div>
  );
};
