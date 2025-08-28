import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppSettings, defaultSettings } from "../_types/settings";

interface SettingsStore extends AppSettings {
  updateBackground: (updates: Partial<AppSettings["background"]>) => void;
  updateTheme: (updates: Partial<AppSettings["theme"]>) => void;
  updateDisplay: (updates: Partial<AppSettings["display"]>) => void;
  resetSettings: () => void;
  uploadBackgroundImage: (file: File) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      updateBackground: (updates) => {
        set((state) => ({
          background: { ...state.background, ...updates },
        }));
      },

      updateTheme: (updates) => {
        set((state) => ({
          theme: { ...state.theme, ...updates },
        }));
      },

      updateDisplay: (updates) => {
        set((state) => ({
          display: { ...state.display, ...updates },
        }));
      },

      resetSettings: () => {
        set(defaultSettings);
      },

      uploadBackgroundImage: async (file: File) => {
        try {
          // 파일을 base64로 변환
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            get().updateBackground({ image: base64 });
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("배경 이미지 업로드 실패:", error);
        }
      },
    }),
    {
      name: "app-settings",
    }
  )
);
