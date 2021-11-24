import "./App.css";
import { useState } from "react";
import Navabar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/search/users?q=${search}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await response.json();
      console.log(data.items);
      if (data && !data.error) {
        setUsers(data.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(search);
    searchUsers();
    setSearch("");
  };
  const handleClearClick = () => {
    setUsers([]);
    setIsLoading(false);
  };
  return (
    <div className="App">
      <Navabar />
      <div className="container">
        <Search
          onSearchChange={handleSearchChange}
          search={search}
          onSearchSubmit={handleSearchSubmit}
          onClearClick={handleClearClick}
          showClear={users.length > 0 ? true : false}
        />
        <Users users={users} loading={isLoading} />
      </div>
    </div>
  );
}

export default App;
