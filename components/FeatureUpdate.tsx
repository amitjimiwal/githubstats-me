import Link from "next/link";

const FeatureUpdate = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-300 to-red-400 px-4 py-2 flex flex-wrap items-center">
      <h1 className="text-sm font-bold text-black lg:text-2xl">
        Feature Update<span className="text-2xl">🚀</span>
      </h1>
      <p className="text-xs text-blue-600 lg:text-sm ">
        Now you can see the AI generated commit message for your first commit on github. This is a fun feature and we hope you like it.
      </p>
      <button className="animate-pulse animate-infinite underline">
        <Link href="/first-commit" className="text-xs text-red-500 lg:text-sm">
          Click here
        </Link>
      </button>
    </div>
  );
};

export default FeatureUpdate;
