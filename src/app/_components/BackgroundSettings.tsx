"use client";

import { useState, useRef } from "react";
import { useSettingsStore } from "../_store/settingsStore";
import { defaultImages } from "../_constants/images";

interface BackgroundSettingsProps {
  onClose: () => void;
}

export default function BackgroundSettings({
  onClose,
}: BackgroundSettingsProps) {
  const { background, updateBackground, uploadBackgroundImage } =
    useSettingsStore();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 기본 배경 이미지들 (상수에서 가져오기)
  const backgroundImages = Object.entries(defaultImages.background).map(
    ([id, url]) => ({
      id,
      url,
      name: getImageName(id),
    })
  );

  // 이미지 ID에 따른 이름 매핑
  function getImageName(id: string): string {
    const nameMap: { [key: string]: string } = {
      default1: "자연 풍경",
      default2: "도시 풍경",
      default3: "산과 하늘",
      default4: "바다 풍경",
      default5: "숲속 길",
      default6: "추상적 배경",
    };
    return nameMap[id] || "배경 이미지";
  }

  // 기본 배경 색상들
  const defaultColors = [
    { id: "color1", color: "#1f2937", name: "다크 그레이" },
    { id: "color2", color: "#3b82f6", name: "블루" },
    { id: "color3", color: "#8b5cf6", name: "퍼플" },
    { id: "color4", color: "#ef4444", name: "레드" },
    { id: "color5", color: "#f97316", name: "오렌지" },
    { id: "color6", color: "#10b981", name: "그린" },
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        await uploadBackgroundImage(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBlurChange = (value: number) => {
    // 블러 값을 0.1 단위로 변환 (0 ~ 2.0)
    const blurValue = value / 10;
    console.log("블러 변경:", blurValue);
    updateBackground({ blur: blurValue });
  };

  const selectDefaultImage = (imageUrl: string) => {
    console.log("이미지 선택:", imageUrl);
    if (imageUrl) {
      updateBackground({ image: imageUrl });
    }
  };

  const selectBackgroundColor = (color: string) => {
    console.log("색상 선택:", color);
    // 색상을 직접 설정 (CSS 그라디언트 대신)
    updateBackground({ image: color });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-800">배경 설정</h3>
      </div>

      {/* 기본 배경 색상 선택 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          배경 색상 선택
        </label>
        <div className="flex gap-3 justify-center">
          {defaultColors.map((colorItem) => (
            <button
              key={colorItem.id}
              onClick={() => selectBackgroundColor(colorItem.color)}
              className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                background.image === colorItem.color
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ backgroundColor: colorItem.color }}
              title={colorItem.name}
            />
          ))}
        </div>
      </div>

      {/* 기본 배경 이미지 선택 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          기본 배경 이미지
        </label>
        <div className="flex gap-3 justify-center">
          {backgroundImages.map((image) => (
            <button
              key={image.id}
              onClick={() => selectDefaultImage(image.url)}
              className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 overflow-hidden ${
                background.image === image.url
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              title={image.name}
            />
          ))}
        </div>
      </div>

      {/* 커스텀 이미지 업로드 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          내 이미지 업로드
        </label>
        <div className="space-y-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? "업로드 중..." : "이미지 선택"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-xs text-gray-500">
            JPG, PNG, WebP 형식 지원 (최대 5MB)
          </p>
        </div>
      </div>

      {/* 블러 효과만 남김 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          블러 효과: {background.blur}px
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={background.blur * 10}
          onChange={(e) => handleBlurChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>선명</span>
          <span>흐림</span>
        </div>
      </div>

      {/* 스타일 */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
