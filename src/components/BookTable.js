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
import { selectBook } from "../redux/books";

const BookTable = () => {
  const selectedBookTable = document.getElementById("selectedBookTable");
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();

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
