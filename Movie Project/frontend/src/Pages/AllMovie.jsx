import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../Api/Api";

export default function MovieCards() {
  const [movies, setMovies] = useState([]);

  async function getData() {
    const res = await Api.get("/api/movie");
    setMovies(res.data.movies);
  }

  async function trash(id) {
    await Api.delete(`/api/movie/${id}`);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
<h2 className="text-center mb-4"> All Movies</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {movies &&
              movies.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${movie.image[0]}`}
                      alt={movie.title}
                      style={{ height: "80px", width: "60px", objectFit: "cover" }}
                    />
                  </td>

                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.year}</td>
                  <td className="text-start">{movie.description}</td>

                  <td className="d-flex">
                    <button
                      onClick={() => trash(movie._id)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>

                    <a
                      href={`/form/${movie._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
