import { Button, Col, Flex, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { RegistrationStatus } from "../../../constants/semester";
import PHSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllacademicSemisterQuery } from "../../../redux/feature/admin/academicManagement.api";
import PhInput from "../../../components/form/PhInput";
import PhDatePicker from "../../../components/form/PhDatePicker";
// import { toast } from "sonner";
// import { TResponse } from "../../../types/global";
// import { TAcademicSemister } from "../../../types/academicManagementTypes";

const SemesterRegistration = () => {
  const { data: semesterData, isFetching } = useGetAllacademicSemisterQuery([
    { name: "sort", value: "year" },
  ]);

  const semesterOptions = semesterData?.data?.map(item => ({
    label: `${item.name}-${item.year}`,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const payload = {
      ...data,
    };
    console.log(payload);
    // try {
    //   const res = (await createAcademicSemester(
    //     payload
    //   )) as TResponse<TAcademicSemister>;
    //   // console.log(res);
    //   // console.log(res);
    //   if (res?.error) {
    //     toast.error(res?.error?.data?.message || "Something Went Wrong");
    //   } else {
    //     toast.success("Semester Created");
    //   }
    // } catch (err: any) {
    //   toast.error(err?.data?.message || "Something Went Wrong");
    // }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={8}>
        <h2>Semester Registeration</h2>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            disabled={isFetching}
            options={semesterOptions}
          ></PHSelect>
          <PHSelect
            label="Status"
            name="status"
            options={RegistrationStatus}
          ></PHSelect>
          <PhInput label="Min Credit" name="minCredit" type="number" />
          <PhInput label="Max Credit" name="maxCredit" type="number" />
          <Row gutter={10}>
            <Col span={12}>
              <PhDatePicker label="Start Date" name="startDate" />
            </Col>
            <Col span={12}>
              <PhDatePicker label="End Date" name="endDate" />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
