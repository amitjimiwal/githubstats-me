"use client";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";
import { UserSuccessStats } from "@/assets/interfaces/UserData";
import ContributionChart from "../ContributionChart";

const Content = ({ data }: { data: UserSuccessStats }) => {
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
    <section className="w-full sm:w-auto">
      <div className="shadow-2xl p-4 bg-[#18181B]" ref={ref}>
        <h1 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-lime-200 to-green-600 animate-text via-green-100 text-center">
          #Your Github Recap 2023 🎉
        </h1>
        {/* Header Name */}
        <div className="mx-auto bg-transparent rounded-lg shadow-md p-6">
          <div>
            <div className="flex items-center gap-6">
              <Image
                src={data.user.avatarUrl}
                width={100}
                height={100}
                alt="pfp"
              />
              <div className="flex-1">
                <h2 className="text-lg sm:text-2xl font-semibold text-[#FFE382]">
                  {data.user.name}
                </h2>
                <p className="text-white text-sm sm:text-xl">
                  Here&apos;s your GitHub activity recap for the year.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Commits */}
        <div className="flex flex-col justify-evenly items-center gap-4 mt-3">
          <div className="text-center">
            <p className="text-green-500 text-xl sm:text-4xl">
              {data.totalContributions}
            </p>
            <p className="text-[#a19e9e] text-sm sm:text-2xl">
              Total Contributions
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-orange-500 text-xl sm:text-4xl">
                {data.totalCommits}
              </p>
              <p className="text-[#a19e9e] text-sm sm:text-2xl">
                Total Commits
              </p>
            </div>
            <div className="text-center">
              <p className="text-white text-xl sm:text-4xl">{data.totalRepo}</p>
              <p className="text-[#a19e9e] text-sm sm:text-2xl">
                Total Repo&apos;s
              </p>
            </div>
            <div className="text-center">
              <p className="text-blue-500 text-xl sm:text-4xl">{data.totalPR}</p>
              <p className="text-[#a19e9e] text-sm sm:text-2xl">Total PR</p>
            </div>
          </div>
        </div>
        {/* Highlights */}
        <div className="mx-auto bg-transparent rounded-lg p-6 mt-4">
          <h1 className="text-[#FFE382] text-lg sm:text-3xl mb-4 text-left ">
            Highlights
          </h1>
          <h1 className="text-[#FFE382] text-lg sm:text-xl mb-4 text-center ">
            Most Active Month
          </h1>
          <p className="text-white text-center text-sm sm:text-xl ">
            {data.mostActiveMonth}
          </p>
        </div>
        <ContributionChart contribution={data.contributionsByMonth}/>
        <p className="text-center font-thin mt-3">githubwrapped.app</p>
      </div>
      {/* buttons */}
      <div className="flex items-center justify-center gap-6 ">
        <button
          className="bg-white text-black px-6 py-2 rounded-md mt-4"
          onClick={onButtonClick}
        >
          Download
        </button>
        <div>
          <button className="bg-white text-black px-6 py-2 rounded-md mt-4">
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-size="large"
              data-text="Get Yourself Your Github Year Wrap 🎉"
              data-hashtags="GithubWrapped"
              data-dnt="true"
              data-show-count="false"
            >
              Tweet
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
            ></script>
          </button>
        </div>
     
      </div>
    </section>
  );
};

export default Content;
