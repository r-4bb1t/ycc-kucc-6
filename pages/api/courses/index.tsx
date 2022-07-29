import { Course } from "constant";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).end(
    JSON.stringify([
      { name: "인생학개론", id: "1", department: "인생학과", professor: "김현채", courseNumber: "ASDF1234" },
      { name: "바리스타실습", id: "2", department: "커피학과", professor: "양나진", courseNumber: "ASDE1235" },
    ]),
  );
}
