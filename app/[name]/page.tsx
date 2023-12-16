import { UserStats } from "@/assets/interfaces/UserData";
import { getAllData } from "../../assets/api";
import Content from "@/components/content/Content";
import ErrorBox from "@/components/ErrorBox";
export default async function Home({ params }: { params: { name: string } }) {
  const data: UserStats = await getAllData(params.name);
  return (
    <section className="w-full h-[91vh] flex flex-col  items-center ">
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
