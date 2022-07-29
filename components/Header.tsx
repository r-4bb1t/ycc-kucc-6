import Link from "next/link";
import cc from "classcat";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full h-16 fixed top-0 inset-x-0 border-b-[1px] bg-white border-b-slate-300 flex justify-center items-end z-10">
      <Link href="/">
        <a
          className={cc([
            "hover:bg-slate-200 transition text-lg h-full flex items-center pt-2 px-4 border-b-4 border-b-transparent",
            router.asPath === "/" && "font-bold !border-b-slate-600",
          ])}
        >
          과목 찾기
        </a>
      </Link>
      <Link href="/questions">
        <a
          className={cc([
            "hover:bg-slate-200 transition text-lg h-full flex items-center pt-2 px-4 border-b-4 border-b-transparent",
            router.asPath === "/questions" && "font-bold !border-b-slate-600",
          ])}
        >
          질문 모아보기
        </a>
      </Link>
    </header>
  );
}
