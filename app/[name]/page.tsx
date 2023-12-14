import { getAllData } from "../../assets/utils";
import Card from "@/components/Card";
//function to add set-timeout  of 5 seconds
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function Page({ params }: { params: { name: string } }) {
  await wait(5000);
  const {
    totalcontributions,
    top5Repositories,
    mostActiveMonth,
    totalIssue,
    totalPR,
  } = await getAllData(params.name);
  return (
    <div className="w-full flex flex-col justify-center items-center mt-7">
      <Card top5Repositories={top5Repositories} totalcontributions={totalcontributions} mostActiveMonth={mostActiveMonth} totalIssue={totalIssue} totalPR={totalPR} />
      <a
          href="https://twitter.com/intent/tweet"
          className="twitter-mention-button"
          data-size="large"
          data-dnt="true"
          data-text="I generated my Github Wrapped for the Year and it&#39;s
          awesome. Go and generate your&#39;s now:"
          data-show-count="false"
        >
          Tweet
        </a>
    </div>
  );
}
export default Page;
