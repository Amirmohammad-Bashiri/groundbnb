"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
          onClick={() => {}}>
          Groundbnb your home
        </button>
        <button
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>

      {isOpen ? (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClickHandler={() => {}} label="Login" />
            <MenuItem onClickHandler={() => {}} label="Sign Up" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserMenu;
