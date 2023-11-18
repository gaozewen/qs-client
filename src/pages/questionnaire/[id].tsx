import PageWrapper from "@/components/PageWrapper";
import { Button, Form, Input, message, Space } from "antd";
import { getComponent } from "@/components/QComponents";
import getQuestionnaireById from "@/service/questionnaire";
import styles from "@/styles/Questionnaire.module.scss";

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

export default function Questionnaire(props: PropsType) {
  const { errno, data, msg = "" } = props;
  const [form] = Form.useForm();

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

  const onFinish = (data: any) => {
    data.id = _id;
    console.log("gzw===>data", data);

    message.success("Submit success!");
  };

  return (
    <PageWrapper title={title || "问卷调查"}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {componentList.map((c) => (
          <div key={c.fe_id}>{getComponent(c)}</div>
        ))}

        <Form.Item>
          <Button block type="primary" htmlType="submit" size="large" shape="round">
            提交
          </Button>
        </Form.Item>
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
