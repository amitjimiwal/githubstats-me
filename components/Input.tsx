"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Input = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const generate = (name: string) => {
    if (name.length <= 0) {
      alert("Please enter your github username");
      return;
    }
    router.push(`/${name}`);
  };
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <input
        type="text"
        placeholder="Enter Your Github UserName"
        className="input input-bordered input-accent w-full max-w-xs"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        className="btn btn-outline btn-success"
        onClick={() => generate(name)}
      >
        Get Your Wrap
      </button>
    </div>
  );
};

export default Input;
