// This file contains the functions that fetch the books from the Open Library API

import axios from "axios";

const api = axios.create({
  baseURL: "https://openlibrary.org",
});

//this function fetches all the books from the API, based on the amount of results provided by the user
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

//this function fetches books by title from the API, based on the amount of results provided by the user
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

//this function fetches books by author from the API, based on the amount of results provided by the user
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
