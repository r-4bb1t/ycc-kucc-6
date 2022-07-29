import Link from "next/link";
import cc from "classcat";
import { useRouter } from "next/router";
import { useUnivContext } from "hooks/useUnivContext";
import { UNIV } from "constant";

export default function Header() {
  const router = useRouter();
  const { univ, setUniv } = useUnivContext();
  return (
    <>
      <header className="w-full h-16 fixed top-0 inset-x-0 border-b-[1px] bg-white border-b-slate-300 grid lg:grid-cols-[200px_1fr_150px_50px] grid-cols-[0_1fr_100px_0] items-center z-10 px-10 overflow-x-auto no-scrollbar">
        <Link href="/">
          <a className="btn btn-ghost hover:bg-slate-200 px-1 py-0.5">
            <img src="/logo.png" className="hidden lg:block h-full" />
          </a>
        </Link>
        <div className="flex h-full items-end justify-center">
          <Link href="/">
            <a
              className={cc([
                "text-sm lg:text-lg hover:bg-slate-200 transition h-full flex items-center pt-2 px-4 border-b-4 border-b-transparent whitespace-nowrap",
                router.asPath === "/" && "font-bold !border-b-slate-600",
              ])}
            >
              과목 찾기
            </a>
          </Link>
          <Link href="/questions">
            <a
              className={cc([
                "text-sm lg:text-lg hover:bg-slate-200 transition h-full flex items-center pt-2 px-4 border-b-4 border-b-transparent whitespace-nowrap",
                router.asPath === "/questions" && "font-bold !border-b-slate-600",
              ])}
            >
              질문 모아보기
            </a>
          </Link>
        </div>
        <select
          className="lg:select select-xs mt-2 lg:mt-0 lg:mr-4"
          value={univ}
          onChange={(e) => setUniv(e.target.value)}
        >
          <option value={UNIV.korea}>고려대</option>
          <option value={UNIV.yonsei}>연세대</option>
        </select>
        <div className="justify-end hidden lg:flex">
          <button className="btn btn-ghost hover:bg-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
              className="w-6 h-6 fill-slate-400"
            >
              <g>
                <g>
                  <path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,156.5c89.5,0,162.1,72.6,162.1,162.1c0,89.5-72.6,162.1-162.1,162.1c-89.5,0-162.1-72.6-162.1-162.1C337.9,229.1,410.5,156.5,500,156.5z M499.9,861.9c-89.3,0-171.1-32.5-234.2-86.3c-15.4-13.1-24.2-32.3-24.2-52.5c0-90.8,73.5-163.4,164.3-163.4h188.6c90.8,0,164,72.6,164,163.4c0,20.2-8.8,39.4-24.2,52.5C671,829.3,589.2,861.9,499.9,861.9z" />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </header>
      <div className="w-full bg-slate-100 p-5 text-center">
        <strong>
          넌 아직도 독강하니? 난
          <img src="/logo.png" className="inline h-8 pb-1" />
          한다.
        </strong>
      </div>
    </>
  );
}
