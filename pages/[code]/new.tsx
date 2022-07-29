import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Board, Course, Comment } from "../../constant";
import axios from "axios";
import { format } from "date-fns";

const Home: NextPage = () => {
  const router = useRouter();
  const [info, setInfo] = useState(null as unknown as Course);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);

  const fecthData = useCallback(async () => {
    const iData = await axios.get(`${process.env.API_HOST}/courses`);
    setInfo(iData.data.find((i: Course) => i.id === router.query["code"]));
  }, [router.query]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  const handleClick = async () => {
    const res = await axios.post(`${process.env.API_HOST}/${router.query["code"]}`, {
      title: title,
      content: content,
      isQuestion: isQuestion,
      writer: "",
      createdAt: format(new Date(), "yyyy-MM-dd hh:mm"),
    });
  };

  if (!info) return null;

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen">
        <div className="text-center flex flex-col gap-4">
          <div>
            [{info.department}] {info.courseNumber}
          </div>
          <div className="font-bold text-slate-800 text-3xl">{info.name}</div>
          <div className="text-lg -mt-2">
            <strong>{info.professor}</strong> 교수님
          </div>
        </div>

        <table className="w-full table-auto collapse mt-10">
          <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
            <td className="min-w-[60px] lg:min-w-[80px] py-2">
              <div className="w-full flex justify-center">
                <input
                  type="checkbox"
                  className="checkbox mr-2"
                  checked={isQuestion}
                  onChange={(e) => setIsQuestion(e.target.checked)}
                />
                질문
              </div>
            </td>
            <td className="w-full py-2 pr-4">
              <input className="input w-full" placeholder="제목" />
            </td>
          </thead>
          <tbody>
            <td colSpan={2} className="p-10 h-[600px] block">
              <textarea className="w-full p-2 resize-none h-full bg-slate-100 overflow-y-auto" placeholder="내용" />
            </td>
          </tbody>
        </table>

        <div className="w-full flex justify-center gap-4 items-center text-slate-700 font-bold mt-10">
          <button className="btn btn-ghost hover:bg-slate-300 bg-slate-200" onClick={handleClick}>
            등록
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
