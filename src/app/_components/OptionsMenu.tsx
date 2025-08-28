"use client";

import { useState } from "react";
import BackgroundSettings from "./BackgroundSettings";

interface OptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OptionsMenu({ isOpen, onClose }: OptionsMenuProps) {
  const [showBackgroundSettings, setShowBackgroundSettings] = useState(false);

  const options = [
    {
      id: "sort",
      icon: "☰",
      label: "정렬",
      description: "할 일 정렬 방식 변경",
    },
    {
      id: "background",
      icon: "🖼️",
      label: "배경 설정",
      description: "배경 이미지 및 효과 변경",
    },
    {
      id: "print",
      icon: "🖨️",
      label: "목록 인쇄",
      description: "할 일 목록을 인쇄하기",
    },
    {
      id: "share",
      icon: "📤",
      label: "복사본 보내기",
      description: "할 일 목록을 다른 사람과 공유",
    },
  ];

  const handleOptionClick = (optionId: string) => {
    switch (optionId) {
      case "sort":
        // 정렬 옵션 모달 열기
        break;
      case "background":
        setShowBackgroundSettings(true);
        break;
      case "print":
        // 인쇄 기능
        window.print();
        break;
      case "share":
        // 공유 기능
        if (navigator.share) {
          navigator.share({
            title: "Ye's Todo List",
            text: "할 일 목록을 확인해보세요!",
            url: window.location.href,
          });
        }
        break;
    }
  };

  if (showBackgroundSettings) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto border border-white/20">
          <div className="p-6">
            {/* 뒤로가기 버튼 */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowBackgroundSettings(false)}
                className="flex items-center gap-2 text-gray-900 hover:text-blue-700 font-medium"
              >
                <span className="text-xl">←</span>
                <span className="pt-2">뒤로</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <BackgroundSettings
              onClose={() => setShowBackgroundSettings(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 오버레이 - 배경 투명하게 */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}

      {/* 옵션 메뉴 - 배경 투명하게 */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-in-out z-50 border border-white/20 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* 드래그 핸들 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/60 rounded-full"></div>
        </div>

        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-white/30">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">목록 옵션</h3>
            <button
              onClick={onClose}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              완료
            </button>
          </div>
        </div>

        {/* 옵션 목록 */}
        <div className="p-6 space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/50 transition-colors text-left border border-white/30 bg-white/30"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 하단 여백 */}
        <div className="h-8"></div>
      </div>
    </>
  );
}
