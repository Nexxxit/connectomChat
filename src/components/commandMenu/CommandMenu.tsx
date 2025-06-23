type CommandProps = {
  handleSendCommand: (userCommand: string) => void;
};

export default function CommandMenu({ handleSendCommand }: CommandProps) {
  const commands = ["/hello", "/sendImage", "/sendLink"];

  return (
    <div className="flex flex-col gap-3">
      {commands.map((cmd) => (
        <button
          key={cmd}
          className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400"
          onClick={() => handleSendCommand(cmd)}
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}
