interface HeaderProps {
  onMenuClick: () => void;
  onOptionsClick: () => void;
}

export default function Header({ onMenuClick, onOptionsClick }: HeaderProps) {
  // 현재 날짜 정보
  const currentDate = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const currentDay = days[currentDate.getDay()];
  const currentMonth = currentDate.getMonth() + 1;
  const currentDateNum = currentDate.getDate();

  return (
    <div className="border-b border-white/20">
      <div className="flex items-center justify-between p-4">
        {/* 왼쪽: 메뉴 버튼 */}
        <button
          onClick={onMenuClick}
          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* 중앙: 제목과 날짜 */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-white drop-shadow-lg">
            오늘 할 일
          </h1>
          <p className="text-white/90 text-sm drop-shadow-md">
            {currentMonth}월 {currentDateNum}일 {currentDay}요일
          </p>
        </div>

        {/* 오른쪽: 옵션 버튼들 */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </button>
          <button
            onClick={onOptionsClick}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
