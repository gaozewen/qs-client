import React, { FC } from "react";
import { Form, Radio, Space } from "antd";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    options: { text: string; value: string }[];
    value: string;
    isVertical: boolean;
  };
};

const QRadio: FC<PropsType> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props;
  return (
    <Form.Item
      name={fe_id}
      label={title}
      rules={[{ required: true, message: '请选择' }]}
      initialValue={value}
    >
      <Radio.Group>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options?.map((opt) => (
            <Radio key={opt.value} value={opt.value}>
              <div style={{ width: isVertical ? "84vw" : "inherit" }}>
                {opt.text}
              </div>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Form.Item>
  );
};

export default QRadio;
