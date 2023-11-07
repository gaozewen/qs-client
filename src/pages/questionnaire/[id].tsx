import QInput from "@/components/QInput";
import QRadio from "@/components/QRadio";
import styles from "@/styles/Questionnaire.module.scss";

type PropsType = {
  id: string;
};

export default function Questionnaire(props: PropsType) {
  const { id } = props;
  return (
    <>
      <form method="post" action="/api/answer">
        <input name="questionnaireId" value={id} type="hidden" />
        <div className={styles["component-wrapper"]}>
          <QInput
            fe_id="c1"
            props={{
              title: "高泽文啦啦啦啦",
              placeholder: "高泽文高考分数感觉阿珂放假的酸辣粉看",
            }}
          />
        </div>

        <div className={styles["component-wrapper"]}>
          <QRadio
            fe_id="c2"
            props={{
              title: "看来过来撒",
              options: [
                { text: "发的链接顺丰1", value: "fdfafds1" },
                { text: "发的链接顺丰2", value: "fdfafds2" },
                { text: "发的链接顺丰3", value: "fdfafds3" },
                { text: "发的链接顺丰4", value: "fdfafds4" },
                { text: "发的链接顺丰5", value: "fdfafds5" },
                { text: "发的链接顺丰6", value: "fdfafds6" },
              ],
              value: "",
              isVertical: true,
            }}
          />
        </div>

        <div className={styles["submit-button-container"]}>
          <button type="submit">提交</button>
        </div>
      </form>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;

  return {
    props: {
      id,
    },
  };
}
