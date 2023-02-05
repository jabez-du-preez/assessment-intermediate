import axios from "axios";

const api = axios.create({
  baseURL: "https://openlibrary.org",
});

export const fetchAll = async (query, limit) => {
  try {
    const { data } = await api.get("/search.json", {
      params: {
        q: query,
        limit: limit,
      },
    });
    return data.docs;
  } catch (error) {
    return error;
  }
};

export const fetchByTitle = async (title, limit) => {
  try {
    const { data } = await api.get("/search.json", {
      params: {
        title: title,
        limit: limit,
      },
    });
    return data.docs;
  } catch (error) {
    return error;
  }
};

export const fetchByAuthor = async (author, limit) => {
  try {
    const { data } = await api.get("/search.json", {
      params: {
        author: author,
        limit: limit,
      },
    });
    return data.docs;
  } catch (error) {
    return error;
  }
};
