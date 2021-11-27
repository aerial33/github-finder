import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  // * Search Github users
  const searchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/search/users?q=${search}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await response.json();
      // console.log(data.items);
      if (data && !data.error) {
        setUsers(data.items);
      }
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
      const response = await fetch(
        `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await response.json();
      // console.log(data.items);
      if (data && !data.error) {
        setUser(data);
      }
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
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await response.json();
      // console.log(data.items);
      if (data && !data.error) {
        setRepos(data);
      }
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
