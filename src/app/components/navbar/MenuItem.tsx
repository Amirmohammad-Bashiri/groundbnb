"use client";

type MenuItemProps = {
  onClickHandler: () => void;
  label: string;
};

function MenuItem({ onClickHandler, label }: MenuItemProps) {
  return (
    <button
      onClick={onClickHandler}
      className="w-full px-4 py-3 font-semibold text-left transition active:bg-neutral-200 hover:bg-neutral-100">
      {label}
    </button>
  );
}

export default MenuItem;
