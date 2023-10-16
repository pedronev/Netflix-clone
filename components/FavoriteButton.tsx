import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

const FavoriteButton = ({ movieId }: { movieId: string }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser?.favoriteIds, movieId]);

  const toggleFavorites = useCallback(async () => {
    try {
      let response;

      if (isFavorite) {
        axios.defaults.headers.common["movie-id"] = movieId;
        response = await axios.post("/api/favorite", {
          movieId,
          action: "remove",
        });
      } else {
        response = await axios.post("/api/favorite", {
          movieId,
          action: "add",
        });
      }

      const updateFavoriteIds = response?.data?.favoriteIds;

      mutate({
        ...currentUser,
        favoriteIds: updateFavoriteIds,
      });

      mutateFavorites();
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="
    cursor-pointer 
    group/item 
    w-6 h-6 
    lg:w-10 lg:h-10 
    border-white
    border-2 
    rounded-full 
    flex 
    justify-center 
    items-center 
    transition 
    hover:border-neutral-300"
    >
      <Icon className="text-white" size={28} />
    </div>
  );
};

export default FavoriteButton;
