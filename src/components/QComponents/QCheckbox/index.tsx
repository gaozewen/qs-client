import React, { FC, useEffect, useState } from "react";
import { Form, Checkbox, Space } from "antd";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    isVertical?: boolean;
    list: Array<{
      value: string;
      text: string;
      checked: boolean;
    }>;
  };
};

const QCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, isVertical, list = [] } = props;

  const initialValue = list
    ?.filter((i) => {
      const { checked } = i;
      return checked;
    })
    .map((i) => i.value);

  return (
    <Form.Item
      name={fe_id}
      label={title}
      rules={[{ required: true, message: `请选择${title}` }]}
      initialValue={initialValue}
    >
      <Checkbox.Group>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {list?.map((opt) => (
            <Checkbox key={opt.value} value={opt.value}>
              {opt.text}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Form.Item>
  );
};

export default QCheckbox;
