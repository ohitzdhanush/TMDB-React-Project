import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Navbar = ({ onSearch,language, setLanguage  }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 250);
  useEffect(() => {
      onSearch(debouncedSearch);
    
  }, [debouncedSearch, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      onSearch(searchTerm);
      navigate("/");
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

      <form className="search-form" onSubmit={handleSubmit}>
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
    </nav>
  );
}

export default Navbar;