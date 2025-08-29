interface SearchAndFilterProps {
  searchQuery: string;
  filter: "all" | "active" | "completed";
  isVisible: boolean;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  onToggleVisibility: () => void;
}

export default function SearchAndFilter({
  searchQuery,
  filter,
  isVisible,
  onSearchChange,
  onFilterChange,
  onToggleVisibility,
}: SearchAndFilterProps) {
  return (
    <>
      {/* 검색 및 필터 (토글 가능) */}
      <div
        className={`transition-all duration-300 ${
          isVisible
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-4 space-y-3">
          {/* 검색 */}
          <div className="relative">
            <input
              type="text"
              placeholder="할 일 검색..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* 필터 버튼들 */}
          <div className="flex gap-2">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-sm ${
                  filter === f
                    ? "bg-white/30 text-white border border-white/50"
                    : "bg-white/20 text-white/90 hover:bg-white/30 border border-white/30"
                }`}
              >
                {f === "all" && "전체"}
                {f === "active" && "진행중"}
                {f === "completed" && "완료"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 검색 토글 버튼 */}
      <div className="flex justify-center py-2">
        <button
          onClick={onToggleVisibility}
          className="px-4 py-2 text-white/80 hover:text-white text-sm transition-colors backdrop-blur-sm hover:bg-white/20 rounded-lg"
        >
          {isVisible ? "검색 숨기기" : "검색 보이기"}
        </button>
      </div>
    </>
  );
}
