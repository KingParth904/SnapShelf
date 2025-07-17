import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import type { ContentType } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKNEND_URL } from "../config";
import type { CardType } from "../components/Card"; // add this if not imported


function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ContentType>("all");
  const [contents, refresh] = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]); 

  const filtered = contents.filter(c =>
  selectedType === "all" || c.type === selectedType
);


  return (
    <>
      <Sidebar onSelectType={setSelectedType} />

      <div className="p-4 ml-72 min-h-screen bg-slate-200 border-0">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKNEND_URL}/api/v1/bookmarks/share`,
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem("token") || "",
                  },
                }
              );
              const shareurl = `{BACKNEND_URL}/api/v1/bookmarks/${response.data.hash}`;
              alert(shareurl);
            }}
            variant="secondary"
            text="Share Instantly"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap mt-4">
          {filtered.map((content, index) => (
  <Card
    key={index}
    type={content.type as CardType} 
    link={content.link}
    title={content.title}
  />
))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
