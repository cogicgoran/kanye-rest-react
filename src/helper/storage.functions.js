export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
};

export function getQuotes() {
    return JSON.parse(localStorage.getItem("quotes")) || [];
};

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('current-user'));
};

export function getPageHistory() {
    return localStorage.getItem('page-history-prev');
};

export function getPreviousQuotes() {
    return JSON.parse(localStorage.getItem("previous-quotes")) || [];
};

export function findUserByEmailAndPassword(email, password) {
    return getUsers().find(user => user.email === email && user.password === password);
};

export function setCurrentUser(email) {
    localStorage.setItem('current-user', JSON.stringify({ email }));
};

export function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
};

export function setQuotes(quotesStorage) {
    localStorage.setItem("quotes", JSON.stringify(quotesStorage));
}

export function setPreviousQuotes(quotes) {
    localStorage.setItem("previous-quotes", JSON.stringify(quotes));
}

export function setPageHistory(location) {
    localStorage.setItem('page-history-prev', location);
}

export function removeCurrentUser() {
    localStorage.removeItem('current-user');
}
