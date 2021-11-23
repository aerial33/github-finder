import "./App.css";
import { useEffect, useState } from "react";
import Navabar from "./components/layout/Navbar";
import Users from "./components/users/Users";

function App() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navabar />
      <div className="container">
        <Users users={users} loading={isLoading} />
      </div>
    </div>
  );
}

export default App;
