export async function hash(password: string) {
  return await Bun.password.hash(password);
}

export async function authenticatePassword(password: string, hash: string) {
  return Bun.password.verify(password, hash);
}
