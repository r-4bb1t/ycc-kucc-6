import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dummy } from "../../constant";
import { format } from "date-fns";
import { throttle } from "throttle-debounce";

const articles = [
  {
    id: 2,
    title: "과제 블랙보드에 내는건가요?",
    date: new Date(),
    content:
      "과제 블랙보드에 제출하면 되는지.. 메일로 보내야하는지.. 어렵네요ㅠ 어렵어렵어 렵어렵어렵어렵어렵어 렵어렵어렵 어렵 어렵 어 렵 어 렵어 렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵",
    isQuestion: true,
  },
  {
    id: 1,
    title: "내일 수업 없대요",
    date: new Date(),
    content: "짱신ㄴ남;;;",
    isQuestion: false,
  },
];

const Home: NextPage = () => {
  const router = useRouter();
  const info = dummy.find((d) => d.code === router.query["code"]);
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);

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
            <td className="min-w-[60px] lg:min-w-[80px]"></td>
            <td className="w-full">제목</td>
            <td className="min-w-[100px] text-right pr-4">작성 일시</td>
          </thead>
          <tbody>
            {filteredArticles.map((a, i) => (
              <>
                <tr
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`${info.code}/${a.id}`);
                  }}
                >
                  <td rowSpan={2} className="min-w-[60px] lg:min-w-[80px]">
                    {a.isQuestion && (
                      <div className="w-full flex justify-center">
                        <div className="px-2 py-0.5 rounded bg-red-200 w-fit text-sm lg:text-base">질문</div>
                      </div>
                    )}
                  </td>
                  <td className="pt-1">{a.title}</td>
                  <td className="text-sm text-right pr-4" rowSpan={2}>
                    {format(a.date, "yyyy-MM-dd hh:mm")}
                  </td>
                </tr>
                <tr
                  className="border-b-slate-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    router.push(`${info.code}/${a.id}`);
                  }}
                >
                  <td className="text-slate-500 text-sm text-left pb-1 line-clamp-1">
                    <div className="line-clamp-1">{a.content}</div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div className="w-full flex justify-center gap-4 items-center text-slate-700 font-bold mt-10">
          검색
          <input className="input bg-slate-200" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-ghost hover:bg-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13">
              <g strokeWidth="2" fill="none" className="stroke-slate-400">
                <path d="M11.29 11.71l-4-4" />
                <circle cx="5" cy="5" r="4" />
              </g>
            </svg>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
