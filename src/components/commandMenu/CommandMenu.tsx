import { messageStore } from "../../stores/messageStore";

export default function CommandMenu() {
  const commands = [
    {
      command: '/hello',
      response: 'Hello!'
    },
    {
      command: '/by',
      response: 'By!'
    }
  ]

  const handleSendCommand = (userCommand: string, botResponse: string) => {
    messageStore.addMessage(userCommand);
    messageStore.addBotMessage(botResponse);
  }

  return (
    <div className="flex flex-col gap-3">
      {commands.map(cmd => (
        <button className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400" onClick={() => handleSendCommand(cmd.command, cmd.response)}>{cmd.command}</button>
      ))}
      {/* <button className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400">*Что-то делаю*</button>
      <button className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400">*Что-то делаю*</button>
      <button className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400">*Что-то делаю*</button>
      <button className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400">*Что-то делаю*</button> */}
    </div>
  );
}
