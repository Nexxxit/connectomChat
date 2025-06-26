import {makeAutoObservable, runInAction} from "mobx";

interface User {
    userName: string;
    userPicture: string;
}

export interface Message {
    id: number;
    userPicture: string;
    userName: string;
    messageText: string;
    timestamp: Date;
    file?: File;
    images?: string[];
    links?: LinkProps[];
    buttons?: string[];
}

export interface LinkProps {
    href: string;
    linkText: string;
}

interface BotResponse {
    textMessage: string;
    images?: string[];
    links?: LinkProps[];
    buttons?: string[];
}

interface CommandHandler {
    trigger: string;
    label: string;
    immediateResponse?: string | BotResponse;
}

interface FormStep {
    type: 'text' | 'options' | 'multi-select';
    question: string;
    field: string;
    options?: { label: string, value: string }[];
}

interface FormCommand {
    trigger: string;
    description: string;
    steps: FormStep[];
    submitHandler: (formData: Record<string, any>) => Promise<string | BotResponse>;
}

class MessageStore {
    users: User[] = [];
    messages: Message[] = [];
    selectedUser: User | null = null;
    commandHandlers: CommandHandler[] = [
        {
            trigger: "/hello",
            label: "Поздароваться",
            immediateResponse: "Hello!",
        },
        {
            trigger: "/sendImage",
            label: "Отправь картинку",
            immediateResponse: {
                textMessage: 'Image for you', images: [
                    "https://live.staticflickr.com/6056/6878030444_3442d89ce1_b.jpg",
                    "https://i.redd.it/4blew0edyw711.jpg",
                ]
            }
        },
        {
            trigger: "/sendLink",
            label: "Отправь ссылки",
            immediateResponse: {
                textMessage: "Link for you", links: [
                    {
                        href: "https://www.youtube.com/watch?v=HIcSWuKMwOw",
                        linkText: "Открыть ссылку",
                    },
                    {
                        href: "https://google.com",
                        linkText: "Поиск в Google",
                    },
                ]
            }
        },
        {
            trigger: "/aboutUs",
            label: "Расскажи о нас",
            immediateResponse: {
                textMessage: "О нас",
                images: [
                    "https://live.staticflickr.com/6056/6878030444_3442d89ce1_b.jpg",
                ],
                links: [
                    {
                        href: 'https://www.youtube.com/watch?v=HIcSWuKMwOw',
                        linkText: 'Перейти на сайт'
                    }
                ]
            }
        }
    ];

    activeForm: {
        command: FormCommand;
        currentStep: number;
        formData: Record<string, any>;
    } | null = null;

    formCommands: FormCommand[] = [
        {
            trigger: '/reg',
            description: 'Зарегистрироваться',
            steps: [
                {
                    type: 'text',
                    question: 'Введите ваше ФИО',
                    field: 'fullName'
                },
                {
                    type: 'options',
                    question: 'Выберите город',
                    field: 'city',
                    options: [
                        {label: 'Москва', value: 'moscow'},
                        {label: 'Санкт-Петербург', value: 'spb'},
                        {label: 'Казань', value: 'kazan'}
                    ]
                },
                {
                    type: "multi-select",
                    question: 'Введите ваши интересы через запятую',
                    field: 'interest'
                }
            ],
            submitHandler: async (formData) => {
                // const response = await fetch('api', {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify(formData)
                // });

                await new Promise(resolve => setTimeout(resolve, 300));

                const mockResponse = {
                    status: 200,
                    json: async () => ({
                        id: Date.now(),
                        message: 'Данные успешно сохранены',
                        receivedData: formData
                    })
                }

                const result = await mockResponse.json();

                // if (!response.ok) {
                //     throw new Error('Ошибка отправки данных');
                // }
                //
                // const result = await response.json();
                return `Ваши данные сохранены: ${JSON.stringify(formData)} id: ${result.id}`;
            }
        }
    ]


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

    async addMessage(messageText: string) {
        if (!this.selectedUser || messageText.trim() === "") return;

        const newMessage: Message = {
            id: Date.now(),
            userPicture: this.selectedUser.userPicture,
            userName: this.selectedUser.userName,
            messageText: messageText.trim(),
            timestamp: new Date(),
        };

        this.messages = [...this.messages, newMessage];

        if (this.activeForm) {
            await this.handleFormStep(messageText.trim());
            return;
        }

        const formCommand = this.formCommands.find(cmd => cmd.trigger === messageText.trim());
        if (formCommand) {
            this.startForm(formCommand);
            return;
        }

        setTimeout(async () => {
            this.handleCommand(messageText.trim());
        }, 300)
    }

    startForm(command: FormCommand) {
        this.activeForm = {
            command,
            currentStep: 0,
            formData: {}
        };
        this.askNextQuestion();
    }

    askNextQuestion() {
        if (!this.activeForm) return;

        const step = this.activeForm.command.steps[this.activeForm.currentStep];

        const botMessage: BotResponse = {
            textMessage: step.question,
            buttons: step.type === 'options'
                ? step.options!.map(opt => opt.label)
                : undefined
        };

        this.addBotResponse(botMessage);
    }

    async handleFormStep(answer: string) {
        if (!this.activeForm) return;

        const step = this.activeForm.command.steps[this.activeForm.currentStep];

        switch (step.type) {
            case "text": {
                this.activeForm.formData[step.field] = answer;
                break;
            }
            case "options": {
                const selectedOption = step.options!.find(opt => opt.label === answer);
                if (!selectedOption) {
                    this.addBotResponse('Пожалуйста, выберите один из вариантов.');
                    return;
                }
                this.activeForm.formData[step.field] = selectedOption.value;
                break;
            }
            case "multi-select": {
                this.activeForm.formData[step.field] = answer.split(',').map(item => item.trim());
                break;
            }
        }

        this.activeForm.currentStep++;

        if (this.activeForm.currentStep >= this.activeForm.command.steps.length) {
            try {
                const result = await this.activeForm.command.submitHandler(this.activeForm.formData);
                this.addBotResponse(result);
            } catch (error) {
                this.addBotResponse(`Ошибка: ${error}`);
            } finally {
                this.activeForm = null;
            }
            return;
        }

        this.askNextQuestion();
    }

    private handleCommand(command: string) {
        const handler = this.commandHandlers.find(h => h.trigger === command);
        if (!handler) return;

        if (handler.immediateResponse) {
            this.addBotResponse(handler.immediateResponse)
        }
    }

    deleteMessage(id: number) {
        this.messages = this.messages.filter((message) => message.id !== id);
    }

    private addBotResponse(response: string | BotResponse) {
        const isString = typeof response === "string";

        setTimeout(() => {
            runInAction(() => {
                const botMessage: Message = {
                    id: Date.now(),
                    userPicture:
                        "https://i.pinimg.com/736x/97/19/70/971970605fc12e0a49676699bf2137fc.jpg",
                    userName: "Bot",
                    messageText: isString ? response : response.textMessage,
                    timestamp: new Date(),
                    images: !isString ? response.images : undefined,
                    links: !isString ? response.links : undefined,
                    buttons: !isString ? response.buttons : undefined,
                };

                this.messages = [...this.messages, botMessage];
            })
        }, 300)
    }


}

export const messageStore = new MessageStore();
