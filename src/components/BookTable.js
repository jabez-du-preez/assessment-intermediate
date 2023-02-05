//this component is very similar to the SelectedBookTable component, except that it doesn't display the number of pages or publisher
//it also has a different onClick function that dispatches the selectBook action and scrolls to the selectedBookTable element
//this component is used to display the books in a table returned from the api

import React from "react";

import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
//import selectBook action to change the selectedBook state
import { selectBook } from "../redux/books";

const BookTable = () => {
  //select the selectedBookTable element to scroll to it when a book is selected
  const selectedBookTable = document.getElementById("selectedBookTable");
  //select the books state from the redux store
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();

  //create a function that dispatches the selectBook action and scrolls to the selectedBookTable element
  const selectedBookID = (row) => (event) => {
    dispatch(selectBook(row.key));
    selectedBookTable.scrollIntoView();
  };

  return (
    <TableContainer
      sx={{
        mt: 3,
        width: 900,
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: 16,
                width: "20%",
              }}
            >
              Author Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: 16,
                width: "70%",
              }}
            >
              Book Title
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: 16,
                width: "10%",
              }}
            >
              Year Published
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((row) => (
            <TableRow
              key={row.key}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
              onClick={selectedBookID(row)}
            >
              <TableCell>{row.author_name}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.first_publish_year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
