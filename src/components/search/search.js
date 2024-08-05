import searchIcon from "../../../public/icons/icon-search.png";

const Search = () => {
  return (
    <div className="relative rounded-lg w-full">
      <input
        type="text"
        className="flex-grow px-4 py-2 bg-transparent border border-white/10 focus:outline-none h-fit w-full text-lg rounded-lg"
      />
      <img
        src={searchIcon.src}
        alt="icon"
        className="h-4 w-4 object-contain absolute right-4 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default Search;
