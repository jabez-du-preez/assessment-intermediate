import React from "react";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Popover,
} from "@mui/material";

import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

import BookTable from "./BookTable";
import SelectedBookTable from "./SelectedBookTable";

import { useSelector, useDispatch } from "react-redux";
import { setSearchInput, setNumberOfBooks } from "../redux/books";

const SearchInput = (props) => {
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const selectedBook = useSelector((state) => state.books.selectedBook);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const searchBook = (event) => {
    dispatch(setSearchInput(event.target.value));
  };

  const numberOfBooks = (event) => {
    dispatch(setNumberOfBooks(event.target.value));
  };

  const checkSelectedBook = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          <InfoRoundedIcon
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            color="primary"
          />
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
              mt: 1,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>
              Click on a book from the results to see more information.
            </Typography>
          </Popover>
        </Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, textAlign: "center", margin: "auto" }}
        >
          Use the search below to search by book {props.searchType}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 900,
          mt: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ mr: 2, width: 650 }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={searchBook}
        />
        <TextField
          id="outlined-basic"
          label="Number of Results"
          variant="outlined"
          type={"number"}
          onChange={numberOfBooks}
        />
        <Button onClick={props.onClick} sx={{ ml: 2 }} variant="contained">
          Search
        </Button>
      </Box>

      {books.length > 0 ? (
        <Box>
          <BookTable books={books} />
        </Box>
      ) : (
        <>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography sx={{ mt: 3, textAlign: "center" }} variant="h6">
                No Books Collected Yet
              </Typography>
            </>
          )}
        </>
      )}

      {!checkSelectedBook(selectedBook) && (
        <Box sx={{ mt: 3, mb: 5, width: 900 }}>
          <Typography sx={{ mb: 2, textAlign: "center" }} variant="h6">
            More details on the book your have selected
          </Typography>
          <SelectedBookTable />
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;
