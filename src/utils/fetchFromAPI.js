import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  method: "GET",

  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": "9e9517e0ebmsh618ef2e364a8fe4p12cde9jsn0f51e4ba9a34",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
