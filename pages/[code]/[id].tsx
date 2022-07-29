import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { dummy } from "../../constant";
import { format } from "date-fns";

const article = {
  id: 2,
  title: "과제 블랙보드에 내는건가요?",
  date: new Date(),
  content:
    "과제 블랙보드에 제출하면 되는지.. 메일로 보내야하는지.. 어렵네요ㅠ 어렵어렵어 렵어렵어렵어렵어렵어 렵어렵어렵 어렵 어렵 어 렵 어 렵어 렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵",
  isQuestion: true,
  comment: [
    { content: "님 수업 안들음?", date: new Date() },
    { content: "님 수업 안들음?", date: new Date() },
    { content: "님 수업 안들음?", date: new Date() },
    { content: "님 수업 안들음?", date: new Date() },
  ],
};

const Home: NextPage = () => {
  const router = useRouter();
  const info = dummy.find((d) => d.code === router.query["code"]);
  if (!info) {
    return null;
  }
  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen">
        <div className="text-center flex flex-col gap-4">
          <div>
            [{info.class}] {info.code}
          </div>
          <div className="font-bold text-slate-800 text-3xl">{info.title}</div>
          <div className="text-lg -mt-2">
            <strong>{info.professor}</strong> 교수님
          </div>
        </div>

        <table className="w-full table-auto collapse mt-10">
          <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
            <td className="min-w-[60px] lg:min-w-[80px] py-2">
              {article.isQuestion && (
                <div className="w-full flex justify-center">
                  <div className="px-2 py-0.5 rounded bg-red-200 w-fit text-sm lg:text-base">질문</div>
                </div>
              )}
            </td>
            <td className="w-full">{article.title}</td>
            <td className="min-w-[200px] text-right pr-4">{format(article.date, "yyyy-MM-dd hh:mm")}</td>
          </thead>
          <tbody>
            <td colSpan={3} className="p-10 max-h-20 overflow-y-auto">
              {article.content}
            </td>
          </tbody>
        </table>

        {article.comment.map((c, i) => (
          <div className="odd:bg-slate-200 bg-slate-100 px-5 py-3 grid grid-cols-[1fr_200px]" key={i}>
            <div>{c.content}</div>
            <div className="text-sm place-self-end">{format(c.date, "yyyy-MM-dd hh:mm")}</div>
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
