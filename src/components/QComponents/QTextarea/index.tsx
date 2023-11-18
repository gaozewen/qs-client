import React, { FC } from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QTextarea: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = "" } = props;

  return (
    <Form.Item
      name={fe_id}
      label={title}
      rules={[{ required: true, message: '请输入' }]}
    >
      <TextArea placeholder={placeholder} />
    </Form.Item>
  );
};

export default QTextarea;
