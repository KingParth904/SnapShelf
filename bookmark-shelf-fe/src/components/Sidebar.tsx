import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import BookmarkAnimation from "../icons/mainicon";
import { XIcon } from "../icons/XIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { RedditIcon } from "../icons/RedditIcon";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";

export type ContentType = "twitter" | "youtube" | "reddit" | "all";

interface SidebarProps {
  onSelectType: (type: ContentType) => void;
}

export function Sidebar({ onSelectType }: SidebarProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ContentType>("all");

  const handleSelect = (type: ContentType) => {
    setSelected(type);
    onSelectType(type);
  };

  const staticIcon = useMemo(() => <BookmarkAnimation />, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r px-6 py-4 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          SnapShelf {staticIcon}
        </div>

        <div className="mt-8 space-y-3">
          <SidebarItem
            title="All"
            icon={<div className="text-lg font-bold">📚</div>}
            active={selected === "all"}
            onClick={() => handleSelect("all")}
          />
          <SidebarItem
            title="X (Twitter.com)"
            icon={<XIcon />}
            active={selected === "twitter"}
            onClick={() => handleSelect("twitter")}
          />
          <SidebarItem
            title="YouTube"
            icon={<YoutubeIcon />}
            active={selected === "youtube"}
            onClick={() => handleSelect("youtube")}
          />
          <SidebarItem
            title="Reddit"
            icon={<RedditIcon />}
            active={selected === "reddit"}
            onClick={() => handleSelect("reddit")}
          />
        </div>
      </div>

      <div className="pb-4">
        <Button
          text="Logout"
          variant="secondary"
          fullWidth
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        />
      </div>
    </div>
  );
}
