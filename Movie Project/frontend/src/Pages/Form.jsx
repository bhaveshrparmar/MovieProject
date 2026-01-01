import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../Api/Api";

export default function MovieForm() {
  const { register, handleSubmit, reset } = useForm();
  const [id, setId] = useState(null);
  const [images, setImages] = useState([]);
  const [movies, setMovies] = useState([]);
  const redirect = useNavigate();
  const params = useParams();

  async function getData() {
    const res = await Api.get("/api/movie");
    setMovies(res.data.movies);
  }

  async function submitMovie(data) {
    const formData = new FormData();

    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("image", data.image[i]);
      }
    }

    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("year", data.year);
    formData.append("description", data.description);

    if (id === null) {
      await Api.post("/api/movie", formData);
    } else {
      await Api.put(`/api/movie/${id}`, formData);
    }

    reset();
    setId(null);
    setImages([]);
    redirect("/");
  }

  function update(movieId) {
    setId(movieId);
    const singleMovie = movies.find((m) => m._id === movieId);
    if (!singleMovie) return;

    reset(singleMovie);

    const imageUrls = singleMovie.image?.map(
      (img) => `${import.meta.env.VITE_IMAGE_URL}/${img}`
    );
    setImages(imageUrls);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (params.id) {
      update(params.id);
    }
  }, [params.id, movies]);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-dark text-white text-center">
          <h4 className="mb-0">
            {id === null ? "Add New Movie" : "Update Movie"}
          </h4>
        </div>

        <div className="card-body p-4">
          <form
            onSubmit={handleSubmit(submitMovie)}
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Movie Title</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("title", { required: true })}
                  placeholder="Enter movie title"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("genre", { required: true })}
                  placeholder="Action, Drama, Comedy"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Release Year</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("year", { required: true })}
                  placeholder="2024"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Images</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("image")}
                  accept="image/*"
                  multiple
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                {...register("description")}
                rows="4"
                placeholder="Enter movie description"
              ></textarea>
            </div>

            {images.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Image Preview</label>
                <div className="d-flex flex-wrap">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`preview-${index}`}
                      width="90"
                      height="120"
                      className="me-2 mb-2 border rounded"
                      style={{ objectFit: "cover" }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              {id === null ? (
                <button className="btn btn-primary px-4">Add Movie</button>
              ) : (
                <button className="btn btn-warning px-4">Update Movie</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
