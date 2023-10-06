"use client";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

export default function Form() {
  const setSearchItem = useStore((state) => state.setSearchItem);

  const [item, setItem] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // When scrolling occurs, blur the input field
      document.activeElement.blur();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchItem(item);
  };

  return (
    <div>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <label className="mt-20 flex flex-col gap-6">
          <input
            type="name"
            className="w-[13rem] ssm:w-[17rem] md:w-[25rem] h-12 text-black rounded-md font-mono p-2"
            placeholder="search keyword here"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
              setSearchItem(e.target.value);
            }}
          />
          <button className="w-[13rem] ssm:w-[17rem] md:w-[25rem] h-10 font-nunito rounded-md hover:bg-gradient-to-r hover:from-[#03093f] hover:to-[cyan] bg-[#03093f]">
            Search
          </button>
        </label>
      </form>
    </div>
  );
}
