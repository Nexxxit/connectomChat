import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import MessageContextMenu from "../messageContextMenu/MessageContextMenu";

interface MessageProps {
  id: number;
  userPicture: string;
  userName: string;
  messageText: string;
  timestamp: Date;
  // file?: File;
}

export default observer(function Message({
  id,
  userPicture,
  userName,
  messageText,
  timestamp,
}: MessageProps) {
  // const [addedFile, setAddedFile] = useState<File | null>()
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (isMenuOpen) e.preventDefault();
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("scroll", handleScroll, { passive: false });
      document.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("wheel", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideMenu =
        menuRef.current && !menuRef.current.contains(event.target as Node);

      if (isOutsideMenu) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(true);

    setMenuPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <>
      <div
        className={`${
          userName === "Bot"
            ? "bg-white text-gray-900 me-10"
            : "bg-teal-500 text-white ms-10"
        } relative rounded-3xl p-3 flex flex-col gap-3 shadow-lg
  backdrop-blur-sm
  bg-opacity-90`}
        onContextMenu={handleContextMenu}
      >
        <div className="flex items-center">
          <img
            className="rounded-full mr-2 w-8 h-8"
            src={userPicture}
            alt={`${userName} picture`}
          />
          <span
            className={`${
              userName === "Bot"
                ? "text-indigo-300 font-medium"
                : "text-white/90 text-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
            } font-bold`}
          >
            {userName}
          </span>
        </div>
        {/* {addedFile && (
                <div>
                    {addedFile}
                </div>
            )} */}
        <span>{messageText}</span>
        <span className="text-end text-gray-700">{formatDate(timestamp)}</span>
      </div>
      {isMenuOpen && (
        <MessageContextMenu
          position={menuPosition}
          onClose={() => setMenuOpen(false)}
          messageId={id}
          ref={menuRef}
        />
      )}
    </>
  );
});
