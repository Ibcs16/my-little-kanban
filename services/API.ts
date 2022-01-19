import axios from "axios";

const API = axios.create({
  baseURL: "https://my-little-kanban.herokuapp.com/",
});

export default API;
