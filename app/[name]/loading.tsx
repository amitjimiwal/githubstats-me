const loading = () => {
  return (
    <div className="w-full h-1/2 flex mt-2.5 justify-center">
      <div className="text-3xl">
        Loading your Wrap{" "}
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    </div>
  );
};

export default loading;
