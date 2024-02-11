import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TPHTimePicker = {
  label?: string;
  name: string;
};

const PHTimePicker = ({ label, name }: TPHTimePicker) => {
  return (
    <div style={{ marginBottom: "10px", width: "100%" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker {...field} format={"HH:MM"} size="large" />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
