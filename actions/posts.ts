import axios from "axios";

export const fetchPosts = async() => {
    const response = await axios.get("http://localhost:8080/posts");
    console.log(JSON.stringify(response))
}