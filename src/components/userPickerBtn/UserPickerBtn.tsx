import {observer} from "mobx-react-lite";
import {messageStore} from "../../stores/messageStore.ts";
import {useCallback, useMemo} from "react";

interface UserProps {
    userName: string;
    userPicture: string;
}

export default observer(function UserPickerBtn({
                                                   userName,
                                                   userPicture,
                                               }: UserProps) {

    const isChecked = useMemo(
        () => messageStore.selectedUser?.userName === userName,
        [messageStore.selectedUser?.userName, userName]);

    const handleChangeUser = useCallback(() => {
        messageStore.setSelectedUser(userName);
    }, [userName]);

    return (
        <div
            className={`flex items-center justify-center transition-all
  duration-300 ${isChecked ? "scale-105" : "scale-100"}`}
        >
            <div
                className={`
    w-24 h-24 rounded-full overflow-hidden 
    outline-offset-3 transition-all
    duration-300  bg-gray-800/30
    backdrop-blur-sm
    border
    ${isChecked ? "border-teal-400/50" : "border-gray-700/30"}
    ${
                    isChecked
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
                        onChange={handleChangeUser}
                        value={userName}
                        checked={isChecked}
                    />
                    <img
                        className={`object-cover w-full h-full pointer-events-none transition-all
          duration-500
          ${isChecked ? "grayscale-0" : "grayscale-[30%]"}
          ${isChecked ? "brightness-110" : "brightness-90"}
          ${isChecked ? "scale-105" : "scale-100"}`}
                        src={userPicture}
                        alt="userPicture"
                    />
                </label>
            </div>
        </div>
    );
})
