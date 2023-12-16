const loading = () => {
  return (
    <div className="w-full h-screen flex flex-col -mt-20 justify-center text-center p-5">
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
