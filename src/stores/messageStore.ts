import { makeAutoObservable } from "mobx";

interface User {
    userName: string;
    userPicture: string;
}

interface Message {
    id: number;
    userName: string;
    messageText: string;
    date: Date;
    file?: File;
}

class MessageStore {
    users: User[] = [];
    message: Message[] = [];
    selectedUser: string = "";

    constructor(){
        makeAutoObservable(this)
    }

    setUser(users: User[]) {
        this.users = users;
        if(users.length > 0 && !this.selectedUser) {
            this.selectedUser = users[0].userName;
        }
    }

    setSelectedUser (userName: string) {
        this.selectedUser = userName;
    }

    addMessage(messageText: string) {
        if (!this.selectedUser || messageText.trim() === '') return;

        const newMessage: Message = {
            id: Date.now(),
            userName: this.selectedUser,
            messageText: messageText.trim(),
            date: new Date(),
        }

        this.message.push(newMessage);
    }

    deleteMessage(id: number) {
        this.message = this.message.filter(msg => msg.id !== id);
    }
}

export const messageStore = new MessageStore();