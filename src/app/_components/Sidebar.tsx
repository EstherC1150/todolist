"use client";

import { useState } from "react";
import { useTodoStore } from "../_store/todoStore";
import {
  Sun,
  Star,
  Calendar,
  Infinity,
  User,
  Flag,
  Home,
  FolderOpen,
  FileText,
  ChevronDown,
  Plus,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { todos, categories, filter, setFilter } = useTodoStore();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderType, setNewFolderType] = useState<
    "project" | "certificate" | "study"
  >("project");

  const menuItems = [
    {
      id: "today",
      icon: Sun,
      label: "오늘 할 일",
      count: todos.filter((t) => !t.completed).length,
    },
    {
      id: "important",
      icon: Star,
      label: "중요",
      count: todos.filter((t) => t.priority === "high").length,
    },
    {
      id: "planned",
      icon: Calendar,
      label: "계획된 일정",
      count: todos.filter((t) => t.dueDate).length,
    },
    { id: "all", icon: Infinity, label: "모두", count: todos.length },
    { id: "assigned", icon: User, label: "나에게 할당됨", count: 0 },
    { id: "flagged", icon: Flag, label: "플래그가 지정된 전자 메일", count: 0 },
    {
      id: "work",
      icon: Home,
      label: "작업",
      count: todos.filter((t) => t.category === "2").length,
    },
  ];

  const projectFolders = [
    {
      id: "projects",
      icon: FolderOpen,
      label: "프로젝트",
      children: [
        {
          id: "study",
          icon: FileText,
          label: "스터디",
          count: todos.filter((t) => t.category === "3").length,
        },
      ],
    },
    {
      id: "certificates",
      icon: FolderOpen,
      label: "자격증",
      children: [
        { id: "cert-related", icon: FileText, label: "정처기 관련", count: 2 },
      ],
    },
    {
      id: "study",
      icon: FolderOpen,
      label: "공부",
      children: [
        { id: "self-dev", icon: FileText, label: "자기계발", count: 3 },
      ],
    },
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === "today") setFilter("active");
    else if (menuId === "all") setFilter("all");
    else if (menuId === "completed") setFilter("completed");
    onClose();
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      // 여기에 실제 폴더 추가 로직을 구현할 수 있습니다
      console.log(`새 ${newFolderType} 폴더 추가: ${newFolderName}`);
      setNewFolderName("");
      setShowAddFolder(false);
    }
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40" onClick={onClose} />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-2xl transform transition-transform duration-300 ease-in-out z-50 border-r border-white/20 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 헤더 */}
        <div className="border-b border-white/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-white font-normal text-sm border border-white/30">
              최다
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-700 drop-shadow-sm">
                최 다예
              </h3>
            </div>
          </div>
        </div>

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 메뉴 아이템들 */}
          <div className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-800 font-medium">
                    {item.label}
                  </span>
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
            <hr className="border-white/20" />
          </div>

          {/* 프로젝트 폴더들 */}
          <div className="p-4 space-y-1">
            {projectFolders.map((folder) => (
              <div key={folder.id}>
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <folder.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-800 font-medium">
                      {folder.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">...</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedFolders.has(folder.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* 하위 아이템들 - 펼쳐졌을 때만 보임 */}
                {expandedFolders.has(folder.id) && (
                  <div className="ml-8 space-y-1">
                    {folder.children.map((child) => (
                      <button
                        key={child.id}
                        className="w-full flex items-center justify-between p-2 hover:bg-white/10 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <child.icon className="w-4 h-4 text-gray-400" />
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
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => setShowAddFolder(true)}
            className="w-full flex items-center gap-3 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>새 목록</span>
          </button>
        </div>

        {/* 새 폴더 추가 모달 */}
        {showAddFolder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/20"
              onClick={() => setShowAddFolder(false)}
            />
            <div className="bg-white rounded-xl shadow-2xl p-6 w-80 z-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                새 목록 추가
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    목록 유형
                  </label>
                  <select
                    value={newFolderType}
                    onChange={(e) =>
                      setNewFolderType(
                        e.target.value as "project" | "certificate" | "study"
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="project">프로젝트</option>
                    <option value="certificate">자격증</option>
                    <option value="study">공부</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    목록 이름
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="목록 이름을 입력하세요"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAddFolder(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleAddFolder}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
