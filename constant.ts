export interface Article {
  board: {
    _id: string;
    title: string;
    content: string;
    isQuestion: boolean;
    createdAt: string;
    //writer: string;
    course: string;
  };
  comments: Comment[];
}

export interface Board {
  _id: string;
  title: string;
  content: string;
  isQuestion: boolean;
  createdAt: string;
  //writer: string;
  course: string;
}

export interface Course {
  _id: string;
  courseNumber: string;
  department: string;
  name: string;
  professor: string;
}

export interface Comment {
  _id: string;
  content: string;
  //writer: string;
  board: string;
  createdAt: string;
}
