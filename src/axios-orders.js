import axios from "axios";

// set up axios instance which we can now use anywhere

const instance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://osu.ppy.sh/api/v2",
});

export default instance;
