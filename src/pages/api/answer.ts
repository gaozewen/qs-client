import postAnswer from "@/service/answer";
import type { NextApiRequest, NextApiResponse } from "next";

type AnswerType = {
  componentId: string;
  value: string;
};

export type AnswerInfoType = {
  questionnaireId: string;
  answerList: AnswerType[];
};

const genAnswerInfo = (reqBody: any) => {
  const answerList: AnswerType[] = [];
  Object.keys(reqBody).forEach((key) => {
    if (key === "questionnaireId") return;
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });

  return {
    questionnaireId: reqBody.questionnaireId || "",
    answerList,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(200).json({ errno: -1, msg: "Method 错误" });

  try {
    const answerInfo = genAnswerInfo(req.body);
    // 提交到服务器
    const resData = await postAnswer(answerInfo);

    if (resData.errno === 0) {
      // 提交成功了
      res.redirect("/success");
    } else {
      // 提交失败了
      res.redirect("/fail");
    }
  } catch (error) {
    res.redirect("/fail");
  }
}
