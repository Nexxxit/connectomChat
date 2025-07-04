import { Provider } from "mobx-react";
import { observer } from "mobx-react-lite";
import MessageComposer from "./components/messageComposer/MessageComposer";
import MessageList from "./components/messageList/MessageList";
import UserPickerMenu from "./components/userPickerMenu/UserPickerMenu";
import { messageStore } from "./stores/messageStore";
import {Modal} from "./components/modal/Modal.tsx";

function App() {
  return (
    <Provider messageStore={messageStore}>
      <div className="flex justify-center">
        <div className="grid grid-cols-6 grid-rows-3 border rounded-xl py-2 px-4 gap-2 h-screen w-3/4  bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 bg-fixed">
          <MessageList />
          <UserPickerMenu />
          <MessageComposer />
        </div>
      </div>
      <Modal
          iframeLink={messageStore.modalContent || ''}
          isOpen={messageStore.isModalOpen}
          onClose={() => messageStore.closeModal()}
      />
    </Provider>
  );
}

export default observer (App);
