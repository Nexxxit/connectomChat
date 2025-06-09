interface MessageProps {
  userName: string;
  messageText: string;
  timestamp: Date;
  // file?: File;
}

export default function Message({
  userName,
  messageText,
  timestamp,
}: MessageProps) {
  // const [addedFile, setAddedFile] = useState<File | null>()

  const formatDate = (date: Date) => {
    const isoString = date.toISOString();
    const [datePart, timePart] = isoString.split("T");
    const [year, day, month] = datePart.split("-");
    const time = timePart.split(".")[0];
    return `${day}.${month}.${year} ${time}`;
  };

  return (
    <span
      className={`${
        userName === "Bot" ? "bg-red-300 me-10" : "bg-blue-300 ms-10"
      } rounded-3xl p-3 flex flex-col gap-3 shadow-xl`}
    >
      <span
        className={`text-${
          userName === "Bot" ? "red" : "indigo"
        }-700 font-bold`}
      >
        {userName}
      </span>
      {/* {addedFile && (
                <div>
                    {addedFile}
                </div>
            )} */}
      <span className="">{messageText}</span>
      <span className="text-end text-gray-200">{formatDate(timestamp)}</span>
    </span>
  );
}
