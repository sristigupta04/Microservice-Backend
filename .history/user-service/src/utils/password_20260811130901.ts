import bcrypt from "bcrypt";

export const hashpass = async (password: string): Promise<string> => {
  const res = await bcrypt.hash(password, 10);

  if (!res) {
    throw new Error("Password hashing failed");
  }

  return res;
};