import { useEffect, useRef } from "react";
import { messageStore } from "../../stores/messageStore";
import Message from "../message/Message";
import { observer } from "mobx-react-lite";

export default observer(function MessageList() {
  const prevLengthRef = useRef(0);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageStore.messages.length > prevLengthRef.current) {
      if (messageEndRef.current) {
        messageEndRef.current?.scrollTo({
          top: messageEndRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    prevLengthRef.current = messageStore.messages.length;
  }, [messageStore.messages]);

  return (
    <div
      className="col-span-6 row-span-3 flex flex-col gap-3 overflow-y-scroll p-3 custom-scrollbar"
      ref={messageEndRef}
    >
      {messageStore.messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          userPicture={message.userPicture}
          userName={message.userName}
          messageText={message.messageText}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
});
