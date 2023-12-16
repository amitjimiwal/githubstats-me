import Image from "next/image";
import Link from "next/link";
import { TbBrandGithub } from "react-icons/tb";
import { VscGithub } from "react-icons/vsc";
const Navbar = () => {
  return (
    <section className="navbar">
      <div className="flex w-full  text-white p-4 justify-between items-center">
        <Link href="/">
          <div className="cursor-pointer text-4xl hover:text-red-400">
            <TbBrandGithub />
          </div>
        </Link>
        <div className="flex items-center gap-2">
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
  );
};

export default Navbar;
