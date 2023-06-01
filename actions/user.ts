import axios from "axios";
import { TRegisterUser, TUser } from "../types";
import { parse } from "date-fns";

type UsersList = {
  users: TUser[];
};

export const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  birth_date,
  genre,
  agreement,
}: TRegisterUser) => {
  const parsedBirthDate = parse(birth_date, "dd/MM/yyyy", new Date());
  try {
    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        birth_date: parsedBirthDate,
        genre,
      }),
    });
    if (response.ok) {
      // User added successfully
      const newUser = await response.json();
      return newUser;
    } else if (response.status === 400) {
      // User already exists
      const errorData = await response.json();
      throw new Error(errorData.message);
    } else {
      throw new Error("Error: " + response.statusText);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error: " + error.message);
    }
  }
};

export const fetchUsers = async () => {
  const response = await axios.get("http://localhost:8080/user/list");
  console.log(JSON.stringify(response));
};
