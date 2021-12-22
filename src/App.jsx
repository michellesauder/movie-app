import './App.css';
import * as React from 'react';
import { Container, Box, InputBase, Card, CardContent, CardActions, Button, Typography} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTheMovie } from './actions/movieActions';
// import getMovieData from './api/movies';

const API_KEY = '&i=tt3896198&apikey=dacccf9b';
const API = "http://www.omdbapi.com/?t=";

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
    // vertical padding + font size from searchIcon
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
  console.log(movie)
  
  const dispatch = useDispatch() 

  useEffect(() => setTitle(''), []);

  const handleMovie = () => {
    Axios.get(API + title + API_KEY).then((response) => {
        setMovie(response.data);
        dispatch(setTheMovie(response.data));
      })        
      .catch((err) => {
        console.log('err', err)
    })
  };

  return (<>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width:'100%', display: 'flex', flexDirection: 'column' }} >
          <h1>Movie App</h1>
          <Search>
            <SearchIconWrapper>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search your favorite movies…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={event => setTitle(event.target.value)}
            />
          </Search>
          <Button 
            variant="contained" 
            onClick={handleMovie}
            >
              Search
            </Button>
          {/* results container */}
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {movie.Title}
              </Typography>
              <Typography variant="h5" component="div">
                {movie.Year}
              </Typography> */}
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {movie.Title}
              </Typography>
              <Typography variant="body2">
                  {movie.Year}
                <br />
              </Typography>
              <img src={movie.Poster}/>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>

 </> );
}

const mapStateToProps = ( state ) => {
  return {
    movies:state.movies
  }
}

export default connect(mapStateToProps)(App);
