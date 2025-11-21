import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'GM_USERS_V1';
const CURRENT_USER_KEY = 'GM_CURRENT_USER_V1';

type RawUser = { id: string; name: string; email: string; password?: string };

async function readUsers(): Promise<RawUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function writeUsers(users: RawUser[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
  if (!name || !email || !password) throw new Error('Name, email and password are required');
  const emailLower = email.trim().toLowerCase();
  const users = await readUsers();
  if (users.find((u) => u.email === emailLower)) throw new Error('User already exists');

  const user: RawUser = { id: uuidv4(), name: name.trim(), email: emailLower, password };
  users.push(user);
  await writeUsers(users);
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  // return a sanitized user (no password)
  const { password: _p, ...san } = user;
  return san;
}

export async function loginUser(email: string, password: string) {
  const users = await readUsers();
  const emailLower = email.trim().toLowerCase();
  const found = users.find((u) => u.email === emailLower && u.password === password);
  if (!found) throw new Error('Invalid credentials');
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ id: found.id, name: found.name, email: found.email }));
  const { password: _p, ...san } = found;
  return san;
}

export async function logoutUser() {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}

export async function getLoggedInUser() {
  const raw = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
