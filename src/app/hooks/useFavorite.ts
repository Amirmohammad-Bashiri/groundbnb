import { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

type UseFavoriteType = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export function useFavorite({ listingId, currentUser }: UseFavoriteType) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = currentUser?.favoriteIds?.includes(listingId);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();

        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}
