import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllacademicSemisterQuery } from "../../../redux/feature/admin/academicManagement.api";
import { TAcademicSemister } from "../../../types/academicSemsterTypes";

const AcademicSemiseter = () => {
  const { data: semesterData } = useGetAllacademicSemisterQuery(undefined);

  console.log(semesterData);

  const data = semesterData?.data?.map(
    ({ _id, name, year, endMonth, startMonth }) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  type TTableDataType = Pick<
    TAcademicSemister,
    "_id" | "name" | "year" | "startMonth" | "endMonth"
  >;

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<TTableDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default AcademicSemiseter;
