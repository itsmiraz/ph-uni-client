import { Form, TimePicker } from "antd";
import moment from "moment";
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
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <TimePicker
              value={value ? moment(value, "HH:mm") : null} // Convert to Moment object here
              onChange={timeString => onChange(timeString)}
              onBlur={onBlur}
              format="HH:mm"
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
