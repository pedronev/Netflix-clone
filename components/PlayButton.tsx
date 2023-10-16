import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { BsFillPlayFill } from "react-icons/bs";

const PlayButton = ({ movieId }: { movieId: string }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
    bg-white rounded-md 
    py-1 md:py-2 px-2 md:px-4 
    w-auto text-xs lg:text-lg 
    font-semibold flex flex-row 
    items-center hover:bg-neutral-300 
    transition"
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </div>
  );
};

PlayButton.prototype = {
  movieId: PropTypes.string,
};

export default PlayButton;
