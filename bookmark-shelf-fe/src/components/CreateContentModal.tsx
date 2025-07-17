import { useRef, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

import { Button } from "./Button";
import { InputComp } from "./Input";
import { BACKNEND_URL } from "../config";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Reddit = "reddit"
}

export function CreateContentModal({ open, onClose }: ContentModalProps) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleref.current?.value?.trim();
    const link = linkref.current?.value?.trim();

    if (!title || !link) {
      alert("Please fill in both title and link.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BACKNEND_URL}/api/v1/content`,
        { title, link, type },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      onClose();
    } catch (err) {
      console.error("Error adding content", err);
      alert("Failed to add content.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>

        <div className="space-y-3">
          <InputComp ref={titleref} placeholder="Title"  />
          <InputComp ref={linkref} placeholder="Link"  />
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 font-medium mb-2">Select Type:</p>
          <div className="flex gap-2">
            <Button
              text="YouTube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
            <Button
              text="Reddit"
              variant={type === ContentType.Reddit ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Reddit)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={addContent}
            variant="primary"
            text="Submit"
            loading={loading}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
