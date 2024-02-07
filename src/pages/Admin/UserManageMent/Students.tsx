import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TAcademicSemisterQueryParam } from "../../../types/academicManagementTypes";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/feature/admin/userManagement.api";
import { TStuedent } from "../../../types/user.types";
type TTableDataType = Pick<TStuedent, "fullName">;
const Students = () => {
  const [Params, setParams] = useState<TAcademicSemisterQueryParam[]>([]);
  const [Page, setPage] = useState(1);

  const {
    data: stuentsData,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    { name: "page", value: Page },
    { name: "limit", value: 6 },
    { name: "sort", value: "id" },
    ...Params,
  ]);
  //   console.log(stuentsData);
  const meta = stuentsData?.meta;
  // console.log(stuentsData);

  const data = stuentsData?.data?.map(
    ({ _id, fullName, id, academicDepartment }) => ({
      key: _id,
      fullName,
      id,
      academicDepartment: academicDepartment.name,
      academicFaculty: academicDepartment.academicFaculty.name,
    })
  );

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Student Id",
      dataIndex: "id",
    },
    {
      title: "Academic Department",
      dataIndex: "academicDepartment",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },

    {
      title: "Actions",
      dataIndex: "",
      render: () => {
        return (
          <Space>
            {/* <Link to={`/admin/student-data/${item.key}`}> */}
            <Button>Details</Button>
            {/* </Link> */}
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TTableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);

    if (extra.action === "filter") {
      const queryPramas: TAcademicSemisterQueryParam[] = [];
      filters.name?.forEach(item =>
        queryPramas.push({ name: "name", value: item })
      );
      setParams(queryPramas);
    }
  };

  return (
    <div>
      <h2>Academic Semesters</h2>
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={Page}
        onChange={value => setPage(value)}
        pageSize={meta?.limit}
        total={meta?.total}
      />
    </div>
  );
};

export default Students;
