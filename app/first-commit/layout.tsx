import Image from "next/image";
import banner from "@/assets/banner.png";
export default function CommitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  return (
    <div className="w-full h-auto">
      <div className="p-7 object-contain flex justify-center">
        <Image src={banner} alt="banner" className="w-auto sm:h-28 2xl:h-60" />
      </div>
      <p className="text-lg sm:text-xl font-bold text-center text-white mb-10">
        What was the first commit you made on GitHub?
      </p>
      {children}
    </div>
  );
}
