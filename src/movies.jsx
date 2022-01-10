
import { Container, Box, InputBase, Card, CardContent, CardActions, Button, Typography} from '@mui/material';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Movies(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<div className="movies">
              {props.movies ? props.movies.map((movie, index) => (<div>
                <Card sx={{ maxWidth: 275, marginTop: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
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
                    <Button size="small" onClick={handleOpen}>Learn More</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Movie title: {movie.Title}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                               Type: {movie.Type}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                               Release Year: {movie.Year}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                               imdbID: {movie.imdbID}
                            </Typography>
                            <img src={movie.Poster} alt=""/>
                        </Box>
                    </Modal>
                  </CardActions>
                </Card>
              </div>)) : ''}
            </div>
    )
}

export default Movies;
