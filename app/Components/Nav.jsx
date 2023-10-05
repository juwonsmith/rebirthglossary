import Image from "next/image";
import Rebirth from "../assets/images/rebirthlogo.jpg";
import realLogo from "../assets/images/rebirthreallogo.png";
import Link from "next/link";
export default function Nav() {
  return (
    <nav className=" flex items-center justify-center h-28 h w-full bg-smoke bg-cover bg-no-repeat">
      <div className="flex justify-between w-full h-28 items-center">
        {/* <p className="text-4xl text-gray-300 font-bold font-mono ">Rebirth</p> */}

        <Image
          src={realLogo}
          alt="Rebirth logo"
          priority="100"
          width={150}
          className=""
        />

        <Link href="https://t.me/TheRebirth5000" target="__blank">
          <Image
            src={Rebirth}
            alt="Rebirth logo"
            priority="100"
            width={80}
            height={80}
            className="rounded-full animate-spin-slow mr-6"
          />
        </Link>
      </div>
    </nav>
  );
}
