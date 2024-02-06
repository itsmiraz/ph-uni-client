import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import PHSelect from "../../../components/form/PhSelect";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllacademicFacultyQuery,
} from "../../../redux/feature/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { createDepartmentSchema } from "../../../validations/academicSchemas";
import PhInput from "../../../components/form/PhInput";
import { TResponse } from "../../../types/global";
import { TAcademicDepartment } from "../../../types/academicManagementTypes";
import { toast } from "sonner";

const CreateAcadmicDepartment = () => {
  const { data: Faculties } = useGetAllacademicFacultyQuery(undefined);
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const facultiesOption = Faculties?.data?.map(item => ({
    label: String(item.name),
    value: String(item._id),
  }));

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const payload = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await createAcademicDepartment(
        payload
      )) as TResponse<TAcademicDepartment>;
      // console.log(res);
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Academic Deparment Created");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div>
      <Flex align="center" justify="center">
        <Col span={6}>
          <h2>Create Academic Semester</h2>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(createDepartmentSchema)}
          >
            <PhInput key="name" name="name" label="Name" type="text"></PhInput>

            <PHSelect
              label="Select Academic Faculty"
              name="academicFaculty"
              options={facultiesOption!}
            ></PHSelect>

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcadmicDepartment;
