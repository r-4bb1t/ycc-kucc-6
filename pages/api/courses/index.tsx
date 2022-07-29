import { Course } from "constant";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).end(
    JSON.stringify([
      { name: "인생학개론", id: "1", department: "인생학과", professor: "김현채", courseNumber: "ASDF1234" },
      { name: "바리스타실습", id: "2", department: "커피학과", professor: "양나진", courseNumber: "ASDE1235" },
      { name: "인생맥주찾는법", id: "3", department: "인생학과", professor: "강관훈", courseNumber: "ASDF1235" },
      { name: "키위껍질잘까기", id: "4", department: "과일학과", professor: "임승하", courseNumber: "TERJ1435" },
      { name: "디도스공격의기초", id: "5", department: "컴퓨터학과", professor: "전상완", courseNumber: "COSE0435" },
    ]),
  );
}
