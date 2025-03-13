import connectDB from "../database/database.js";

async function getMovies() {
    const db = await connectDB();
    const moviesCollection = db.collection("movies");
    return await moviesCollection.find({}).toArray();
}

console.log(await getMovies());