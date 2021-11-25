import "./App.css";
import { useEffect, useState } from "react";
import Navabar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState();

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

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      setAlert({ msg: "Please enter something", type: "light" });
    }
    setSearch(search);
    searchUsers();
    setSearch("");
  };
  const handleClearClick = () => {
    setUsers([]);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 5000);
  }, [alert]);

  return (
    <div className="App">
      <Navabar />
      <div className="container">
        {alert && <Alert alert={alert} />}
        <Search
          onSearchChange={handleSearchChange}
          search={search}
          onSearchSubmit={handleSearchSubmit}
          onClearClick={handleClearClick}
          showClear={undefined !== users && users.length > 0 ? true : false}
          setAlert={alert}
        />
        <Users users={users} loading={isLoading} />
      </div>
    </div>
  );
}

export default App;
