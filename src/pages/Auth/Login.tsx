/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { LoginFormFieldType } from "../../types/types";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { VerifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const toastID = toast.loading("Loginning");
    try {
      const payload = {
        id: values.id,
        password: values.password,
      };
      const res = await login(payload).unwrap();

      const user = VerifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In", { id: toastID });
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Something Went Wrong", {
        id: toastID,
      });
      console.log(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#001529",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Corrected property name
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Login</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: "20px" }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item<LoginFormFieldType>
            label="User Id"
            name="id"
            rules={[{ required: true, message: "Please input your Id no!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginFormFieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
