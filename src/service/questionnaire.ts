import { get } from "./ajax";

// 获取问卷信息
export default async function getQuestionnaireById(id: string) {
  const url = `/api/questionnaire/${id}`;
  const data = await get(url);
  return data;
}
