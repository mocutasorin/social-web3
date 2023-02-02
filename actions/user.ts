import axios from "axios";
import { TRegisterUser, TUser } from "../types"

type UsersList = {
    users: TUser[]
}

export const registerUser = ({first_name, last_name,email, password, birth_date, genre, agreement }: TRegisterUser )=> {
    fetch("http://localhost:8080/users/signup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({first_name, last_name,email, password, birth_date, genre}),
                }).then((response) => console.log(response));

                
}

export const fetchUsers = async() => {
    const response = await axios.get("http://localhost:8080/user/list");
    console.log(JSON.stringify(response))
}