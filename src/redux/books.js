import { createSlice } from "@reduxjs/toolkit";

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
    collectBooks: (state, action) => {
      state.books = action.payload;
    },
    clearBooks: (state) => {
      state.books = [];
    },
    selectBook: (state, action) => {
      state.selectedBook = state.books.filter(
        (book) => book.key === action.payload
      );
    },
    clearSelectedBook: (state) => {
      state.selectedBook = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setNumberOfBooks: (state, action) => {
      state.numberOfBooks = action.payload;
    },
    clearNumberOfBooks: (state) => {
      state.numberOfBooks = 0;
    },
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
