export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  profilePicture?: string;
  followers: number[];
  following: number[];
}

export interface Post {
  id: number;
  caption: string;
  image?: string;
  video?: string;
  createdAt: string;
  liked: boolean;
  likes: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  liked: User[];
  createdAt: string;
}

export interface Chat {
  id: number;
  chat_name: string;
  users: User[];
  messages: Message[];
}

export interface Message {
  id: number;
  content: string;
  image?: string;
  user: User;
  timestamp: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}
