"use client";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
interface Props {
  totalcontributions: number;
  top5Repositories: any[];
  mostActiveMonth: string;
  totalIssue: number;
  totalPR: number;
}
const Card = ({
  totalcontributions,
  top5Repositories,
  mostActiveMonth,
  totalIssue,
  totalPR,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const onButtonClick = () => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `wrap.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        className="bg-gradient-to-r from-gray-700 via-gray-900 to-black p-8"
        ref={ref}
      >
        <h1 className="text-green-400 text-4xl  text-center ">
          # Github <span className="text-yellow-400"></span> Wrapped
        </h1>
        <div className="flex items-center gap-9 w-full justify-center">
          <div className="flex flex-col justify-start text-2xl gap-1">
            <h1 className="text-3xl text-[#F4DFC8]">
              # Your Top <span className="text-[#CE5A67]">Starred</span>{" "}
              Repositories
            </h1>
            <ol type="1">
              {top5Repositories.map((repo, index) => {
                return (
                  <li key={repo.node.name} className="my-4 text-[#51dbf0]">
                    <span className="text-white">{index + 1}.</span>{" "}
                    {repo.node.name} -{" "}
                    <span className="text-yellow-400">
                      {repo.node.stargazers.totalCount}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="flex flex-col justify-evenly items-center gap-10">
            <div className="text-center">
              <p className="text-green-500 text-4xl">{totalcontributions}</p>
              <p className="text-[#a19e9e]">Total Contributions</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <p className="text-white text-4xl">{totalIssue}</p>
                <p className="text-[#a19e9e]">Total Issues</p>
              </div>
              <div className="text-center">
                <p className="text-blue-500 text-4xl">{totalPR}</p>
                <p className="text-[#a19e9e]">Total PR</p>
              </div>
              <div className="text-center">
                <p className="text-orange-500 text-4xl">{mostActiveMonth}</p>
                <p className="text-[#a19e9e]">Most active Month</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-2 underline">githubwrapped.app </p>
      </div>
      <div className="flex items-center justify-around gap-6 ">
        <button
          className="bg-[#F4DFC8] text-black px-6 py-2 rounded-md mt-4"
          onClick={onButtonClick}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Card;
