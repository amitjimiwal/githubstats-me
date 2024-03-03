"use client";
import Image from "next/image";
import Link from "next/link";
import { TbBrandGithub } from "react-icons/tb";
import { VscGithub } from "react-icons/vsc";
import Producthunt from "@/assets/producthunt.svg";
import { usePathname } from "next/navigation";
import FeatureUpdate from "./FeatureUpdate";
const Navbar = () => {
  const path = usePathname() === "/";
  return (
    <>
      {path && <FeatureUpdate />}
      <section className="navbar">
        <div className="flex w-full  text-white p-4 justify-between items-center">
          <Link href="/">
            <div className="cursor-pointer text-4xl hover:text-red-400">
              <TbBrandGithub />
            </div>
          </Link>
          <div className="flex items-center sm:gap-2">
            <a
              href="https://www.producthunt.com/posts/github-wrapped-7?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-github&#0045;wrapped&#0045;7"
              target="_blank"
            >
              <Image
                src={Producthunt}
                alt="Github&#0032;Wrapped - Generate&#0032;Your&#0032;Github&#0032;Contribution&#0032;Wrap&#0032;for&#0032;this&#0032;year&#0032; | Product Hunt"
                width="200"
                height="40"
              />
            </a>
            <div>
              <button className="btn btn-ghost text-xl">
                <a
                  href="https://github.com/amitjimiwal/Github-Wrapped"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <VscGithub />
                </a>
              </button>
            </div>
            <Link href="https://www.buymeacoffee.com/notamit">
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width={150}
                height={60}
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
