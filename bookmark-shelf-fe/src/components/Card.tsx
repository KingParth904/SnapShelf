import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

export type CardType = "twitter" | "youtube" | "reddit";

interface CardProps {
  title: string;
  link: string;
  type: CardType;
}


function extractYouTubeId(url: string): string {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

export function Card({ title, link, type }: CardProps) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "twitter" && window.twttr?.widgets) {
      window.twttr.widgets.load(tweetRef.current);
    }
  }, [link,type]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-200 max-w-80 min-h-[300px] min-w-[320px] flex flex-col justify-between transition-transform hover:scale-[1.02] hover:shadow-lg duration-200">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-800 font-semibold truncate w-56">
          {title}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            type === "youtube"
              ? "bg-red-100 text-red-600"
              : type === "twitter"
              ? "bg-blue-100 text-blue-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      <div className="pt-2 grow" ref={tweetRef}>
        {type === "youtube" && (
          <div className="aspect-video w-full rounded overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${extractYouTubeId(link)}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "reddit" && (
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-200">
            <p className="mb-2 line-clamp-3">{title}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline text-sm"
            >
              View on Reddit
            </a>
          </div>
        )}
      </div>

      <div className="pt-4 text-right">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Open in{" "}
          {type === "youtube"
            ? "YouTube"
            : type === "twitter"
            ? "Twitter"
            : "Reddit"}
        </a>
      </div>
    </div>
  );
}
