import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { AcadmicSemisterOptions } from "../../../constants/semester";
import PHSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { monthOptions } from "../../../constants/global";
import { createSemesterShcema } from "../../../validations/academicSchemas";
import { useCreateAcademicSemesterMutation } from "../../../redux/feature/admin/academicManagement.api";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map(year => ({
  label: String(year + currentYear),
  value: String(year + currentYear),
}));

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const name = AcadmicSemisterOptions[Number(data.name) - 1]?.label;

    const payload = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = await createAcademicSemester(payload);
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <h2>Create Academic Semester</h2>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createSemesterShcema)}
        >
          <PHSelect
            label="Name"
            name="name"
            options={AcadmicSemisterOptions}
          ></PHSelect>
          <PHSelect label="Year" name="year" options={yearOptions}></PHSelect>
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          ></PHSelect>
          <PHSelect
            label="End Month"
            name="endMonth"
            options={monthOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
