"use client";

import { useSyncExternalStore } from "react";

// <html>의 "dark" 클래스를 기준으로 현재 테마를 읽고, 바뀌면 다시 그립니다.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
// 서버에서는 테마를 알 수 없으므로 null을 돌려줍니다.
const getServerSnapshot = () => null;

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // 저장소를 쓸 수 없는 환경에서는 현재 화면에만 적용합니다.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-lg shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-gray-800 dark:bg-gray-900"
    >
      {/* 테마를 알기 전에는 아이콘을 비워 서버/클라이언트 불일치를 막습니다. */}
      {isDark === null ? null : isDark ? "☀️" : "🌙"}
    </button>
  );
}
