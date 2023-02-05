import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography, Tabs, Tab, Modal } from "@mui/material";

import { ErrorRounded } from "@mui/icons-material";

import { fetchAll, fetchByAuthor, fetchByTitle } from "../utils/fetchbooks";

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
  const [error, setError] = useState(false);

  const [tabValue, setTabValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const searchInput = useSelector((state) => state.books.searchInput);
  const numberOfBooks = useSelector((state) => state.books.numberOfBooks);
  const dispatch = useDispatch();

  const clearAllBooks = () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());
    dispatch(clearNumberOfBooks());
    dispatch(clearSearchInput());
    setErrorMessage("");
  };

  const handleCloseModal = () => setError(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchBooksByAuthor = async () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());

    checkInputs();

    dispatch(setLoading(true));

    dispatch(
      collectBooks(
        await fetchByAuthor(searchInput, numberOfBooks)
          .then((res) => {
            if (res.length === 0) {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't find any books with the search term: ${searchInput}`
              );
            }
            if (res.code === "ERR_NETWORK") {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't complete your request. See error message: ${res.message}`
              );
            }
            return res;
          })
          .catch((err) => {
            setError(true);
            setErrorMessage(
              `Apologies, we couldn't complete your request. See error message: ${err}`
            );
          })
      )
    );
    dispatch(setLoading(false));
  };

  const fetchBooksByTitle = async () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());

    checkInputs();

    dispatch(setLoading(true));

    dispatch(
      collectBooks(
        await fetchByTitle(searchInput, numberOfBooks)
          .then((res) => {
            if (res.length === 0) {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't find any books with the search term: ${searchInput}`
              );
            }
            if (res.code === "ERR_NETWORK") {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't complete your request. See error message: ${res.message}`
              );
            }
            return res;
          })
          .catch((err) => {
            setError(true);
            setErrorMessage(
              `Apologies, we couldn't complete your request. See error message: ${err}`
            );
          })
      )
    );
    dispatch(setLoading(false));
  };
  const fetchAllBooks = async () => {
    dispatch(clearBooks());
    dispatch(clearSelectedBook());

    checkInputs();
    dispatch(setLoading(true));

    dispatch(
      collectBooks(
        await fetchAll(searchInput, numberOfBooks)
          .then((res) => {
            if (res.length === 0) {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't find any books with the search term: ${searchInput}`
              );
            }
            if (res.code === "ERR_NETWORK") {
              setError(true);
              setErrorMessage(
                `Apologies, we couldn't complete your request. See error message: ${res.message}`
              );
            }
            return res;
          })
          .catch((err) => {
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
              onClick={clearAllBooks}
              label="Search by Book Title"
              {...a11yProps(1)}
            />
            <Tab
              onClick={clearAllBooks}
              label="Search by Book Author"
              {...a11yProps(1)}
            />
            <Tab
              onClick={clearAllBooks}
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
