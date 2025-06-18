import { useEffect, useState } from "react";
import UserPickerBtn from "../userPickerBtn/UserPickerBtn";
import { messageStore } from "../../stores/messageStore";
import { observer } from "mobx-react-lite";

export default observer(function UserPickerMenu() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMockData = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (Math.random() < 0.2) {
          throw new Error("Не удалось получить данные пользователей.");
        }

        const mockUserList = [
          {
            userName: "user1",
            userPicture:
              "https://avatars.mds.yandex.net/i?id=eae74698d024c34c7350f8127284d98d_l-4033630-images-thumbs&n=13",
            checked: true,
          },
          {
            userName: "user2",
            userPicture:
              "https://avatars.mds.yandex.net/get-yapic/43978/Gi2hpA5z8CclqDzPKMMeVZB39Lw-1/orig",
            checked: false,
          },
          {
            userName: "user3",
            userPicture:
              "https://i.pinimg.com/originals/33/20/50/332050958dd6ce50ede5ed5c14544bb2.jpg",
            checked: false,
          },
          {
            userName: "Bot",
            userPicture:
              "https://i.pinimg.com/736x/97/19/70/971970605fc12e0a49676699bf2137fc.jpg",
            checked: false,
          },
        ];

        messageStore.setUsers(mockUserList);

        const checkedUser = mockUserList.find((user) => user.checked);
        if (checkedUser) {
          messageStore.setSelectedUser(checkedUser.userName);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMockData();
  }, []);

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    messageStore.setSelectedUser(e.target.value);
  };

  return (
    <aside
      className="row-span-4 col-[7_/_span_1] shadow p-2 rounded-xl flex flex-col gap-3  bg-gray-900/80
  backdrop-blur-lg border
  border-gray-700/50 shadow-2xl
  shadow-black/40"
    >
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-4 animate-pulse">
          <div className="rounded-full bg-gray-200 h-24 w-24"></div>
          <div className="rounded-full bg-gray-200 h-24 w-24"></div>
          <div className="rounded-full bg-gray-200 h-24 w-24"></div>
          <div className="rounded-full bg-gray-200 h-24 w-24"></div>
        </div>
      ) : (
        messageStore.users.map((user) => (
          <UserPickerBtn
            key={user.userName}
            userName={user.userName}
            userPicture={user.userPicture}
            checked={messageStore.selectedUser?.userName === user.userName}
            onChange={handleChangeUser}
          />
        ))
      )}
    </aside>
  );
});
