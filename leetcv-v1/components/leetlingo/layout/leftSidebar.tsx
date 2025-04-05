const sidebarElements = [
  { id: 0, name: "LEARN", imgsrc: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg", isActive: true },
  { id: 1, name: "SOUNDS", imgsrc: "https://d35aaqx5ub95lt.cloudfront.net/vendor/3b4928101472fce4e9edac920c1b3817.svg", isActive: false },
  { id: 2, name: "LEADERBOARDS", imgsrc: "https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg", isActive: false },
  { id: 3, name: "QUESTS", imgsrc: "https://d35aaqx5ub95lt.cloudfront.net/vendor/7ef36bae3f9d68fc763d3451b5167836.svg", isActive: false },
  { id: 4, name: "PROFILE", imgsrc: "https://d35aaqx5ub95lt.cloudfront.net/vendor/24e0dcdc06870ead47b3600f0d41eb5b.svg", isActive: false },
  { id: 5, name: "More", imgsrc: "https://d35aaqx5ub95lt.cloudfront.net/vendor/7159c0b5d4250a5aea4f396d53f17f0c.svg", isActive: false }
];

const LeftSidebar = () => {
  return (
    <div className="hidden md:flex flex-col sticky left-0 top-14 h-full w-80 overflow-auto bg-white border-r" style={{ height: "calc(100vh - 0px)" }}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-500">Leetprep</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sidebarElements.map((element) => (
          <button
            key={element.id}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg  font-semibold ${element.isActive
              ? "border border-indigo-300 bg-indigo-100 text-indigo-600"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <img
              alt={element.name.toLowerCase()}
              className="w-8"
              src={element.imgsrc}
            />
            {element.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;
