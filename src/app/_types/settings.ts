export interface AppSettings {
  background: {
    image: string;
    opacity: number;
    blur: number;
  };
  theme: {
    mode: "light" | "dark" | "auto";
    primaryColor: string;
  };
  display: {
    showSearchByDefault: boolean;
    showCompletedTasks: boolean;
    compactMode: boolean;
  };
}

export const defaultSettings: AppSettings = {
  background: {
    image: "/images/bg/abolfazl-sorkhi-Wg3-Sh7Zh9w-unsplash.jpg", // 실제 존재하는 파일로 변경
    opacity: 1.0, // 0.4에서 1.0으로 변경 - 배경 완전히 보이게
    blur: 0,
  },
  theme: {
    mode: "dark",
    primaryColor: "#3B82F6",
  },
  display: {
    showSearchByDefault: false,
    showCompletedTasks: true,
    compactMode: false,
  },
};
