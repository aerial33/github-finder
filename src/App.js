import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetch from "./components/hooks/useFetch";
import Navabar from "./components/layout/Navbar";
import User from "./components/users/User";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const { get } = useFetch("https://api.github.com/");

  // * Search Github users
  const searchUsers = async () => {
    try {
      setIsLoading(true);
      const getData = await get(`search/users?q=${search}`);
      // console.log(getData.items);
      setUsers(getData.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // * Get single Github user
  const getUser = async (username) => {
    try {
      setIsLoading(true);
      const dataUser = await get(`users/${username}?`);
      // console.log(dataUser);

      setUser(dataUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // * Get users Repos
  const getUserRepos = async (username) => {
    try {
      setIsLoading(true);
      const dataRepos = await get(
        `users/${username}/repos?per_page=5&sort=created:asc}`
      );
      // console.log(dataRepos);
      setRepos(dataRepos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // * Form Submit for the search
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      showAlert("Please enter something", "light");
    }
    setSearch(search);
    searchUsers();
    setSearch("");
  };

  // * Clear users from state
  const handleClearClick = () => {
    setUsers([]);
    setIsLoading(false);
  };

  // * set Alert 5s
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Navabar />
        </nav>
        <main>
          <div className="container">
            {alert && <Alert alert={alert} />}
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Search
                      onSearchChange={handleSearchChange}
                      search={search}
                      onSearchSubmit={handleSearchSubmit}
                      onClearClick={handleClearClick}
                      showClear={
                        undefined !== users && users.length > 0 ? true : false
                      }
                    />
                    <Users users={users} loading={isLoading} />
                  </>
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/user/:gitlogin"
                element={
                  <User
                    getUser={getUser}
                    user={user}
                    getRepos={getUserRepos}
                    repos={repos}
                    loading={isLoading}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
