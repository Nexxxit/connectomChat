import { useEffect, useState } from "react";
import UserPickerBtn from "../userPickerBtn/UserPickerBtn";
import { messageStore } from "../../stores/messageStore";

export default function UserPickerMenu() {
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
              "https://steamuserimages-a.akamaihd.net/ugc/1806529912255160538/5F20B565707FF4F5E5F6E0E5E4C47A297B08161D/?imw=512&amp;imh=341&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true",
            checked: false,
          },
          {
            userName: "user2",
            userPicture:
              "https://avatars.mds.yandex.net/get-yapic/43978/Gi2hpA5z8CclqDzPKMMeVZB39Lw-1/orig",
            checked: true,
          },
          {
            userName: "user3",
            userPicture:
              "https://i.pinimg.com/originals/33/20/50/332050958dd6ce50ede5ed5c14544bb2.jpg",
            checked: false,
          },
        ];

        messageStore.setUser(
          mockUserList.map(({ userName, userPicture }) => ({
            userName,
            userPicture,
          }))
        );

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
    <aside className="row-span-4 col-[7_/_span_1] border p-2 rounded-xl flex flex-col gap-3 bg-indigo-700">
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-4 animate-pulse">
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
            checked={messageStore.selectedUser === user.userName}
            onChange={handleChangeUser}
          />
        ))
      )}
    </aside>
  );
}
