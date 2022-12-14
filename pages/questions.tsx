import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Article, Board, Course } from "constant";
import axios from "axios";
import { useUnivContext } from "hooks/useUnivContext";

const Questions: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([] as Board[]);
  const [filteredArticles, setFilteredArticles] = useState([] as Board[]);
  const [courses, setCourses] = useState([] as Course[]);
  const { univ } = useUnivContext();

  const fecthData = useCallback(async () => {
    const cData = await axios.get(`${process.env.API_HOST}/courses?school=${["고려대학교", "연세대학교"][univ]}`);
    setCourses(cData.data);

    const qData = await axios.get(`${process.env.API_HOST}/board/questions`);
    setArticles(qData.data.reverse().filter((a: Board) => cData.data.some((c: Course) => c._id === a.course)));
  }, [univ]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  const handleClick = () => {
    setFilteredArticles(
      articles.filter(
        (a) =>
          courses.find((c) => c._id === a.course)?.name.includes(search) ||
          a.title.includes(search) ||
          a.content.includes(search),
      ),
    );
  };

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen px-4">
        <table className="w-full table-auto collapse mt-10">
          <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
            <tr>
              <td className="min-w-[60px] lg:min-w-[80px]"></td>
              <td className="w-full">제목</td>
              <td className="hidden lg:table-cell min-w-[100px] text-right pr-4">작성 일시</td>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((a, i) => (
              <>
                <tr
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`${a.course}/${a._id}`);
                  }}
                >
                  <td rowSpan={2} className="min-w-[60px] lg:min-w-[100px]">
                    {a.isQuestion && (
                      <div className="w-full flex justify-center">
                        <div className="px-2 py-0.5 rounded bg-red-200 w-fit text-sm lg:text-base">질문</div>
                      </div>
                    )}
                  </td>
                  <td className="pt-1 w-full">
                    <strong className="text-[12px] lg:text-base">
                      [{courses.find((c) => c._id === a.course)?.name}]
                    </strong>
                    <br className="lg:hidden" /> <span className=" line-clamp-1">{a.title}</span>
                  </td>
                  <td className="hidden lg:table-cell min-w-[100px] text-[10px] text-right pr-4" rowSpan={2}>
                    {a.createdAt}
                  </td>
                </tr>
                <tr
                  key={`${i}_`}
                  className="border-b-slate-300 border-b-[1px] cursor-pointer"
                  onClick={() => {
                    router.push(`${a.course}/${a._id}`);
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
          <button className="btn btn-ghost hover:bg-slate-200" onClick={handleClick}>
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

export default Questions;
