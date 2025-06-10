import { messageStore } from "../../stores/messageStore";
import Message from "../message/Message";
import { observer } from "mobx-react-lite";

export default observer(function MessageList() {
  return (
    <div className="col-span-6 row-span-3 flex flex-col gap-3 overflow-y-scroll p-3">
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
