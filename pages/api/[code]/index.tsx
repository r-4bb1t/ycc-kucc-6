import { Course } from "constant";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).end(
    JSON.stringify([
      {
        id: "1",
        title: "개꿀 정보 공유합니다",
        content: "저만 알고 있는 개꿀정보! 현채가 짱이라는 정보입니다. 감사합니다.",
        isQuestion: false,
        createdAt: "2022-02-10 20:00",
        //writer: "asdf",
        course: "1",
      },
    ]),
  );
}
