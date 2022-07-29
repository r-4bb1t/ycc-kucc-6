import Footer from "components/Footer";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Article, Course, Comment } from "../../constant";
import axios from "axios";
import { format } from "date-fns";
import { useAlertContext } from "hooks/useAlertContext";

const NewArticle: NextPage = () => {
  const router = useRouter();
  const [info, setInfo] = useState(null as unknown as Course);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useAlertContext();

  const fecthData = useCallback(async () => {
    const iData = await axios.get(`${process.env.API_HOST}/courses`);
    setInfo(iData.data.find((i: Course) => i._id === router.query["code"]));
  }, [router.query]);

  useEffect(() => {
    fecthData();
  }, [fecthData]);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await axios.post(`${process.env.API_HOST}/board/${router.query["code"]}`, {
      title: title,
      content: content,
      isQuestion: isQuestion,
    });

    if (res.status === 200) {
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
        message: `게시글 등록에 실패했습니다. error code ${res.status}`,
        onClose: () => {},
      });
    }
    setIsLoading(false);
  };

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

        <div className="w-full table-auto collapse mt-10">
          <div className="flex items-center gap-4 px-4 bg-slate-100 font-bold border-y-[1px] border-y-slate-300">
            <div className="min-w-[60px] lg:min-w-[80px] py-2">
              <div className="w-full flex justify-center">
                <input
                  type="checkbox"
                  className="checkbox mr-2"
                  checked={isQuestion}
                  onChange={(e) => setIsQuestion(e.target.checked)}
                />
                질문
              </div>
            </div>
            <div className="w-full py-2">
              <input
                className="input w-full"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-[600px] bg-slate-100 block border-b-[1px] border-b-slate-300 lg:p-5 p-2">
            <textarea
              className="w-full p-5 resize-none h-full bg-white overflow-y-auto"
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex justify-center gap-4 items-center text-slate-700 font-bold mt-10">
          <button className="btn btn-ghost hover:bg-slate-300 bg-slate-200" disabled={isLoading} onClick={handleClick}>
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

export default NewArticle;
