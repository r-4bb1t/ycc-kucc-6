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
