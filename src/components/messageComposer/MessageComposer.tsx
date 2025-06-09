import { useState } from "react";
import { messageStore } from "../../stores/messageStore";

export default function MessageComposer() {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    messageStore.addMessage(messageText);
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="col-span-6 row-span-1 border rounded-xl p-3 flex gap-3 justify-between bg-indigo-700">
      <label className="shadow p-1 rounded-full bg-white active:translate-y-1 transition duration-100 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-paperclip"
          viewBox="0 0 16 16"
        >
          <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
        </svg>
        <input
          className="shrink border cursor-pointer p-1 hidden"
          type="file"
        />
      </label>
      <input
        className="w-full border rounded-3xl px-2 grow-1 bg-white shadow"
        type="text"
        placeholder="Введите текст"
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
        value={messageText}
      />
      <button
        onClick={handleSendMessage}
        className="shrink border cursor-pointer p-1 rounded-full shadow bg-blue-700 active:translate-y-1 transition duration-100 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="16"
          fill="currentColor"
          className="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
        </svg>
      </button>
    </div>
  );
}
