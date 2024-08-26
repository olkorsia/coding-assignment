import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'
import { Modal } from './components/Modal'
import useInfiniteScroll from './hooks/useInfiniteScroll'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state)

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=1`))
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const closeModal = () => setOpen(false)

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=1`))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  useInfiniteScroll(() => {
    if (!movies.isLoading) {
      const nextPage = movies.currentPage + 1
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${nextPage}`))
    }
  }, {
    offset: 400,
  });

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <Modal show={isOpen} onClose={closeModal}>
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          <div style={{ padding: "30px" }}><h6>no trailer available. Try another movie</h6></div>
        )}
      </Modal>

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
