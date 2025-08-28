"use client";

import { useState } from "react";
import { useTodoStore } from "../_store/todoStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { todos, categories, filter, setFilter } = useTodoStore();

  const menuItems = [
    {
      id: "today",
      icon: "☀️",
      label: "오늘 할 일",
      count: todos.filter((t) => !t.completed).length,
    },
    {
      id: "important",
      icon: "⭐",
      label: "중요",
      count: todos.filter((t) => t.priority === "high").length,
    },
    {
      id: "planned",
      icon: "📅",
      label: "계획된 일정",
      count: todos.filter((t) => t.dueDate).length,
    },
    { id: "all", icon: "∞", label: "모두", count: todos.length },
    { id: "assigned", icon: "👤", label: "나에게 할당됨", count: 0 },
    { id: "flagged", icon: "🚩", label: "플래그가 지정된 전자 메일", count: 0 },
    {
      id: "work",
      icon: "🏠",
      label: "작업",
      count: todos.filter((t) => t.category === "2").length,
    },
  ];

  const projectFolders = [
    {
      id: "projects",
      icon: "📁",
      label: "프로젝트",
      children: [
        {
          id: "study",
          icon: "📋",
          label: "스터디",
          count: todos.filter((t) => t.category === "3").length,
        },
      ],
    },
    {
      id: "certificates",
      icon: "📁",
      label: "자격증",
      children: [
        { id: "cert-related", icon: "📋", label: "정처기 관련", count: 2 },
      ],
    },
    {
      id: "study",
      icon: "📁",
      label: "공부",
      children: [{ id: "self-dev", icon: "📋", label: "자기계발", count: 3 }],
    },
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === "today") setFilter("active");
    else if (menuId === "all") setFilter("all");
    else if (menuId === "completed") setFilter("completed");
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              최다
            </div>
            <div>
              <h3 className="font-semibold text-lg">최다예</h3>
              <p className="text-blue-100 text-sm">Todo Manager</p>
            </div>
          </div>
        </div>

        {/* 메뉴 아이템들 */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-700">{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 구분선 */}
        <div className="px-4">
          <hr className="border-gray-200" />
        </div>

        {/* 프로젝트 폴더들 */}
        <div className="p-4 space-y-2">
          {projectFolders.map((folder) => (
            <div key={folder.id}>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{folder.icon}</span>
                  <span className="text-gray-700">{folder.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">...</span>
                  <span className="text-gray-400">⌄</span>
                </div>
              </button>

              {/* 하위 아이템들 */}
              <div className="ml-8 space-y-1">
                {folder.children.map((child) => (
                  <button
                    key={child.id}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{child.icon}</span>
                      <span className="text-gray-600 text-sm">
                        {child.label}
                      </span>
                    </div>
                    {child.count > 0 && (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {child.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 액션 버튼 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <span className="text-xl">+</span>
            <span>새 목록</span>
          </button>
        </div>
      </div>
    </>
  );
}
