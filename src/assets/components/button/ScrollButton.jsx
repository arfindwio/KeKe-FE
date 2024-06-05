import React, { useState, useEffect } from "react";

// Icons
import { IoIosArrowUp } from "react-icons/io";

export const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          className="fixed bottom-10 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-3 p-1 text-neutral-5"
          onClick={() => handleScrollToTop()}
        >
          <IoIosArrowUp size={50} />
        </button>
      )}
    </>
  );
};
