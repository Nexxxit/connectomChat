interface UserProps {
  userName: string;
  checked?: boolean;
  userPicture: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserPickerBtn({
  userName,
  userPicture,
  checked = false,
  onChange,
}: UserProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
    w-24 h-24 rounded-full overflow-hidden 
    outline-offset-3
    ${
      checked
        ? "outline outline-2 outline-indigo-100"
        : "hover:outline hover:outline-2 hover:outline-indigo-300"
    }
  `}
      >
        <label className="block w-full h-full cursor-pointer">
          <input
            className="hidden"
            type="radio"
            name="user"
            onChange={onChange}
            value={userName}
            checked={checked}
          />
          <img
            className="object-cover w-full h-full pointer-events-none"
            src={userPicture}
            alt="userPicture"
          />
        </label>
      </div>
    </div>
  );
}
