interface MessageProps {
  userPicture: string;
  userName: string;
  messageText: string;
  timestamp: Date;
  // file?: File;
}

export default function Message({
  userPicture,
  userName,
  messageText,
  timestamp,
}: MessageProps) {
  // const [addedFile, setAddedFile] = useState<File | null>()

  const formatDate = (date: Date) => {
    // const isoString = date.toISOString();
    // const [datePart, timePart] = isoString.split("T");
    // const [year, day, month] = datePart.split("-");
    // const time = timePart.split(".")[0];
    // return `${day}.${month}.${year} ${time}`;

    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  };

  return (
    <span
      className={`${
        userName === "Bot" ? "bg-red-300 me-10" : "bg-blue-300 ms-10"
      } rounded-3xl p-3 flex flex-col gap-3 shadow-xl`}
    >
      <div className="flex items-center">
        <img
          className="rounded-full mr-2 w-8 h-8"
          src={userPicture}
          alt={`${userName} picture`}
        />
        <span
          className={`${
            userName === "Bot" ? "text-red-300" : "text-indigo-700"
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
      <span className="">{messageText}</span>
      <span className="text-end text-gray-200">{formatDate(timestamp)}</span>
    </span>
  );
}
