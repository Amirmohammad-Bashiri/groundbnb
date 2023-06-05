import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { SafeUser } from "@/app/types";
import { useFavorite } from "@/app/hooks/useFavorite";

type HeartButtonprops = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function HeartButton({ listingId, currentUser }: HeartButtonprops) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80">
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}

export default HeartButton;
