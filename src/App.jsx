import './App.css';
import * as React from 'react';
import { Container, Box, InputBase, Card, CardContent, CardActions, Button, Typography} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTheMovie } from './actions/movieActions';
import SearchIcon from '@mui/icons-material/Search';
import Movies from '../src/movies';

const API_KEY = '&i=tt3896198&apikey=dacccf9b';
const API = "http://www.omdbapi.com/";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '50ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

function App(props) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  
  const dispatch = useDispatch() 

  const getMovies = () => {
    Axios.get(API + '?s={' + title + '}' + API_KEY).then((response) => {
      console.log(response.data.Search);
        setMovies(response.data.Search);
      })        
      .catch((err) => {
        console.log('err', err)
    })
  };

  useEffect(() => getMovies(), [title]);

  const handleMovie = () => {
    Axios.get(API + '?t='+ title + API_KEY).then((response) => {
        setMovie(response.data.Search);
        dispatch(setTheMovie(response.data));
      })        
      .catch((err) => {
        console.log('err', err)
    })
  };

  return (<>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '', minHeight: '100vh', width:'100%', display: 'flex', flexDirection: 'column' }} >
          <h1>Movie App</h1>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search your favorite movies…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={event => setTitle(event.target.value)}
            />
          </Search>
          {/* <Button 
            variant="contained" 
            onClick={handleMovie}
            >
              Search
            </Button> */}
          {/* single results container */}
          {/* {movie.Title ? <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {movie.Title}
              </Typography>
              <Typography variant="body2">
                  {movie.Year}
              </Typography>
              <img src={movie.Poster} alt=""/>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card> : ''} */}

        {/* all movie search */}
          {/* {<div className="movies">
              {movies ? movies.map((movie, index) => (<div>
                <Card sx={{ maxWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {movie.Title}
                    </Typography>
                    <Typography variant="body2">
                        {movie.Year}
                    </Typography>
                    <img src={movie.Poster} alt=""/>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>)) : ''}
            </div>} */}
            <Movies movies={movies}/>
          </Box>
          <div>
        </div>
      </Container>
 </> );
}

const mapStateToProps = ( state ) => {
  return {
    movies:state.movies
  }
}

export default connect(mapStateToProps)(App);
