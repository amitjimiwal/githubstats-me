import { UserStats } from "@/assets/types/UserData";
import { getFirstCommit } from "@/assets/api";
import Content from "@/components/content/Content";
import ErrorBox from "@/components/ErrorBox";
import { UserCommit } from "@/assets/types/UserCommits";
import CommitCard from "@/components/CommitCard";
export default async function Home({ params }: { params: { name: string } }) {
  const data: UserCommit = await getFirstCommit(params.name);
  return (
    <section className="flex flex-col  items-center ">
      {!data.username ? (
        <>
          <ErrorBox />
        </>
      ) : (
        <CommitCard data={data} />
      )}
    </section>
  );
}
