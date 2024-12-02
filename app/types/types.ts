// types/types.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

export interface NewPost {
  title: string;
  body: string;
}

export interface NewComment {
  name: string;
  email: string;
  body: string;
}
