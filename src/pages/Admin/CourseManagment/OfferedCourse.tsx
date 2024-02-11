import { Button, Col, Flex, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { Days } from "../../../constants/semester";
import PHSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetAllacademicAcademicDepartmentQuery,
  useGetAllacademicFacultyQuery,
} from "../../../redux/feature/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemstersQuery,
  useGetAssinedFacultiesToCourseQuery,
  useOfferCourseMutation,
} from "../../../redux/feature/admin/semesterManagement.api";
import { useState } from "react";
import PHSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import PhInput from "../../../components/form/PhInput";
import PHTimePicker from "../../../components/form/PhTimePicker";

const OfferedCourse = () => {
  const [SelectedCourse, setSelectedCourse] = useState("");
  const [offerCourse] = useOfferCourseMutation();
  const { data: registerSemsters } =
    useGetAllRegisteredSemstersQuery(undefined);
  const { data: academicFacultyData } =
    useGetAllacademicFacultyQuery(undefined);
  const { data: academicDdata } =
    useGetAllacademicAcademicDepartmentQuery(undefined);
  const { data: coursedata } = useGetAllCoursesQuery(undefined);

  const registereSemesterOptions = registerSemsters?.data?.map(item => ({
    label: `${item.academicSemester.name} - ${item.academicSemester.year} - ${item.status}`,
    value: item._id,
  }));
  const academicFacultyOptions = academicFacultyData?.data?.map(item => ({
    label: item.name,
    value: item._id,
  }));
  const academicDepartmentOptions = academicDdata?.data?.map(item => ({
    label: item.name,
    value: item._id,
  }));
  const cousrseOptions = coursedata?.data?.map(item => ({
    label: item.title,
    value: item._id,
  }));
  const daysOptions = Days?.map(item => ({
    label: item,
    value: item,
  }));

  const { data: AssignedFaculties } = useGetAssinedFacultiesToCourseQuery(
    SelectedCourse,
    {
      skip: !SelectedCourse,
    }
  );
  const assignedFacultiesOptions = AssignedFaculties?.data?.faculties.map(
    item => ({
      label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
      value: item._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    // const name = AcadmicSemisterOptions[Number(data.name) - 1]?.label;

    const payload = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
    };

    try {
      const res = (await offerCourse(payload)) as TResponse<any>;
      // console.log(res);
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Course Offered");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <h2>Offer a course</h2>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={registereSemesterOptions}
          ></PHSelect>
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          ></PHSelect>
          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          ></PHSelect>
          <PHSelectWithWatch
            label="Course"
            name="course"
            onValueChange={setSelectedCourse}
            options={cousrseOptions}
          ></PHSelectWithWatch>
          <PHSelect
            label="Faculty"
            name="faculty"
            disabled={!SelectedCourse}
            options={assignedFacultiesOptions}
          ></PHSelect>
          <PhInput name="section" label="Section" type="number" />
          <PhInput name="maxCapacity" label="Max Capacity" type="number" />
          <PHSelect
            label="Days"
            mode="multiple"
            name="days"
            options={daysOptions}
          ></PHSelect>
          <Row gutter={10}>
            <Col span={12}>
              <PHTimePicker name="startTime" label="Start Time" />
            </Col>
            <Col span={12}>
              <PHTimePicker name="endTime" label="End Time" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferedCourse;
