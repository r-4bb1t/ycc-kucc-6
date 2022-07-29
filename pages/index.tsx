import Footer from "components/Footer";
import Header from "components/Header";
import { Course, UNIV } from "constant";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { throttle } from "throttle-debounce";
import axios from "axios";
import { useUnivContext } from "hooks/useUnivContext";

const Home: NextPage = () => {
  const [courses, setCourses] = useState([] as Course[]);
  const [filteredCourses, setFilteredCourses] = useState([] as Course[]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { univ } = useUnivContext();

  useEffect(() => {
    throttle(200, () => {
      if (search.length === 0) setFilteredCourses(courses);
      else
        setFilteredCourses(
          courses.filter(
            (d) =>
              (d.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
              (d.department ?? "").toLowerCase().includes(search.toLowerCase()) ||
              (d.professor ?? "").toLowerCase().includes(search.toLowerCase()) ||
              (d.courseNumber ?? "").toLowerCase().includes(search.toLowerCase()),
          ),
        );
    })();
  }, [search]);

  const fecthData = useCallback(async () => {
    const data = await axios.get(`${process.env.API_HOST}/courses?school=${["고려대학교", "연세대학교"][univ]}`);
    setCourses(data.data);
    setFilteredCourses(data.data);
    setIsLoading(false);
  }, [setCourses, univ]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen px-4">
        <div className="w-full flex lg:flex-row flex-col justify-center gap-4 items-center text-slate-700 font-bold mb-10">
          <div className="lg:text-right text-center">
            <div className="font-normal text-sm">과목명, 학과, 학수번호, 교수명</div>
            검색
          </div>
          <input className="input bg-slate-200 w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {isLoading ? (
          <div className="w-full h-30 flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
              className="fill-slate-400 w-8 h-8 animate-spin"
            >
              <g>
                <path d="M500,964.1c-130.9,0-253.9-51-346.5-143.5S10,605,10,474.1c0-92.7,26-182.9,75.2-261C133.1,137.3,200.7,76,280.8,35.9L322,118c-65.1,32.6-120.1,82.5-159,144.2c-39.9,63.4-61.1,136.7-61.1,212c0,219.5,178.6,398.1,398.1,398.1c219.5,0,398.1-178.6,398.1-398.1c0-75.3-21.1-148.6-61.1-212c-38.9-61.7-93.9-111.6-159-144.2l41.2-82.1C799.3,76,866.9,137.3,914.8,213.2c49.2,78,75.2,168.3,75.2,261c0,130.9-51,253.9-143.5,346.5C753.9,913.2,630.9,964.1,500,964.1z" />
              </g>
            </svg>
          </div>
        ) : (
          <>
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
            {filteredCourses.length > 0 ? (
              <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4">
                {filteredCourses.map((d, i) => (
                  <Link key={i} href={`/${d._id}`}>
                    <a className="bg-slate-300 odd:bg-slate-200 rounded-lg px-4 py-2 hover:bg-slate-400 transition">
                      <div className="text-sm text-slate-700 mb-1">
                        [{d.department}] {d.courseNumber}
                      </div>
                      <div className="text-lg font-bold">{d.name}</div>
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
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
