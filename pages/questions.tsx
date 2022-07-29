import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useState } from "react";

const articles = [
  {
    code: "ALCH222-11",
    id: 2,
    title: "과제 블랙보드에 내는건가요?",
    date: new Date(),
    content:
      "과제 블랙보드에 제출하면 되는지.. 메일로 보내야하는지.. 어렵네요ㅠ 어렵어렵어 렵어렵어렵어렵어렵어 렵어렵어렵 어렵 어렵 어 렵 어 렵어 렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵어렵",
    isQuestion: true,
  },
  {
    code: "COSE223-00",
    id: 2,
    title: "알고리즘 질문 있습니다.",
    date: new Date(),
    content: "알고리즘이 뭔가요;",
    isQuestion: true,
  },
  {
    code: "COSE223-00",
    id: 3,
    title: "올림피아드 신청 방법",
    date: new Date(),
    content: "교수님이 세계1등 하는 법은 알려줫는데 신청방법을 안 알려주셨네여.. 제가 놓친건가요?;",
    isQuestion: true,
  },
  {
    code: "COSE223-00",
    id: 4,
    title: "길찾기 알고리즘 관련",
    date: new Date(),
    content:
      "6월 17일 강의에서 길찾기 알고리즘 가르쳐주셨잖아요. 이거 연습문제 2-3번도 길찾기 알고리즘으로 풀 수 있는 거 맞아요? 저 DFS밖에 모릅니다.",
    isQuestion: true,
  },
];

const Home: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen">
        <table className="w-full table-auto collapse mt-10">
          <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
            <td className="min-w-[60px] lg:min-w-[80px]"></td>
            <td className="w-full">제목</td>
            <td className="min-w-[100px] text-right pr-4">작성 일시</td>
          </thead>
          <tbody>
            {articles.map((a, i) => (
              <>
                <tr
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`${a.code}/${a.id}`);
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
                    router.push(`${a.code}/${a.id}`);
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
