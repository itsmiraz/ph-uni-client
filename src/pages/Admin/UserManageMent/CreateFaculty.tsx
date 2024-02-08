import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import PhInput from "../../../components/form/PhInput";
import PHSelect from "../../../components/form/PhSelect";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhDatePicker from "../../../components/form/PhDatePicker";
import { TResponse } from "../../../types/global";
import {
  useGetAllacademicAcademicDepartmentQuery,
  useGetAllacademicFacultyQuery,
} from "../../../redux/feature/admin/academicManagement.api";
import { useCreateFacultyMutation } from "../../../redux/feature/admin/userManagement.api";

const facultyData = {
  name: {
    firstName: "faculty",
    middleName: "Bruce",
    lastName: "Wayne",
  },
  gender: "Male",
  email: "facultydo1e1@example.com",

  contactNumber: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, City",
  permanentAddress: "456 Oak Avenue, Town",
  academicDepartment: "65b9de69dd8592137de33e6f",
  academicFaculty: "65b9dce9dd8592137de33e6d",
  designation: "Professor",
  isDeleted: false,
};

const CreateFaculty = () => {
  const [createFaculty] = useCreateFacultyMutation();

  const {
    data: academicFacultyData,
    isFetching: academicFacultyDataisFetching,
  } = useGetAllacademicFacultyQuery(undefined);
  const { data: deparments, isFetching: departmentDataisFetching } =
    useGetAllacademicAcademicDepartmentQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map(item => ({
    label: item.name,
    value: item._id,
  }));
  const departmentOptions = deparments?.data?.map(item => ({
    value: item._id,
    label: item.name,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    // console.log(data);

    const payload = {
      faculty: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));
    formData.append("file", data.image);

    try {
      toast.success("Creating");

      const res = (await createFaculty(formData)) as TResponse<any>;
      console.log(res);
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Faculty  Created");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div>
      <h2>Create Faculty</h2>

      <Flex style={{ padding: "24px" }}>
        <Col span={18}>
          <PHForm
            defaultValues={facultyData}
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
                  options={academicFacultyOptions}
                  disabled={academicFacultyDataisFetching}
                  label="Academic Faculty"
                  name="academicFaculty"
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
              <Col span={6}>
                <PhInput label="Designation" type="text" name="designation" />
              </Col>
            </Row>
            <Divider></Divider>

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateFaculty;
