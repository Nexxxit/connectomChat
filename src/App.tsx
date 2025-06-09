import { Provider } from "mobx-react";
import MessageComposer from "./components/messageComposer/MessageComposer";
import MessageList from "./components/messageList/MessageList";
import UserPickerMenu from "./components/userPickerMenu/UserPickerMenu";
import { messageStore } from "./stores/messageStore";

function App() {
  return (
    <Provider messageStore={messageStore}>
      <div className="flex justify-center">
        <div className="grid grid-cols-6 grid-rows-3 border rounded-xl py-2 px-4 gap-2 h-screen w-3/4 bg-green-500/20">
          <MessageList />
          <UserPickerMenu />
          <MessageComposer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
