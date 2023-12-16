import Input from "@/components/Input";
export default function Home() {
  return (
    <main className="text-center flex flex-col justify-center h-[91vh] -mt-20 p-2">
      <div className="my-2">
      <span className="text-4xl sm:text-6xl mb-6 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-lime-200 to-green-600 animate-text via-green-100">Get Yourself your Year Wrap</span>
      <span className="text-6xl ml-4">🚀</span>
      </div>
      <h6 className="text-xl sm:text-3xl bg-gradient-to-r from-teal-400 to-purple-700 bg-clip-text text-transparent mb-4">Generate your attractive Cards to share in Public</h6>
      <Input />
    </main>
  );
}
