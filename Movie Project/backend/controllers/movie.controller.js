const Movie = require('../models/movie.model')
const path = require('path')
const fs = require('fs')


exports.createMovie = async (req, res) => {

    const { title, genre, year, description } = req.body
    const images = req.files.map((ele) => ele.filename)
    const movie = await Movie.create({ ...{ title, genre, year, description }, image: images })
    res.send(movie)
}

exports.getMovies = async (req, res) => {
    const movies = await Movie.find()
    if (movies.length > 0) {
        res.json({
            Success: true,
            movies
        })
    }
}

exports.trashMovie = async (req, res) => {
    const { id } = req.params
    const matchMovie = await Movie.findById(id)
    if (matchMovie) {
        matchMovie.image.forEach(async (ele) => {
            let imagePath = await path.join(__dirname, '../uploads', ele)
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    res.json({
                        Success: false,
                        message: "File Path Not Found"
                    })
                } else {
                    await Movie.findByIdAndDelete(id)
                    res.json({
                        Success: true,
                        message: "Movie Has Been Deleted"
                    })
                }
            })
        })
    } else {
        res.json({
            Success: false,
            message: "Movie Not Found"
        })
    }
}


exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, year, description } = req.body;

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.json({ success: false, message: "Movie not found" });
        }

        let newImages = movie.image;
        if (movie.image && movie.image.length > 0) {
            for (const img of movie.image) {
                const imagePath = path.join(__dirname, '../uploads', img);
                try {
                    await fs.unlink(imagePath);
                } catch (err) {
                    console.log("File not found:");
                }
            }
        }
        newImages = req.files.map(file => file.filename);

        await Movie.findByIdAndUpdate(id, {
            title,
            genre,
            year,
            description,
            image: newImages
        });

        res.json({
            success: true,
            message: "Movie updated successfully",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};







