//this file contains all the actions and reducers for the books

import { createSlice } from "@reduxjs/toolkit";

//this is the initial state of the books and all accompanying data
const initialState = {
  books: [],
  selectedBook: [],
  loading: false,
  searchInput: "",
  numberOfBooks: 0,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    //this is the action that collects the books from the API
    collectBooks: (state, action) => {
      state.books = action.payload;
    },
    //this is the action that clears the books from the state
    clearBooks: (state) => {
      state.books = [];
    },
    //this is the action that selects a book from the books array
    selectBook: (state, action) => {
      state.selectedBook = state.books.filter(
        (book) => book.key === action.payload
      );
    },
    //this is the action that clears the selected book from the state
    clearSelectedBook: (state) => {
      state.selectedBook = [];
    },
    //this is the action that sets the loading state to true or false
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    //this is the action that sets the search input state
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    //this is the action that sets the number of books state
    setNumberOfBooks: (state, action) => {
      state.numberOfBooks = action.payload;
    },
    //this is the action that clears the number of books state
    clearNumberOfBooks: (state) => {
      state.numberOfBooks = 0;
    },
    //this is the action that clears the search input state
    clearSearchInput: (state) => {
      state.searchInput = "";
    },
  },
});

export const {
  collectBooks,
  selectBook,
  clearBooks,
  clearSelectedBook,
  setLoading,
  setSearchInput,
  setNumberOfBooks,
  clearNumberOfBooks,
  clearSearchInput,
} = bookSlice.actions;

export default bookSlice.reducer;
