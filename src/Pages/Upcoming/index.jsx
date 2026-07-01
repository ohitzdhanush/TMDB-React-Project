import React from "react";
import {
Card,CardTitle,CardImage,CardDescription,} from "../../Components/Cards";

import { useNavigate } from "react-router-dom";
import "./index.scss";

const Upcoming = ({ upcoming }) => {
  const navigate = useNavigate();

  return (
    <div className="Upcoming">

      <h1>Upcoming Movies</h1>

      <div className="Card-mainContainer">

        {upcoming && upcoming.length > 0 ? (
          upcoming.map((item) => (

            <Card
              key={item.id}
              onClick={() => navigate(`/movie/${item.id}`)}
            >

              <CardImage
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              />

              <CardTitle
                title={item.title || item.original_title}
              />

              <CardDescription
                description={
                  item.overview
                    ? item.overview.slice(0, 100) + "..."
                    : "No description available"
                }
              />

            </Card>

          ))
        ) : (
          <h2 className="no-movies">No Upcoming Movies</h2>
        )}

      </div>

    </div>
  );
};

export default Upcoming;