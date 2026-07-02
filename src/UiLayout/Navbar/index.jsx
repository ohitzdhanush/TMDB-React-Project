import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Services/FireBase";
import useDebounce from "../../Hooks/useDebounce";
import "./index.scss";

const Navbar = ({ onSearch, language, setLanguage }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const debouncedSearch = useDebounce(searchTerm, 250);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      onSearch(searchTerm);
      navigate("/home");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("user");

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>TMDB Movies</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upcoming">Upcoming</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="language-select">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="all">🌍 All Movies</option>
          <option value="ta">🇮🇳 Tamil</option>
          <option value="en">🇺🇸 English</option>
          <option value="hi">🇮🇳 Hindi</option>
          <option value="te">🇮🇳 Telugu</option>
          <option value="kn">🇮🇳 Kannada</option>
        </select>
      </div>

      <form
        className="search-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      {user && (
        <div className="profile-menu">
          <img
            src={user.photo}
            alt={user.name}
            className="profile-img"
          />

          <span>{user.name}</span>

          <div className="dropdown">
            <Link to="/profile">
              Profile
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;