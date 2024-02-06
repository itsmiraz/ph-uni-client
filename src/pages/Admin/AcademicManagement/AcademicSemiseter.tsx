import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllacademicSemisterQuery } from "../../../redux/feature/admin/academicManagement.api";
import {
  TAcademicSemister,
  TAcademicSemisterQueryParam,
} from "../../../types/academicManagementTypes";
import { useState } from "react";
type TTableDataType = Pick<
  TAcademicSemister,
  "name" | "year" | "startMonth" | "endMonth"
>;
const AcademicSemiseter = () => {
  const [Params, setParams] = useState<
    TAcademicSemisterQueryParam[] | undefined
  >([]);

  const { data: semesterData, isFetching } =
    useGetAllacademicSemisterQuery(Params);

  // console.log(semesterData);

  const data = semesterData?.data?.map(
    ({ _id, name, year, endMonth, startMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default AcademicSemiseter;
