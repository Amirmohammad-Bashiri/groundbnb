"use client";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import type { SafeUser } from "@/app/types";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

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
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>

      {isOpen ? (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClickHandler={() => {}} label="My trips" />
                <MenuItem onClickHandler={() => {}} label="My favorites" />
                <MenuItem onClickHandler={() => {}} label="My reservations" />
                <MenuItem onClickHandler={() => {}} label="My properties" />
                <MenuItem onClickHandler={() => {}} label="Groundbnb my home" />
                <hr />
                <MenuItem onClickHandler={signOut} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClickHandler={loginModal.onOpen} label="Login" />
                <MenuItem
                  onClickHandler={registerModal.onOpen}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserMenu;
