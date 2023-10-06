"use client";
import { useState } from "react";
import data from "../data/db.json";
import { useStore } from "../store/useStore";

const itemsPerPage = 25;

export default function List() {
  const [openItem, setOpenItem] = useState(null);

  const searchitem = useStore((state) => state.searchitem);

  const pattern = new RegExp(searchitem, "i");

  const handleCLick = (id) => {
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };

  //trying pagination
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);

  const check = (array) => {
    if (array.length !== 0) {
      return array;
    } else {
      return [{ term: "not found" }];
    }
  };
  return (
    <div className="w-full h-full">
      <div className="mt-10 mb-10 bg-gradient-to-l overflow-hidden from-[#0679e04d] to-[#0636e04d] shadow-white shadow-lg  mx-auto rounded-md h-max w-[calc(100%-8em)] sm:w-[calc(100%-20em)] lg:w-[calc(100%-40em)]">
        <div className="flex flex-col gap-4 overflow-hidden w-full h-max list-none p-8">
          {searchitem &&
            data &&
            check(data.filter((item) => pattern.test(item.term))).map(
              (item) => (
                <>
                  <li className="font-mono flex justify-between gradient-animation items-center h-max shadow-black shadow-xl rounded-md p-2 bg-gray-600">
                    <p className="w-[8em] sm:w-full sm:h-auto md:h-[max-content] lg:h-[max-content] break-words">
                      {item.term}
                    </p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`caret ${
                        openItem === item.id ? "" : "rotate-180"
                      }`}
                      onClick={() => handleCLick(item.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </li>
                  {openItem === item.id && (
                    <div className="block">
                      <p>{item.definition}</p>
                    </div>
                  )}
                </>
              )
            )}
          {!searchitem &&
            paginatedData &&
            paginatedData.map((item) => (
              <>
                <li className="font-mono flex justify-between gradient-animation items-center h-max shadow-black shadow-xl rounded-md p-2 bg-gray-600">
                  <p className="w-[8em] sm:w-full  h-max break-words">
                    {item.term}
                  </p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`caret ${
                      openItem === item.id ? "" : "rotate-180"
                    }`}
                    onClick={() => handleCLick(item.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </li>
                {openItem === item.id && (
                  <div className="block">
                    <p>{item.definition}</p>
                  </div>
                )}
              </>
            ))}
        </div>

        <div className="mx-auto w-max h-max flex items-center justify-center ">
          {/* <div className="flex justify-center mt-4"> */}
          <ul className="flex space-x-2 mb-4">
            {Array.from({
              length: Math.ceil(data.length / itemsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`cursor-pointer p-2 rounded-full ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600"
                }`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
