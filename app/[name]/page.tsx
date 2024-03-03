import { UserStats } from "@/assets/types/UserData";
import { getAllData } from "../../assets/api";
import Content from "@/components/content/Content";
import ErrorBox from "@/components/ErrorBox";
export default async function Home({ params }: { params: { name: string } }) {
  const data: UserStats = await getAllData(params.name);
  return (
    <section className="min-w-screen min-h-[91vh] flex flex-col  items-center ">
      {!data.user ? (
        <>
          <ErrorBox />
        </>
      ) : (
        <Content data={data} />
      )}
    </section>
  );
}
