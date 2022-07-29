import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { throttle } from "throttle-debounce";
import { dummy } from "../constant";

const Home: NextPage = () => {
  const [filteredDummy, setFilteredDummy] = useState(dummy);
  const [search, setSearch] = useState("");

  useEffect(() => {
    throttle(200, () => {
      if (search.length === 0) setFilteredDummy(dummy);
      else
        setFilteredDummy(
          dummy.filter(
            (d) =>
              d.title.includes(search) ||
              d.code.includes(search) ||
              d.professor.includes(search) ||
              d.class.includes(search),
          ),
        );
    })();
  }, [search]);

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen">
        <div className="w-full flex justify-center gap-4 items-center text-slate-700 font-bold mb-10">
          <div className="text-right">
            <div className="font-normal text-sm">과목명, 학과, 학수번호, 교수명</div>
            검색
          </div>
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

        <div className="mb-2">
          {search === "" ? (
            "전체보기"
          ) : (
            <>
              검색어{" "}
              <strong>
                {"'"}
                {search}
                {"'"}
              </strong>
            </>
          )}
        </div>
        {filteredDummy.length > 0 ? (
          <div className="w-full grid grid-cols-3 gap-4">
            {filteredDummy.map((d, i) => (
              <Link key={i} href={`/${d.code}`}>
                <a className="bg-slate-300 odd:bg-slate-200 rounded-lg px-4 py-2 hover:bg-slate-400 transition">
                  <div className="text-sm text-slate-700 mb-1">
                    [{d.class}] {d.code}
                  </div>
                  <div className="text-lg font-bold">{d.title}</div>
                  <div>
                    <strong>{d.professor}</strong> 교수님
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full text-center">검색 결과가 없습니다.</div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
