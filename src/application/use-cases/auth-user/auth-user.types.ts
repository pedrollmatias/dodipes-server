export type TPasswordHashVerifyMethod = (plainText: string, hash?: string) => Promise<boolean> | boolean;
