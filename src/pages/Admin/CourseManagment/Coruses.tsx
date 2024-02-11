import {
  Button,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TAcademicSemisterQueryParam } from "../../../types/academicManagementTypes";
import { useState } from "react";
import {
  useAssignFacultiesToCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/feature/admin/semesterManagement.api";
import { TCourse } from "../../../types/semesterRegistrationTypes";
import { useGetAllFacultiesQuery } from "../../../redux/feature/admin/userManagement.api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

type TTableDataType = Pick<TCourse, "title" | "code" | "credits">;

const Coures = () => {
  // const [updateSemesterRegister] = useUpdateSemesterRegisterMutation();
  const [Params, setParams] = useState<TAcademicSemisterQueryParam[]>([]);
  const [Page, setPage] = useState(1);

  const {
    data: registeredSemesterData,
    isFetching,
    isLoading,
  } = useGetAllCoursesQuery([
    { name: "page", value: Page },
    { name: "limit", value: 10 },
    ...Params,
  ]);
  //   console.log(registeredSemesterData);
  const meta = registeredSemesterData?.meta;
  // console.log(registeredSemesterData);

  const data = registeredSemesterData?.data?.map(
    ({ _id, title, code, credits }) => ({
      key: _id,
      title,
      code,
      credits,
    })
  );

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      dataIndex: "",
      render(item) {
        return <AssignFacultiesModal Coursedata={item} />;
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

const AssignFacultiesModal = ({ Coursedata }: { Coursedata: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(Coursedata);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);

  const [assignFaculties] = useAssignFacultiesToCourseMutation();

  // console.log(facultiesData[0]?.fullName);
  const facultiesOptions = facultiesData?.data?.map(item => ({
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
    value: item._id,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    const payload = {
      courseId: Coursedata?.key,
      data,
    };
    console.log(payload);
    try {
      const res = (await assignFaculties(payload)) as TResponse<any>;
      console.log(res);
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Faculties Assigned");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculties</Button>
      <Modal
        title="Assign Faculties"
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            label="Select Faculties"
            options={facultiesOptions}
            mode="multiple"
            name="faculties"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Coures;
