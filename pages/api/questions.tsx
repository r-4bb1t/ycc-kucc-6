import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).end(
    JSON.stringify([
      {
        id: "1",
        title: "사람은 왜 사는 걸까요..?",
        content: "질문..",
        isQuestion: true,
        createdAt: "2022-02-10 20:00",
        //writer: "asdf",
        course: "2",
      },
    ]),
  );
}
