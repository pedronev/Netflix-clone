import PropTypes from "prop-types";

const NavbarItem = ({ label }: { label: string }) => {
  return (
    <div className="text-white cursor-pointer hover:text-green-300 transition">
      {label}
    </div>
  );
};

NavbarItem.prototype = {
  label: PropTypes.string.isRequired,
};

export default NavbarItem;
