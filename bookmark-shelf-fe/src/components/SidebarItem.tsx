import type { ReactElement } from "react";

interface SidebarItemProps {
  title: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
}

export function SidebarItem({ title, icon, onClick, active }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center py-2 cursor-pointer px-4 rounded transition-all duration-300 max-w-48
        ${active ? "bg-indigo-100 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      <div className="pr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
