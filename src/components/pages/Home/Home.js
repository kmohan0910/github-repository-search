import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import User from "../../ui/User";
const Home = () => {
  const [query, setQuery] = useState("");
  //Users fetched from the API
  const [users, setUsers] = useState([]);

  const [sorti , setSort]= useState("forks")

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlesort=(e)=>{
    const value = e.target.value;
    setSort(value)
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/repositories?q=" + query, {
        params: {
          sort : sorti,
          per_page: 10,
        },
      });
      console.log(data)
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Your query is empty...");
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUsersOnChange();
  }, [sorti]);

  return (
    <div className="container">
      <div className="search-form">
        <h2>GitHub Search Repository</h2>
        <form>
          <input value={query} onChange={handleQueryInput} type="text" />
          <button onClick={handleSearchUsers}>Search</button>
        </form>
      </div>
      <div className="search-results">
        <div className="more-options">
          <label>
            <small>Sort :</small>
            <select onChange={handlesort}>
              <option value="forks">forks</option>
              <option value="stars">stars</option>
              <option value="help-wanted-issues">help-wanted-issues</option>
              <option value="updated">updated</option>
            </select>
          </label>
        </div>
        {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
