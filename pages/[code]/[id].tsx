import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Article, Course, Comment } from "../../constant";
import axios from "axios";
import { useAlertContext } from "hooks/useAlertContext";

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const [info, setInfo] = useState(null as unknown as Course);
  const [article, setArticle] = useState(null as unknown as Article);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useAlertContext();

  const fecthData = useCallback(async () => {
    if (!router.query["code"]) return;
    const aData = await axios.get(`${process.env.API_HOST}/board/${router.query["code"]}/${router.query["id"]}`);
    setArticle(aData.data);
    const iData = await axios.get(`${process.env.API_HOST}/courses`);
    setInfo(iData.data.find((i: Course) => i._id === router.query["code"]));
  }, [router.query]);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await axios.post(
      `${process.env.API_HOST}/board/${router.query["code"]}/${router.query["id"]}/comments`,
      {
        content: content,
      },
    );

    if (res.data === 200) {
      push({
        type: "success",
        message: "게시글을 등록했습니다.",
        onClose: () => {
          router.back();
        },
      });
    } else {
      push({
        type: "error",
        message: `게시글 등록에 실패했습니다. error code ${res.data}`,
        onClose: () => {},
      });
    }
    setIsLoading(false);
  };

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

        {article && (
          <table className="w-full table-auto collapse mt-10">
            <thead className="bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
              <tr>
                <td className="min-w-[60px] lg:min-w-[80px] py-2">
                  <div className="w-full flex justify-center">
                    {article?.board.isQuestion ? (
                      <div className="px-2 py-0.5 rounded bg-red-200 w-fit text-sm lg:text-base">질문</div>
                    ) : (
                      <div className="px-2 py-0.5 rounded bg-slate-300 w-fit text-sm lg:text-base">일반</div>
                    )}
                  </div>
                </td>
                <td className="w-full break-all">{article.board.title}</td>
                <td className=";g:min-w-[200px] min-w-[100px] text-right pr-4 text-[10px] lg:text-base">
                  {article.board.createdAt}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="lg:p-10 p-4 max-h-20 overflow-y-auto">
                  {article.board.content}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {article?.comments &&
          article.comments.map((c, i) => (
            <div className="odd:bg-slate-200 bg-slate-100 px-5 py-3 grid grid-cols-[1fr_200px]" key={i}>
              <div>{c.content}</div>
              <div className="text-sm place-self-end">{c.createdAt}</div>
            </div>
          ))}
        <div className="flex items-center gap-4 mt-4">
          <div className="whitespace-nowrap font-bold">댓글</div>
          <input className="w-full input bg-slate-200" value={content} onChange={(e) => setContent(e.target.value)} />
          <button className="btn btn-ghost hover:bg-slate-200" onClick={handleClick}>
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 1000 1000"
                enableBackground="new 0 0 1000 1000"
                xmlSpace="preserve"
                className="fill-slate-600 w-4 h-4 animate-spin"
              >
                <g>
                  <path d="M500,964.1c-130.9,0-253.9-51-346.5-143.5S10,605,10,474.1c0-92.7,26-182.9,75.2-261C133.1,137.3,200.7,76,280.8,35.9L322,118c-65.1,32.6-120.1,82.5-159,144.2c-39.9,63.4-61.1,136.7-61.1,212c0,219.5,178.6,398.1,398.1,398.1c219.5,0,398.1-178.6,398.1-398.1c0-75.3-21.1-148.6-61.1-212c-38.9-61.7-93.9-111.6-159-144.2l41.2-82.1C799.3,76,866.9,137.3,914.8,213.2c49.2,78,75.2,168.3,75.2,261c0,130.9-51,253.9-143.5,346.5C753.9,913.2,630.9,964.1,500,964.1z" />
                </g>
              </svg>
            ) : (
              "등록"
            )}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
