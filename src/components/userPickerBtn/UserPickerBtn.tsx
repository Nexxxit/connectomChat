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
    <div
      className={`flex items-center justify-center transition-all
  duration-300 ${checked ? "scale-105" : "scale-100"}`}
    >
      <div
        className={`
    w-24 h-24 rounded-full overflow-hidden 
    outline-offset-3 transition-all
    duration-300  bg-gray-800/30
    backdrop-blur-sm
    border
    ${checked ? "border-teal-400/50" : "border-gray-700/30"}
    ${
      checked
        ? "shadow-[0_0_15px_3px_rgba(16,185,129,0.4)]"
        : "hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]"
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
            className={`object-cover w-full h-full pointer-events-none transition-all
          duration-500
          ${checked ? "grayscale-0" : "grayscale-[30%]"}
          ${checked ? "brightness-110" : "brightness-90"}
          ${checked ? "scale-105" : "scale-100"}`}
            src={userPicture}
            alt="userPicture"
          />
        </label>
      </div>
    </div>
  );
}
