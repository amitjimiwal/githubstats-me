"use client";
import React, { useRef } from "react";
import { BsRobot } from "react-icons/bs";
import { UserCommit, UserSuccessCommit } from "@/assets/types/UserCommits";
import Image from "next/image";
import getTimeDuration from "@/assets/utils/getTimeDuration";
import { toPng } from "html-to-image";
const CommitCard = ({ data }: { data: UserSuccessCommit }) => {
  const commitRef = useRef<HTMLDivElement>(null);
  const onButtonClick = () => {
    if (commitRef.current === null) {
      return;
    }
    toPng(commitRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `firstcommit.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className="flex flex-col justify-center p-4 bg-[#0d1117] rounded-lg shadow-md sm:min-w-[800px] animate-fade-down"
        ref={commitRef}
      >
        <h3 className="text-sm text-white mb-4">
          <a
            href={data.repositoryUrl}
            target="_blank"
            className="hover:underline"
          >
            {data.username}/{data.repositoryName}
          </a>
        </h3>
        <div className="flex items-center gap-4 text-[#848d97] ml-4">
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            className="Octicon-sc-9kayk9-0"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
          </svg>
          <p>Commits on {new Date(data.commitDate).toDateString()}</p>
        </div>
        <div className="flex items-center justify-between border-[1px] border-[#f0f6fc1a] m-2 p-3 rounded-t-xl">
          <div className="flex items-center">
            <Image
              className="w-12 h-12 rounded-full mr-4"
              src={data.imageUrl}
              alt="Avatar"
              width={100}
              height={100}
            />
            <div>
              <a
                href={data.commitUrl}
                className="text-white hover:text-blue-600 hover:underline mt-2"
              >
                {data.commitMessage}
              </a>
              <p className="text-[#848d97] text-sm mt-1">
                {" "}
                <a
                  href={`https://github.com/${data.username}`}
                  target="_blank"
                  className="hover:underline"
                >
                  {data.username}
                </a>
                &nbsp;commited {getTimeDuration(data.commitDate)}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <a
              href={data.repositoryUrl}
              target="_blank"
              className="hover:underline p-3"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                className="octicon octicon-code"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                style={{
                  display: "inline-block",
                  userSelect: "none",
                  verticalAlign: "text-bottom",
                  overflow: "visible",
                }}
              >
                <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-3 text-center w-full flex justify-center ">
          <p className="text-sm text-gray-700  flex items-center justify-center bg-gray-200 p-3 rounded-lg">
            <BsRobot size={30} />
            &nbsp;
            {data.AiResponse}
          </p>
        </div>
        <p className="text-center font-thin mt-3">githubstats-me.vercel.app</p>
      </div>
      <div className="flex items-center justify-center gap-6 ">
        <button
          className="bg-white text-black px-6 py-2 rounded-md mt-4"
          onClick={onButtonClick}
        >
          Download
        </button>
        <div>
          <button className="bg-white text-black px-6 py-2 rounded-md mt-4">
            {/* <a
              href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Ffirstpr.me%2F&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&amp;text=I%20found%20my%20%23FirstCommit%3A%20https%3A%2F%2Fgithub.com%2Fmaulik-2412%2FWebsite%2Fpull%2F2.%20What%20was%20yours%3F&amp;url=https%3A%2F%2Ffirstpr.me"
              className="btn"
              id="b"
            >
              <i></i>
              <span className="label" id="l">
                Post
              </span>
            </a> */}
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-size="large"
              data-text={`I found my #FirstGithubCommit: \n ${data.commitUrl} \n`}
              data-url="https://githubstats-me.vercel.app/first-commit"
              data-dnt="true"
              data-show-count="false"
            >
              Tweet
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </button>
        </div>
      </div>
    </>
  );
};

export default CommitCard;
