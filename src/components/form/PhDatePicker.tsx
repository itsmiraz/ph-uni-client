import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TPhDatePicker = {
  label?: string;
  name: string;
};

const PhDatePicker = ({ label, name }: TPhDatePicker) => {
  return (
    <div style={{ marginBottom: "10px", width: "100%" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhDatePicker;
