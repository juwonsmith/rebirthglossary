"use client";
import UseFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useStore } from "../store/useStore";

export default function List() {
  const { data, ispending, error } = UseFetch("http://localhost:3000/terms");
  const [def, setdef] = useState(false);
  // const [ID, setID] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const searchitem = useStore((state) => state.searchitem);

  const pattern = new RegExp(searchitem, "i");

  const handleCLick = (id) => {
    // setdef(!def);
    // setID((formid) => (formid == id ? id : null));
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };

  //trying pagination
  const [currentList, setCurrentList] = useState([]);
  const [test, setTest] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [bookOffset, setbookOffset] = useState(0);
  const [curr, setCurr] = useState(1);
  const booksPerPage = 25;
  useEffect(() => {
    if (data) {
      const endOffset = bookOffset + booksPerPage;
      setCurrentList(data.slice(bookOffset, endOffset));
      setPageCount(Math.ceil(data.length / booksPerPage));
    }
  }, [bookOffset, booksPerPage, data]);
  useEffect(() => {
    setTest(
      currentList.length >= booksPerPage || curr > 1 || pageCount > 1
        ? true
        : false
    );
  }, [currentList, pageCount, curr]);

  useEffect(() => {
    if (currentList.length === 0 && pageCount >= 1 && data.length >= 6) {
      setbookOffset((prev) => prev - 6);
      setCurr((curr) => curr - 1);
    }
  }, [currentList, pageCount, data]);

  const handlePageClick = (eve) => {
    const newOffset = (eve.selected * booksPerPage) % data.length;
    setbookOffset(newOffset);
    setCurr(eve.selected + 1);
  };

  const check = (array) => {
    if (array.length !== 0) {
      return array;
    } else {
      return [{ term: "not found" }];
    }
  };
  return (
    <div className="w-full h-full">
      <div className="mt-10 mb-10 bg-gradient-to-l from-[#0679e04d] to-[#0636e04d] shadow-white shadow-lg  mx-auto rounded-md h-max w-[calc(100%-8em)] sm:w-[calc(100%-20em)] lg:w-[calc(100%-40em)]">
        {ispending && (
          <h1 className="font-bold w-full p-2 text-center">Loading...</h1>
        )}
        {error && <h1 style="font-bold w-full p-2 text-cente">{error}</h1>}

        <div className="flex flex-col gap-4  w-full h-max list-none p-8">
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
            currentList &&
            currentList.map((item) => (
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
          {test && (
            <ReactPaginate
              breakLabel="..."
              nextLabel={curr === pageCount ? "" : ">>>"}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel={curr === 1 ? "" : "<<<"}
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          )}
        </div>
      </div>
    </div>
  );
}
