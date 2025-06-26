import {messageStore} from "../../stores/messageStore.ts";

type CommandProps = {
    handleSendCommand: (userCommand: string) => void;
};

export default function CommandMenu({handleSendCommand}: CommandProps) {
    const commands = messageStore.commandHandlers.map(command => command);

    return (
        <div className="flex flex-col gap-3">
            {commands.map((cmd) => (
                <button
                    key={cmd.trigger}
                    className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-400"
                    onClick={() => handleSendCommand(cmd.trigger)}
                >
                    {cmd.label}
                </button>
            ))}
        </div>
    );
}
