import Footer from "components/Footer";
import Header from "components/Header";
import { Course } from "constant";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { throttle } from "throttle-debounce";
import axios from "axios";

const Home: NextPage = () => {
  const [courses, setCourses] = useState([] as Course[]);
  const [filteredCourses, setFilteredCourses] = useState([] as Course[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    throttle(200, () => {
      if (search.length === 0) setFilteredCourses(courses);
      else
        setFilteredCourses(
          courses.filter(
            (d) =>
              d.name.toLowerCase().includes(search.toLowerCase()) ||
              d.department.toLowerCase().includes(search.toLowerCase()) ||
              d.professor.toLowerCase().includes(search.toLowerCase()) ||
              d.courseNumber.toLowerCase().includes(search.toLowerCase()),
          ),
        );
    })();
  }, [search]);

  const fecthData = useCallback(async () => {
    const data = await axios.get(`${process.env.API_HOST}/courses`);
    setCourses(data.data);
    setFilteredCourses(data.data);
  }, [setCourses]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      <Header />

      <main className="max-w-[960px] w-full my-10 min-h-screen">
        <div className="w-full flex justify-center gap-4 items-center text-slate-700 font-bold mb-10">
          <div className="text-right">
            <div className="font-normal text-sm">과목명, 학과, 학수번호, 교수명</div>
            검색
          </div>
          <input className="input bg-slate-200 w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
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
        {filteredCourses.length > 0 ? (
          <div className="w-full grid grid-cols-3 gap-4">
            {filteredCourses.map((d, i) => (
              <Link key={i} href={`/${d.id}`}>
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
      </main>

      <Footer />
    </div>
  );
};

export default Home;
