import PageWrapper from "@/components/PageWrapper";
import { Result } from "antd";

export default function Success() {
  return (
    <PageWrapper title="提交成功">
      <div style={{ marginTop: "20vh" }}>
        <Result
          status="success"
          title="提交成功！"
          subTitle="非常感谢您抽出宝贵的时间给予我们重要的反馈！"
        />
      </div>
    </PageWrapper>
  );
}
