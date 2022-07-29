export const dummy = [
  { id: "1", title: "동아리회장학개론", professor: "김현채", code: "KUCC220-01", class: "동아리학과" },
  { id: "2", title: "동아리회장학개론", professor: "양나진", code: "KUCC20-02", class: "동아리학과" },
  { id: "3", title: "세계정보올림피아드1등하는법", professor: "윤지학", code: "COSE223-00", class: "컴퓨터학과" },
  { id: "4", title: "서버구축이론및실습", professor: "전상완", code: "COSE213-00", class: "컴퓨터학과" },
  { id: "5", title: "맥주의역사", professor: "강관훈", code: "ALCH222-11", class: "음주학과" },
];

export interface Board {
  id: string;
  title: string;
  content: string;
  isQuestion: boolean;
  createdAt: string;
  writer: string;
  course: string;
}

export interface Course {
  id: string;
  courseNumber: string;
  department: string;
  name: string;
  professor: string;
}

export interface Comment {
  id: string;
  content: string;
  writer: string;
  board: string;
  createdAt: string;
}
