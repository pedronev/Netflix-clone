import PropTypes from "prop-types";

const MoblieMenu = ({ visible }: { visible: boolean }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-4 text-center text-white hover:underline">Home</div>
        <div className="px-4 text-center text-white hover:underline">
          Series
        </div>
        <div className="px-4 text-center text-white hover:underline">
          Movies
        </div>
        <div className="px-4 text-center text-white hover:underline">New</div>
        <div className="px-4 text-center text-white hover:underline">
          My List
        </div>
      </div>
    </div>
  );
};

MoblieMenu.prototype = {
  visible: PropTypes.bool,
};

export default MoblieMenu;
