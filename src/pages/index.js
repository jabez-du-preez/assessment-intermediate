// Description: This is the main page of the application. It contains the search input and the tabs for the search options.

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography, Tabs, Tab, Modal } from "@mui/material";

import { ErrorRounded } from "@mui/icons-material";

//importing all of the functions from the fetchbooks.js file
import { fetchAll, fetchByAuthor, fetchByTitle } from "../utils/fetchbooks";

//importing all of the functions from the redux store
import {
  collectBooks,
  clearBooks,
  clearSelectedBook,
  setLoading,
  clearNumberOfBooks,
  clearSearchInput,
} from "../redux/books";

import SearchInput from "../components/SearchInput";

function Main() {
  //creating the states for the error messages
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //creating the state for the tab value
  const [tabValue, setTabValue] = useState(0);

  const searchInput = useSelector((state) => state.books.searchInput);
  const numberOfBooks = useSelector((state) => state.books.numberOfBooks);
  const dispatch = useDispatch();

  //this function resets all of the states in the redux store as well as the error message
  const clearAll = () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());
    dispatch(clearNumberOfBooks());
    dispatch(clearSearchInput());
    setErrorMessage("");
  };

  //this function closes the modal
  const handleCloseModal = () => setError(false);

  //this function changes the tab value
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //this function fetches books by author
  const fetchBooksByAuthor = async () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());

    checkInputs();

    dispatch(setLoading(true));

    //books are fetched from the api and dispatched to the books state
    dispatch(
      collectBooks(
        await fetchByAuthor(searchInput, numberOfBooks)
          .then((res) => {
            //if the response is empty, an error message is displayed
            if (res.length === 0) {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't find any books with the search term: ${searchInput}`
              );
            }
            //if there is an error, an error message is displayed
            if (res.code === "ERR_NETWORK") {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't complete your request. See error message: ${res.message}`
              );
            }
            return res;
          })
          .catch((err) => {
            //if there is an error, an error message is displayed
            setError(true);
            setErrorMessage(
              `Apologies, we couldn't complete your request. See error message: ${err}`
            );
          })
      )
    );
    dispatch(setLoading(false));
  };

  //this function fetches books by title
  const fetchBooksByTitle = async () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());

    checkInputs();

    dispatch(setLoading(true));

    //books are fetched from the api and dispatched to the books state
    dispatch(
      collectBooks(
        await fetchByTitle(searchInput, numberOfBooks)
          .then((res) => {
            //if the response is empty, an error message is displayed
            if (res.length === 0) {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't find any books with the search term: ${searchInput}`
              );
            }
            //if there is an error, an error message is displayed
            if (res.code === "ERR_NETWORK") {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't complete your request. See error message: ${res.message}`
              );
            }
            return res;
          })
          .catch((err) => {
            //if there is an error, an error message is displayed
            setError(true);
            setErrorMessage(
              `Apologies, we couldn't complete your request. See error message: ${err}`
            );
          })
      )
    );
    dispatch(setLoading(false));
  };

  //this function fetches all books
  const fetchAllBooks = async () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());

    checkInputs();
    dispatch(setLoading(true));

    //books are fetched from the api and dispatched to the books state
    dispatch(
      collectBooks(
        await fetchAll(searchInput, numberOfBooks)
          .then((res) => {
            //if the response is empty, an error message is displayed
            if (res.length === 0) {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't find any books with the search term: ${searchInput}`
              );
            }
            //if there is an error, an error message is displayed
            if (res.code === "ERR_NETWORK") {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't complete your request. See error message: ${res.message}`
              );
            }
            return res;
          })
          .catch((err) => {
            //if there is an error, an error message is displayed
            setError(true);
            setErrorMessage(
              `Apologies, we couldn't complete your request. See error message: ${err}`
            );
          })
      )
    );
    dispatch(setLoading(false));
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  //this function checks the input fields to make sure they are not empty or 0
  const checkInputs = () => {
    if (searchInput === "") {
      setError(true);
      setErrorMessage("The search field cannot be empty.");
      return;
    }
    if (numberOfBooks <= 0) {
      setError(true);
      setErrorMessage(
        "The results field cannot be smaller than or equal to 0."
      );
      return;
    }

    if (numberOfBooks <= 0 && searchInput === "") {
      setError(true);
      setErrorMessage("Search fields cannot be empty or 0.");
      return;
    }
  };

  return (
    <Container
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        open={error}
        onClose={handleCloseModal}
        aria-labelledby="modal-dynamic"
        aria-describedby="modal-dynamic-properties"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            borderRadius: "25px",
            padding: 2,
            bgcolor: "background.paper",
            position: "absolute",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            padding={2}
          >
            <ErrorRounded
              fontSize="large"
              color="error"
              sx={{ margin: "auto" }}
            />
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: 20, fontWeight: 400 }}
            >
              {errorMessage}
            </Typography>
          </Box>
        </Box>
      </Modal>

      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab
              onClick={clearAll}
              label="Search by Book Title"
              {...a11yProps(1)}
            />
            <Tab
              onClick={clearAll}
              label="Search by Book Author"
              {...a11yProps(1)}
            />
            <Tab
              onClick={clearAll}
              label="Search by Author or Book Title"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box>
            <SearchInput searchType={"title"} onClick={fetchBooksByTitle} />
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <SearchInput searchType={"author"} onClick={fetchBooksByAuthor} />
          </Box>
        )}
        {tabValue === 2 && (
          <Box>
            <SearchInput
              searchType={"title or author"}
              onClick={fetchAllBooks}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Main;
