export const API_KEY = '8cac6dec66e09ab439c081b251304443'
export const AUTHORIZATION_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmM0ZWZlM2I3ZmJkODA1NmI1OTkzYTQwMzdmNGEzMiIsIm5iZiI6MTcyNDM2NTU0My4zNDQ2ODgsInN1YiI6IjY2YzdiYTA0NGZhODI1MTAzZGIyZTdlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B34CXgC35uNRlhu4ZNLpf0leyBIVTwqScbdVM5sCLGg';
export const ENDPOINT = 'https://api.themoviedb.org/3'
// export const ENDPOINT_DISCOVER = ENDPOINT+'/discover/movie/?api_key='+API_KEY+'&sort_by=vote_count.desc'
export const ENDPOINT_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc'
// export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie/?api_key='+API_KEY
// export const ENDPOINT_SEARCH = `https://api.themoviedb.org/3/search/keyword?query=`
export const ENDPOINT_SEARCH = `https://api.themoviedb.org/3/search/movie?query=`
export const ENDPOINT_MOVIE = ENDPOINT+'/movie/507086?api_key='+API_KEY+'&append_to_response=videos'
