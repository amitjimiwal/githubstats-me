"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
type InputProps = HTMLElement & {
  showModal: () => void;
};
export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const generate = (name: string) => {
    if (name.length <= 0) {
      const dialog = document.getElementById("my_modal_3") as InputProps | null;
      if (dialog) {
        dialog.showModal();
      } else {
        // handle the case where the element is not found
      }
    }
    router.push(`/first-commit/${name}`);
  };
  return (
    <div className="flex gap-4 w-full justify-center items-center flex-wrap sm:flex-nowrap">
      <input
        type="text"
        placeholder="Enter Your Github UserName"
        className="input input-bordered input-accent w-full max-w-xs"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        className="btn btn-outline"
        onClick={() => {
          generate(name);
        }}
      >
        Get
      </button>
    </div>
  );
}
