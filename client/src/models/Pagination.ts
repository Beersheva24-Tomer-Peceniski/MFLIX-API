import type Movie from "./Movie";

export default interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    movies: Movie[];
}