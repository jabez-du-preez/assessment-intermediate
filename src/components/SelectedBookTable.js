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

import { useSelector } from "react-redux";

const SelectedBookTable = () => {
  const selectedBook = useSelector((state) => state.books.selectedBook);
  return (
    <>
      <TableContainer
        sx={{
          mt: 3,
        }}
        component={Paper}
        id="selectedBookTable"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  width: "15%",
                }}
              >
                Author Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  width: "30%",
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
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  width: "10%",
                }}
              >
                Number of Pages
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  width: "25%",
                }}
              >
                Publisher
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={selectedBook[0].key}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>{selectedBook[0].author_name}</TableCell>
              <TableCell>{selectedBook[0].title}</TableCell>
              <TableCell>{selectedBook[0].first_publish_year}</TableCell>
              <TableCell>{selectedBook[0].number_of_pages_median}</TableCell>
              <TableCell>{selectedBook[0].publisher[0]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SelectedBookTable;
