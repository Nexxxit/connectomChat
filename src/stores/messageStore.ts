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
}

class MessageStore {
  users: User[] = [];
  messages: Message[] = [];
  selectedUser: User | null = null;

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

  addBotMessage(messageText: string) {
    if (messageText.trim() === "") return;

    const botMessage: Message = {
      id: Date.now(),
      userPicture: 'https://i.pinimg.com/736x/97/19/70/971970605fc12e0a49676699bf2137fc.jpg',
      userName: 'Bot',
      messageText: messageText.trim(),
      timestamp: new Date(),
    };

    this.messages = [...this.messages, botMessage];
  }
}

export const messageStore = new MessageStore();
