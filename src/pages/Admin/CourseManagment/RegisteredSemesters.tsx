import {
  Button,
  Dropdown,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TAcademicSemisterQueryParam } from "../../../types/academicManagementTypes";
import { useState } from "react";
import { useGetAllRegisteredSemstersQuery } from "../../../redux/feature/admin/semesterManagement.api";
import { TSemisterRegistration } from "../../../types/semesterRegistrationTypes";

type TTableDataType = Pick<
  TSemisterRegistration,
  "startDate" | "endDate" | "status"
>;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOIN",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const [Params, setParams] = useState<TAcademicSemisterQueryParam[]>([]);
  const [Page, setPage] = useState(1);

  const {
    data: registeredSemesterData,
    isFetching,
    isLoading,
  } = useGetAllRegisteredSemstersQuery([
    { name: "page", value: Page },
    { name: "limit", value: 6 },
    ...Params,
  ]);
  //   console.log(registeredSemesterData);
  const meta = registeredSemesterData?.meta;
  // console.log(registeredSemesterData);

  const data = registeredSemesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      academicSemester: `${academicSemester?.name} - ${academicSemester.year}`,
      startDate,
      endDate,
      status,
    })
  );

  const handleUpdateStatus = data => {
    console.log(data);
  };
  const menuProps = {
    items,
    onClick: handleUpdateStatus,
  };

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Academic Semester",
      dataIndex: "academicSemester",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },

    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Actions",
      dataIndex: "",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>Update</Button>
          </Dropdown>
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
      <h2>Registered Semesters</h2>
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

export default RegisteredSemesters;
