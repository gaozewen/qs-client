import postAnswer from "@/service/answer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(200).json({ errno: -1, msg: "Method 错误" });

  try {
    const resData = await postAnswer(req.body);
    res.status(200).json(resData);
  } catch (error) {
    res.status(200).json({ errno: -2, msg: "api 服务器异常" });
  }
}
