import { AuthPayload, IAuthDocument } from "@auth/interfaces/auth.interface";
import { Response } from "express";

export const authMockRequest = (sessionData: IJWT, body: IAuthMock, currentUser?: AuthPayload | null, params?: unknown) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
export interface IJWT {
  jwt?: string;
}
export interface IAuthMock {
  _id?: string;
  username?: string;
  email?: string;
  uId?: string;
  password?: string;
  confirmPassword?: string;
  avatarColor?: string;
  avatarImage?: string;
  createdAt?: Date | string;
}
export const authUserPayload: AuthPayload = {
  userId: "60263f14648fed5246e322d9",
  uId: "1621613119252066",
  username: "Manny",
  email: "manny@me.com",
  avatarColor: "#9c27b0",
  iat: 12345
};
export const authMock = {
  _id: "60263f14648fed5246e322d3",
  uId: "1621613119252066",
  username: "Mani2118",
  email: "test222118@gmail.com",
  avatarColor: "#9c27b0",
  createdAt: "2024-09-29T08:49:02.924Z",
  save: () => {}
} as unknown as IAuthDocument;

export const signUpMockData = {
  _id: "605727cd646eb50e668a4e13",
  uId: "92241616324557172",
  username: "Manny",
  email: "manny@test.com",
  avatarColor: "#ff9800",
  password: "manny",
  birthDay: { month: "", day: "" },
  postCount: 0,
  gender: "",
  quotes: "",
  about: "",
  relationship: "",
  blocked: [],
  blockedBy: [],
  bgImageVersion: "",
  bgImageId: "",
  work: [],
  school: [],
  placesLived: [],
  createdAt: new Date(),
  followersCount: 0,
  followingCount: 0,
  notifications: { message: true, reactions: true, comments: true, follows: true },
  profilePicture: "https://res.cloudinary.com/ratingapp/image/upload/605727cd646eb50e668a4e13"
};
