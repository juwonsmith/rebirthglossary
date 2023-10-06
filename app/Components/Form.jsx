"use client";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
export default function Form() {
  const setSearchItem = useStore((state) => state.setSearchItem);
  const inputRef = useRef(null);
  const [shouldFocusInput, setShouldFocusInput] = useState(true);
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchItem(item);
  };

  const handleScroll = () => {
    // Check if the input element should be focused, then blur it
    if (shouldFocusInput && inputRef.current) {
      inputRef.current.blur();
      setShouldFocusInput(false); // Update state to prevent further focus
    }
  };

  useEffect(() => {
    // Add scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {" "}
      <form className="flex justify-center " onSubmit={handleSubmit}>
        <label className="mt-20 flex flex-col gap-6">
          <input
            type="name"
            className="w-[13rem] ssm:w-[17rem] md:w-[25rem] h-12 text-black rounded-md font-mono p-2"
            placeholder="search keyword here"
            value={item}
            ref={inputRef}
            onChange={(e) => {
              setItem(e.target.value);
              setSearchItem(e.target.value);
            }}
            onFocus={() => setShouldFocusInput(true)}
          />
          <button
            className="w-[13rem] ssm:w-[17rem] md:w-[25rem] h-10 font-nunito rounded-md 
          hover:bg-gradient-to-r hover:from-[#03093f] hover:to-[cyan] bg-[#03093f]  "
          >
            Search
          </button>
        </label>
      </form>
    </div>
  );
}
