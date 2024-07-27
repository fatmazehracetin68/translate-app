import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "5ffbf60e59mshe2da6f61db1bbf6p142ba1jsne235f98412e0",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
