import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PhInput from "../../../components/form/PhInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFacultySchema } from "../../../validations/academicSchemas";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateAcademicFacultyMutation } from "../../../redux/feature/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { TAcademicFaculty } from "../../../types/academicManagementTypes";
import { toast } from "sonner";

const CreateAcademicFaculty = () => {
  const [createFaculty] = useCreateAcademicFacultyMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    const payload = {
      name: data.name,
    };
    try {
      const res = (await createFaculty(payload)) as TResponse<TAcademicFaculty>;
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Faculty Created Created");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <h2>Create Academic Faculty</h2>
        <PHForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createFacultySchema)}
        >
          <PhInput key="name" name="name" label="Name" type="text"></PhInput>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
