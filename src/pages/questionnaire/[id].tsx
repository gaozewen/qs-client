import PageWrapper from "@/components/PageWrapper";
import { getComponent } from "@/components/QComponents";
import QInput from "@/components/QComponents/QInput";
import QRadio from "@/components/QComponents/QRadio";
import getQuestionnaireById from "@/service/questionnaire";
import styles from "@/styles/Questionnaire.module.scss";

type PropsType = {
  errno: number;
  data?: {
    id: string;
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

  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  const {
    id = "",
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

  return (
    <PageWrapper title={title || "问卷调查"}>
      <form method="post" action="/api/answer">
        <input name="questionnaireId" value={id} type="hidden" />

        {componentList.map((c) => (
          <div key={c.fe_id} className={styles["component-wrapper"]}>
            {getComponent(c)}
          </div>
        ))}

        <div className={styles["submit-button-container"]}>
          <button type="submit">提交</button>
        </div>
      </form>
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
