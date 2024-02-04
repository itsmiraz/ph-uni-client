import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TphInput = {
  label?: string;
  name: string;
  type: string;
};

const PhInput = ({ label, name, type }: TphInput) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
