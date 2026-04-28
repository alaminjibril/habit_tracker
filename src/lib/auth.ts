import { User, Session } from "@/types/auth";

const USERS_KEY = "habit-tracker-users";
const SESSION_KEY = "habit-tracker-session";

//helper Functions
function getUsers(): User[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(session: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
}

export function logout() {
    localStorage.removeItem(SESSION_KEY);
}

//signUP 

export function signup(email: string, password: string): { success: boolean; error?: string } {
    const users = getUsers();

    const exists = users.find((u) => u.email === email);
    if (exists) {
        return { success: false, error: "User already exists" };
    }

    const newUser: User = {
        id: crypto.randomUUID(),
        email,
        password,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    saveSession({
        userId: newUser.id,
        email: newUser.email,
    });

    return { success: true };
}

//login 

export function login(email: string, password: string): { success: boolean; error?: string } {
    const users = getUsers();

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return { success: false, error: "Invalid email or password" };
    }

    saveSession({
        userId: user.id,
        email: user.email,
    });

    return { success: true };
}