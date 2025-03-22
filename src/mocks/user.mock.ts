import { IUserDocument } from "@user/interfaces/user.interface";

export const mockExistingUser = {
  notifications: {
    messages: true,
    reactions: true,
    comments: true,
    follows: true
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: ""
  },
  blocked: [],
  blockedBy: [],
  followersCount: 1,
  followingCount: 2,
  postsCount: 2,
  bgImageVersion: "",
  bgImageId: "",
  profilePicture: "http://place-hold.it/500x500",
  _id: "60263f14648fed5246e322d9",
  work: "KickChat Inc.",
  school: "University of Benin",
  location: "Dusseldorf, Germany",
  quote: "Sky is my limit",
  createdAt: new Date()
} as unknown as IUserDocument;

export const existingUser = {
  notifications: {
    messages: true,
    reactions: true,
    comments: true,
    follows: true
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: ""
  },
  blocked: [],
  blockedBy: [],
  followersCount: 1,
  followingCount: 2,
  postsCount: 2,
  bgImageVersion: "",
  bgImageId: "",
  profilePicture: "http://place-hold.it/500x500",
  _id: "60263f14648fed5246e322d9",
  uId: "1621613119252066",
  username: "Mani2118",
  email: "test222118@gmail.com",
  avatarColor: "red",
  work: "KickChat Inc.",
  school: "University of Benin",
  location: "Dusseldorf, Germany",
  quote: "Sky is my limit",
  createdAt: new Date()
} as unknown as IUserDocument;

export const existingUserTwo = {
  notifications: {
    messages: false,
    reactions: true,
    comments: true,
    follows: false
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: ""
  },
  blocked: [],
  blockedBy: [],
  followersCount: 1,
  followingCount: 2,
  postsCount: 2,
  bgImageVersion: "",
  bgImageId: "",
  profilePicture: "http://place-hold.it/500x500",
  _id: "60263f14648fed5246e322d8",
  uId: "1621613119252065",
  username: "Danny",
  email: "danny@me.com",
  avatarColor: "#9c27b1",
  work: "KickChat Inc.",
  school: "University of Benin",
  location: "Dusseldorf, Germany",
  quote: "Sky is my limit",
  createdAt: new Date()
} as unknown as IUserDocument;

export const mergedAuthAndUserData = {
  notifications: {
    messages: false,
    reactions: true,
    comments: true,
    follows: false
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: ""
  },
  blocked: [],
  blockedBy: [],
  followersCount: 1,
  followingCount: 2,
  postsCount: 2,
  bgImageVersion: "",
  bgImageId: "",
  profilePicture: "http://place-hold.it/500x500",
  _id: "60263f14648fed5246e322d8",
  authId: "60263f14648fed5246e322d3",
  uId: "1621613119252066",
  username: "Mani2118",
  email: "test222118@gmail.com",
  avatarColor: "#9c27b0",
  work: "KickChat Inc.",
  school: "University of Benin",
  location: "Dusseldorf, Germany",
  quote: "Sky is my limit",
  createdAt: "2024-09-29T08:49:02.924Z"
} as unknown as IUserDocument;

export const searchedUserMock = {
  profilePicture: "http://place-hold.it/500x500",
  _id: "60263f14648fed5246e322d5",
  uId: "1621613119252062",
  username: "Kenny",
  email: "ken@me.com",
  avatarColor: "#9c27b1"
};

export const userJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU2YjgwYWY3NWZlNmYxNDE1OWYzNjIiLCJ1SWQiOiI4OTQ0MjA2OTQyOTkiLCJlbWFpbCI6InRlc3QyMjIxMThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJNYW5pMjExOCIsImF2YXRhckNvbG9yIjoicmVkIiwiaWF0IjoxNzI3NTk5MjE4fQ.mbLeQgHQDjtX_JjvQqsqA9-vEXDreEZmK61wA9hztEQ";
