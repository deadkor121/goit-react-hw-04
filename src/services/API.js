import axios from "axios";

const ACCESS_KEY = "uRbjthHwB56Dd64vCktCP15eYSWhxayYeNHDzHA5aBQ";

export async function getImages(search, page = 1) {
  if (search === "") return;

  const url = "https://api.unsplash.com/search/photos";
  const params = {
    client_id: `${ACCESS_KEY}`,
    page: `${page}`,
    per_page: 10,
    query: `${search}`,
  };
  const res = await axios.get(url, { params });
  if (res.data.results.length === 0) {
    throw new Error("Error!");
  } else {
    return res.data.results;
  }
}
