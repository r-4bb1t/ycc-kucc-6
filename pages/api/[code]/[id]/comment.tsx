import { Course } from "constant";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).end(
    JSON.stringify([
      {
        id: "1",
        content: "고급 정보 ㄳ",
        //writer: "",
        board: "1",
        createdAt: "2022-02-20 20:00",
      },
    ]),
  );
}
