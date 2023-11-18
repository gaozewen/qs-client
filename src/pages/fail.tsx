import PageWrapper from "@/components/PageWrapper";
import { Result, Button } from "antd";
import { useRouter } from "next/router";

export default function Fail() {
  const router = useRouter();
  return (
    <PageWrapper title="提交失败">
      <div style={{ marginTop: "20vh" }}>
        <Result
          status="error"
          title="提交失败!"
          subTitle="系统繁忙请稍后再试，非常感谢您的反馈!"
          extra={[
            <Button key="back" type="primary" onClick={() => router.back()}>
              返回
            </Button>,
          ]}
        />
      </div>
    </PageWrapper>
  );
}
