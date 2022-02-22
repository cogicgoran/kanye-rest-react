import { User } from "./user.interfaces";

export function getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string) || [];
};

interface QuoteComplete {
    id: number;
    count: number;
    time?: number;
    body: string;
    createdAt: Date;
    updatedAt: Date | null;
}

export function getQuotes(): Array<QuoteComplete> {
    return JSON.parse(localStorage.getItem("quotes") as string) || [];
};

export function getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('current-user') as string) || null;
};

export function getPageHistory() {
    return localStorage.getItem('page-history-prev');
};

export function getPreviousQuotes() {
    return JSON.parse(localStorage.getItem("previous-quotes") as string) || [];
};

export function findUserByEmailAndPassword(email: string, password: string) {
    return getUsers().find((user: User): boolean => user.email === email && user.password === password);
};

export function setCurrentUser(email: string) {
    localStorage.setItem('current-user', JSON.stringify({ email }));
};

export function setUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
};

export function setQuotes(quotesStorage: {}) {
    localStorage.setItem("quotes", JSON.stringify(quotesStorage));
}

export function setPreviousQuotes(quotes: {}) {
    localStorage.setItem("previous-quotes", JSON.stringify(quotes));
}

export function setPageHistory(location: string) {
    localStorage.setItem('page-history-prev', location);
}

export function removeCurrentUser() {
    localStorage.removeItem('current-user');
}
