import { useEffect, useState } from "react";
import { Button, Form, Spin } from "antd";
import { useRouter } from "next/router";
import PageWrapper from "@/components/PageWrapper";
import { getComponent } from "@/components/QComponents";
import getQuestionnaireById from "@/service/questionnaire";

type PropsType = {
  errno: number;
  data?: {
    _id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: any[];
  };
  msg?: string;
};

export type FormDataType = {
  questionnaireId: string;
  [key: string]: any;
};

type OptionType = {
  text: string;
  value: any;
};

export default function Questionnaire(props: PropsType) {
  const { errno, data, msg = "" } = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // 为了等待 antd 表单样式加载
      setSpinning(false);
    }, 800);
  }, []);

  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  const {
    _id = "",
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
  } = data || {};

  const visibleCompList = componentList.filter((c) => !c.isHidden);

  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已被删除</p>
      </PageWrapper>
    );
  }

  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  if (spinning)
    return (
      <div style={{ textAlign: "center", marginTop: "44vh" }}>
        <Spin spinning={spinning} size="large" />
      </div>
    );

  const genAnswerList = (
    formData: { [key: string]: any },
    visibleCompList: any[]
  ) => {
    const compIds = Object.keys(formData);
    return visibleCompList
      .filter((c) => compIds.includes(c.fe_id))
      .map((c) => {
        const { fe_id, type, props = {} } = c;
        const { options = [], list = [] } = props;
        let value = formData[fe_id];
        if (type === "radio") {
          value = options
            .filter((opt: OptionType) => opt.value === value)
            .map((opt: OptionType) => opt.text)
            .join("");
        }
        if (type === "checkbox") {
          value = list
            .filter((opt: OptionType) => value.includes(opt.value))
            .map((opt: OptionType) => opt.text)
            .join(",");
        }
        return {
          componentId: fe_id,
          value,
        };
      });
  };

  const onFinish = async (formData: FormDataType) => {
    const postBody = {
      questionnaireId: _id,
      answerList: genAnswerList(formData, visibleCompList),
    };

    try {
      const res = await fetch("/api/answer", {
        method: "post",
        body: JSON.stringify(postBody),
      });

      const data = await res.json();

      if (data.errno === 0) {
        // 提交成功了
        router.push("/success");
      } else {
        // 提交失败了
        router.push("/fail");
      }
    } catch (error) {
      router.push("/fail");
    }
  };

  return (
    <PageWrapper title={title || "问卷调查"}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ padding: 10 }}
      >
        {visibleCompList.map((c) => (
          <div key={c.fe_id}>{getComponent(c)}</div>
        ))}

        <div style={{ paddingTop: 14, paddingBottom: 10 }}>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              shape="round"
            >
              提交
            </Button>
          </Form.Item>
        </div>
      </Form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  // 获取问卷数据
  const data = await getQuestionnaireById(id);

  return {
    props: data,
  };
}
