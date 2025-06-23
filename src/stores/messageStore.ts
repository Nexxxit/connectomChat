import { makeAutoObservable } from "mobx";

interface User {
  userName: string;
  userPicture: string;
}

interface Message {
  id: number;
  userPicture: string;
  userName: string;
  messageText: string;
  timestamp: Date;
  file?: File;
  image?: string[];
  link?: string[];
}

interface BotResponse {
  trigger: string;
  text: string;
  image?: string[];
  link?: string[];
}

class MessageStore {
  users: User[] = [];
  messages: Message[] = [];
  selectedUser: User | null = null;
  botResponse: BotResponse[] = [
    {
      trigger: "/hello",
      text: "Hello!",
    },
    {
      trigger: "/sendImage",
      text: "Image for you",
      image: ["https://live.staticflickr.com/6056/6878030444_3442d89ce1_b.jpg", "https://i.redd.it/4blew0edyw711.jpg"],
    },
    {
      trigger: "/sendLink",
      text: "Link for you",
      link: ["https://www.youtube.com/watch?v=HIcSWuKMwOw"],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users: User[]) {
    this.users = users;
    if (users.length > 0 && !this.selectedUser) {
      this.selectedUser = users[0];
    }
  }

  setSelectedUser(userName: string) {
    const user = this.users.find((u) => u.userName === userName);
    if (user) {
      this.selectedUser = user;
    }
  }

  addMessage(messageText: string) {
    if (!this.selectedUser || messageText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      userPicture: this.selectedUser.userPicture,
      userName: this.selectedUser.userName,
      messageText: messageText.trim(),
      timestamp: new Date(),
    };

    this.messages = [...this.messages, newMessage];
  }

  deleteMessage(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  addBotMessage() {
    if (
      this.messages.length === 0 ||
      this.messages[this.messages.length - 1].userName === "Bot"
    )
      return;

    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage.userName === "Bot") return;

    const response = this.botResponse.find(
      (response) => response.trigger === lastMessage.messageText
    );
    if (!response) return;

    const botMessage: Message = {
      id: Date.now(),
      userPicture:
        "https://i.pinimg.com/736x/97/19/70/971970605fc12e0a49676699bf2137fc.jpg",
      userName: "Bot",
      messageText: response.text,
      timestamp: new Date(),
      image: response.image,
      link: response.link,
    };

    this.messages = [...this.messages, botMessage];
  }
}

export const messageStore = new MessageStore();
