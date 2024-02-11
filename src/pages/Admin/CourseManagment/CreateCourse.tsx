import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhInput from "../../../components/form/PhInput";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/feature/admin/semesterManagement.api";
import { TResponse } from "../../../types/global";
import { toast } from "sonner";

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();

  const { data: cousresData, isFetching } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = cousresData?.data?.map(item => ({
    label: item.title,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const payload = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data?.preRequisiteCourses?.map((item: string) => ({
        course: item,
      })),
    };
    console.log(payload);
    // console.log(payload);
    try {
      const res = (await createCourse(payload)) as TResponse<any>;
      console.log(res);
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something Went Wrong");
      } else {
        toast.success("Course Created");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <Flex align="center" justify="center">
      <Col span={8}>
        <h2>Create Course</h2>
        <PHForm onSubmit={onSubmit}>
          <PhInput label="Title" name="title" type="text" />
          <PhInput label="Prefix" name="prefix" type="text" />
          <PhInput label="Code " name="code" type="number" />
          <PhInput label="credits" name="credits" type="number" />
          <PHSelect
            disabled={isFetching}
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            mode="multiple"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
