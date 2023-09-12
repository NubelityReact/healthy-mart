export enum roles {
  ADMIN = "admin",
  USER = "user",
}

export const PermittedImagesExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
  "webp",
];

export enum TokenTypes {
  REFRESH_TOKEN = "refreshToken",
  ACCESS_TOKEN = "accessToken",
  RECOVERY_TOKEN = "recoveryToken",
}
