import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AUTHORIZATION_KEY } from "../constants";

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTHORIZATION_KEY}`
        }
    };

    const response = await fetch(apiUrl, options);
    return response.json();
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        totalPages: 0,
        currentPage: 1,
        fetchStatus: '',
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = [...state.movies, ...action.payload.results]
            state.totalPages = action.payload.total_pages
            state.currentPage = action.payload.page
            state.isLoading = false
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
            state.isLoading = true
        }).addCase(fetchMovies.rejected, (state) => {
            state.isLoading = false
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
