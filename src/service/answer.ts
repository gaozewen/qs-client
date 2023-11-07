import { AnswerInfoType } from "@/pages/api/answer";
import { post } from "./ajax";

// 提交答卷
export default async function postAnswer(answerInfo: AnswerInfoType) {
  const url = "/api/answer";
  const data = await post(url, answerInfo);
  return data; 
}
