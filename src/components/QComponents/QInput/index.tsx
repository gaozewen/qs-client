import React, { FC } from "react";
import { Form, Input } from "antd";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder } = props;
  return (
    <Form.Item
      name={fe_id}
      label={title}
      rules={[{ required: true, message: `请输入${title}` }]}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default QInput;
