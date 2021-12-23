
import { Container, Box, InputBase, Card, CardContent, CardActions, Button, Typography} from '@mui/material';


function Movies(props) {
    return (<div className="movies">
              {props.movies ? props.movies.map((movie, index) => (<div>
                <Card sx={{ maxWidth: 275, marginTop: 20 }}>
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
            </div>
    )
}

export default Movies;
