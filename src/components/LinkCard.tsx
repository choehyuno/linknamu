"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  // 새 탭이 열리는 것을 막지 않도록 sendBeacon으로 클릭을 조용히 기록합니다.
  const recordClick = () => {
    const url = `/api/clicks/${encodeURIComponent(link.id)}`;
    if (!navigator.sendBeacon?.(url)) {
      fetch(url, { method: "POST", keepalive: true }).catch(() => {});
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      onAuxClick={(e) => e.button === 1 && recordClick()}
      className="block w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:translate-y-0 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-500"
    >
      {link.title}
    </a>
  );
}
