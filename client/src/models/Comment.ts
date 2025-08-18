export interface Comment {
  _id: string;
  name: string;
  email: string;
  movieId: string;
  text: string;
  date: string;
}

export type NewComment = Omit<Comment, "_id" | "date">;
