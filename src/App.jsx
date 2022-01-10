import './App.css';
import * as React from 'react';
import { Container, Box, InputBase, Button} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTheMovie } from './actions/movieActions';
import SearchIcon from '@mui/icons-material/Search';
import Movies from '../src/movies';
import Type from '../src/Type';

const API_KEY = '&i=tt3896198&apikey=dacccf9b';
const API = "http://www.omdbapi.com/";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  alignItems: 'center',
  display: 'flex',
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '50%',
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
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  
  // const dispatch = useDispatch() 

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

  return (<>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '', minHeight: '100vh', width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
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
          {/* <Type /> */}
            <Movies movies={movies}/>
          </Box>
          <div>
        </div>
      </Container>
 </> );
}

// const mapStateToProps = ( state ) => {
//   return {
//     movies:state.movies
//   }
// }

export default App;
