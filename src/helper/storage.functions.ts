interface User {
    email: string,
    password: string
};

export function getUsers() {
    return JSON.parse(localStorage.getItem('users') as string) || [];
};

export function getQuotes() {
    return JSON.parse(localStorage.getItem("quotes") as string) || [];
};

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('current-user') as string);
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

export function setUsers(users: String) {
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
