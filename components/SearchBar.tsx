const SearchBar = () => (
  <div className="relative hidden md:block w-full md:w-1/2">
    {/* Search icon */}
    <div className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-500"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
    {/* Search input */}
    <input
      type="text"
      id="search-navbar"
      className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
      placeholder="Search"
    />
  </div>
);

export default SearchBar;
