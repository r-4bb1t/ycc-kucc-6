import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Board, Course, Comment } from "../../constant";
import axios from "axios";

const Home: NextPage = () => {
  const router = useRouter();
  const [info, setInfo] = useState(null as unknown as Course);
  const [article, setArticle] = useState(null as unknown as Board);
  const [comment, setComment] = useState([] as Comment[]);

  const fecthData = useCallback(async () => {
    const aData = await axios.get(`${process.env.API_HOST}/${router.query["code"]}/${router.query["id"]}`);
    setArticle(aData.data);
    const iData = await axios.get(`${process.env.API_HOST}/courses`);
    setInfo(iData.data.find((i: Course) => i.id === router.query["code"]));
    const cData = await axios.get(
      `${process.env.API_HOST}/courses/${router.query["code"]}/${router.query["id"]}/comments`,
    );
    setComment(cData.data);
  }, [router.query]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen">
        <div className="text-center flex flex-col gap-4">
          <div>
            [{info?.department}] {info?.courseNumber}
          </div>
          <div className="font-bold text-slate-800 text-3xl">{info?.name}</div>
          <div className="text-lg -mt-2">
            <strong>{info?.professor}</strong> 교수님
          </div>
        </div>

        {article && (
          <table className="w-full table-auto collapse mt-10">
            <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
              <td className="min-w-[60px] lg:min-w-[80px] py-2">
                <div className="w-full flex justify-center">
                  {article.isQuestion ? (
                    <div className="px-2 py-0.5 rounded bg-red-200 w-fit text-sm lg:text-base">질문</div>
                  ) : (
                    <div className="px-2 py-0.5 rounded bg-slate-300 w-fit text-sm lg:text-base">일반</div>
                  )}
                </div>
              </td>
              <td className="w-full">{article.title}</td>
              <td className="min-w-[200px] text-right pr-4">{article.createdAt}</td>
            </thead>
            <tbody>
              <td colSpan={3} className="p-10 max-h-20 overflow-y-auto">
                {article.content}
              </td>
            </tbody>
          </table>
        )}

        {comment &&
          comment.map((c, i) => (
            <div className="odd:bg-slate-200 bg-slate-100 px-5 py-3 grid grid-cols-[1fr_200px]" key={i}>
              <div>{c.content}</div>
              <div className="text-sm place-self-end">{c.createdAt}</div>
            </div>
          ))}
        <div className="flex items-center gap-4 mt-4">
          <div className="whitespace-nowrap font-bold">댓글</div>
          <input className="w-full input bg-slate-200" />
          <button className="btn btn-ghost hover:bg-slate-200">등록</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
