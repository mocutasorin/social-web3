const News = () => (
  <div className="bg-white border-gray-200 border-solid border p-3">
    <div className="flex items-center pb-5 justify-between">
      <h2 className="font-semibold text-gray-800 text-lg">News Update</h2>
      <a href="#" className="text-xs text-blue-700">
        See all
      </a>
    </div>

    <div className="flex pb-5">
      <div className="hidden md:w-1/3 md:flex items-center">
        <img
          src="https://source.unsplash.com/random/100x100"
          height={100}
          width={100}
        />
      </div>
      <div className="md:w-2/3 pl-2">
        <h3 className="font-semibold text-gray-900 pb-2 text-sm">
          Genesis and DCG seek path for the recovery of assets...
        </h3>
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
          nostrum consectetur repellat
        </p>
        <a href="#" className="text-xs text-blue-700">
          See more
        </a>
      </div>
    </div>
    <div className="flex pb-5">
      <div className="hidden md:w-1/3 md:flex items-center">
        <img
          src="https://source.unsplash.com/random/101x101"
          height={100}
          width={100}
        />
      </div>
      <div className="md:w-2/3 pl-2">
        <h3 className="font-semibold text-gray-900 pb-2 text-sm">
          Genesis and DCG seek path for the recovery of assets...
        </h3>
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
          nostrum consectetur repellat
        </p>
        <a href="#" className="text-xs text-blue-700">
          See more
        </a>
      </div>
    </div>
  </div>
);

export default News;
