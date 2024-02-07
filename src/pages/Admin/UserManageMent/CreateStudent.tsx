import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import PhInput from "../../../components/form/PhInput";
import PHForm from "../../../components/form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createStudentDataSchema } from "../../../validations/userScehams.schema";
import PhDatePicker from "../../../components/form/PhDatePicker";
import {
  useGetAllacademicAcademicDepartmentQuery,
  useGetAllacademicSemisterQuery,
} from "../../../redux/feature/admin/academicManagement.api";
import PHSelect from "../../../components/form/PhSelect";
import { useCreateStudentMutation } from "../../../redux/feature/admin/userManagement.api";
import { TResponse } from "../../../types/global";
import { toast } from "sonner";
import { TStuedent } from "../../../types/user.types";

const studentData = {
  name: {
    firstName: "Miraj",
    middleName: "Ahmed ",
    lastName: "Hossen1",
  },
  email: "stuent1@gmail.com",
  gender: "Male",

  bloodGroup: "A+",

  contactNumber: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main St, City",
  permanentAddress: "456 Oak St, Town",

  Guardian: {
    fatherName: "John Doe Sr.",
    fatherContact: "1234567890",
    fatherOccupation: "Engineer",
    motherName: "Jane Doe",
    motherContact: "9876543210",
    motherOccupation: "Doctor",
  },
  localGuardian: {
    occupation: "Business",
    name: "Local Guardian Name",
    contact: "9999999999",
    address: "789 Pine St",
  },
};

const CreateStudent = () => {
  const [createStudent] = useCreateStudentMutation();

  const { data: semesterData, isFetching: SemesterDataisFetching } =
    useGetAllacademicSemisterQuery(undefined);
  const { data: deparments, isFetching: departmentDataisFetching } =
    useGetAllacademicAcademicDepartmentQuery(undefined);

  const semesterOptions = semesterData?.data?.map(item => ({
    label: `${item.name}-${item.year}`,
    value: item._id,
  }));
  const departmentOptions = deparments?.data?.map(item => ({
    value: item._id,
    label: item.name,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    // console.log(data);

    const payload = {
      student: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));
    formData.append("file", data.image);

    try {
      toast.success("Creating");

      const res = (await createStudent(formData)) as TResponse<TStuedent>;
      console.log(res);
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Student  Created");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div>
      <h2>Create Student</h2>

      <Flex style={{ padding: "24px" }}>
        <Col span={18}>
          <PHForm
            defaultValues={studentData}
            onSubmit={handleSubmit}
            // resolver={zodResolver(createStudentDataSchema)}
          >
            <p style={{ fontWeight: 600 }}>Personal Info</p>
            <Divider></Divider>
            <Row gutter={10}>
              <Col span={6}>
                <PhInput label="First Name" type="text" name="name.firstName" />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Middle Name"
                  type="text"
                  name="name.middleName"
                />
              </Col>
              <Col span={6}>
                <PhInput label="Last Name" type="text" name="name.lastName" />
              </Col>
              <Col span={6}>
                <PhInput label="Email" type="text" name="email" />
              </Col>
              <Col span={6}>
                <PhInput label="Gender" type="text" name="gender" />
              </Col>
              <Col span={6}>
                <PhDatePicker label="Date of Birth" name="dateOfBirth" />
              </Col>
              <Col span={6}>
                <PhInput label="Blood Group" type="text" name="bloodGroup" />
              </Col>
              <Col span={12}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Picture">
                      <Input
                        value={value?.fileName}
                        {...field}
                        onChange={e => onChange(e.target.files?.[0])}
                        type="file"
                      ></Input>
                    </Form.Item>
                  )}
                />
                <PhInput label="Blood Group" type="text" name="bloodGroup" />
              </Col>
            </Row>
            <Divider></Divider>

            <p style={{ fontWeight: 600 }}>Contact Info</p>
            <Divider></Divider>
            <Row gutter={10}>
              <Col span={6}>
                <PhInput
                  label="Contact Number"
                  type="text"
                  name="contactNumber"
                />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Emergency Contact No"
                  type="text"
                  name="emergencyContactNo"
                />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Present Address"
                  type="text"
                  name="presentAddress"
                />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Permanent Address"
                  type="text"
                  name="permanentAddress"
                />
              </Col>
            </Row>
            <Divider></Divider>

            <p style={{ fontWeight: 600 }}>Academic Info</p>
            <Divider></Divider>
            <Row gutter={10}>
              <Col span={8}>
                <PHSelect
                  options={semesterOptions}
                  disabled={SemesterDataisFetching}
                  label="Admission Semester"
                  name="admissionSemester"
                />
              </Col>
              <Col span={8}>
                <PHSelect
                  label="Academic Department"
                  options={departmentOptions}
                  disabled={departmentDataisFetching}
                  name="academicDepartment"
                />
              </Col>
            </Row>
            <Divider></Divider>

            <p style={{ fontWeight: 600 }}>Guardian Info</p>
            <Divider></Divider>
            <Row gutter={10}>
              <Col span={8}>
                <PhInput
                  label="Father's Name"
                  type="text"
                  name="Guardian.fatherName"
                />
              </Col>
              <Col span={8}>
                <PhInput
                  label="Father's Contact"
                  type="text"
                  name="Guardian.fatherContact"
                />
              </Col>
              <Col span={8}>
                <PhInput
                  label="Father's Occupation"
                  type="text"
                  name="Guardian.fatherOccupation"
                />
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <PhInput
                  label="Mother's Name"
                  type="text"
                  name="Guardian.motherName"
                />
              </Col>
              <Col span={8}>
                <PhInput
                  label="Mother's Contact"
                  type="text"
                  name="Guardian.motherContact"
                />
              </Col>
              <Col span={8}>
                <PhInput
                  label="Mother's Occupation"
                  type="text"
                  name="Guardian.motherOccupation"
                />
              </Col>
            </Row>
            <Divider></Divider>

            <p style={{ fontWeight: 600 }}>Local Guardian Info</p>
            <Divider></Divider>
            <Row gutter={10}>
              <Col span={6}>
                <PhInput label="Name" type="text" name="localGuardian.name" />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Contact"
                  type="text"
                  name="localGuardian.contact"
                />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Occupation"
                  type="text"
                  name="localGuardian.occupation"
                />
              </Col>
              <Col span={6}>
                <PhInput
                  label="Address"
                  type="text"
                  name="localGuardian.address"
                />
              </Col>
            </Row>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateStudent;
