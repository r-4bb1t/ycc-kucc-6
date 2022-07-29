import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Article, Board, Course } from "constant";
import axios from "axios";
import Link from "next/link";

const CoursePage: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState(null as unknown as Course);
  const [articles, setArticles] = useState([] as Board[]);

  const fecthData = useCallback(async () => {
    if (!router.query["code"]) return;
    const aData = await axios.get(`${process.env.API_HOST}/board/${router.query["code"]}`);
    setArticles(aData.data.reverse());
    const iData = await axios.get(`${process.env.API_HOST}/courses`);
    setInfo(iData.data.find((i: Course) => i._id === router.query["code"]));
  }, [router.query]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen px-4">
        <div className="text-center flex flex-col gap-4">
          <div>
            [{info?.department}] {info?.courseNumber}
          </div>
          <div className="font-bold text-slate-800 text-3xl">{info?.name}</div>
          <div className="text-lg -mt-2">
            <strong>{info?.professor}</strong> 교수님
          </div>
        </div>

        <table className="w-full table-auto collapse mt-10">
          <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
            <tr>
              <td className="min-w-[60px] lg:min-w-[80px]"></td>
              <td className="w-full">제목</td>
              <td className="min-w-[100px] text-right pr-4">작성 일시</td>
            </tr>
          </thead>
          <tbody>
            {articles.map((a, i) => (
              <>
                <tr
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`${info._id}/${a._id}`);
                  }}
                >
                  <td rowSpan={2} className="min-w-[60px] lg:min-w-[80px]">
                    <div className="w-full flex justify-center">
                      {a.isQuestion ? (
                        <div className="px-2 py-0.5 rounded bg-red-200 w-fit text-sm lg:text-base">질문</div>
                      ) : (
                        <div className="px-2 py-0.5 rounded bg-slate-300 w-fit text-sm lg:text-base">일반</div>
                      )}
                    </div>
                  </td>
                  <td className="pt-1 w-full">{a.title}</td>
                  <td className="text-[10px] text-right pr-4 whitespace-nowrap" rowSpan={2}>
                    {/* {format(, "yyyy-MM-dd hh:mm")} */}
                    {a.createdAt}
                  </td>
                </tr>
                <tr
                  key={`${i}_`}
                  className="border-b-slate-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    router.push(`${info._id}/${a._id}`);
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

        <div className="w-full grid lg:grid-cols-[100px_1fr_100px] grid-cols-[0_1fr_80px] gap-4 lg:gap-0 lg:items-center mt-10">
          <div></div>
          <div className="w-full flex justify-center gap-4 items-center text-slate-700 font-bold whitespace-nowrap">
            <span className="hidden lg:inline">검색</span>
            <input className="input bg-slate-200 w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-ghost hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13">
                <g strokeWidth="2" fill="none" className="stroke-slate-400">
                  <path d="M11.29 11.71l-4-4" />
                  <circle cx="5" cy="5" r="4" />
                </g>
              </svg>
            </button>
          </div>
          <Link href={`/${router.query["code"]}/new`}>
            <a className="btn btn-ghost hover:bg-slate-300 bg-slate-200">글쓰기</a>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;
