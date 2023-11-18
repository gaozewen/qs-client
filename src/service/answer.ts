import { FormDataType } from "@/pages/questionnaire/[id]";
import { post } from "./ajax";

// 提交答卷
export default async function postAnswer(formData: FormDataType) {
  const url = "/api/answer";
  const data = await post(url, formData);
  return data;
}
