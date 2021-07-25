import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import axios from 'axios';
import './Home.css'
import baseurl from '../../assets/baseUrl'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
//import  DatePicker from "@material-ui/pickers/DatePicker";

function Home() {
    const [movies, setMovies] = useState(null);
    const [artists, setArtists] = useState(null);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [movieName , setMovieName] = useState("");
    const [genres, setGenres] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [apply, setApply] = useState(null);
    const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            fontFamily: 'Open Sans',
        },
        gridList: {
            margin: '0px',
            flexWrap: 'nowrap',
        },
        link: {
            color: '#eae',
        },
        title: {
            fontWeight: '800',
        },
    };
    const handleFilterVlaues = (e, value) => {

    }
    useEffect(() => {
        console.log("entered");
        axios.get(`${baseurl}/v1/movies`)
            .then(res => {
                const { movies } = res.data;

                setMovies(movies);
            })
        axios.get(`${baseurl}/v1/artists`)
            .then(res => {
                const { artists } = res.data;
                setArtists(artists)
                console.log(artists)
            })
        axios.get(`${baseurl}/v1/genres`)
            .then(res => {
                let { genres } = res.data;
                setGenres(genres)
                console.log(genres)
            })
    }, []);

    return (
        <div>
            <Header />
            <div id="home-header">Upcoming Movies</div>
            <div>
                <GridList
                    className="upcoming-movies"
                    cellHeight={350}
                    cols={4}
                    style={styles.gridList}
                >
                    {movies && movies.slice(1, 7).map((movie, index) => (
                        <GridListTile
                            key={index}
                            cols={1}
                            title={<div style={styles.title}>{movie.title} </div>}
                        //subtitle={<span>by <b>{movie.author}</b></span>}
                        >
                            <img src={movie.poster_url} />
                            <GridListTileBar
                                title={movie.title}

                            />
                        </GridListTile>
                    ))}
                </GridList>
                <div id="movies-filter">
                    <GridList
                        cellHeight={350}
                        cols={4}
                        style={{ width: '76%' }}
                    >
                        {movies && movies.slice(1, 5).filter(movie => 
                        //debugger
                        movie.title.toLowerCase().includes(movieName.toLowerCase()) &&
                        (selectedArtists.length === 0 || movie.artists.some(item => selectedArtists.some(ele => ele.id==item.id)))&&
                        (selectedGenres.length === 0 || movie.genres.some(item => selectedGenres.includes(item)))&&
                        ( startDate===null || Date.parse(startDate)<= Date.parse(movie.release_date))&&
                        ( endDate===null || Date.parse(endDate)>=Date.parse(movie.release_date)) || !apply
                        ).map((movie, index) => (
                            <GridListTile
                                key={index}
                                cols={1}
                                title={<div style={styles.title}>{movie.title} </div>}
                            //subtitle={<span>by <b>{movie.author}</b></span>}
                            >
                                <img src={movie.poster_url} />
                                <GridListTileBar
                                    title={movie.title}
                                    subtitle={movie.release_date}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                    <Card style={{ maxWidth: '250px', width: '24%', margin: '16px' }}>
                        <CardHeader title={<span id="filter-heading">FIND MOVIES BY:</span>} ></CardHeader>
                        <CardContent>
                            <FormControl >
                                <TextField onChange={(e) => {
                                    setMovieName(e.target.value)
                                }} label='Movie Name' placeholder='Enter Movie Name' fullWidth />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
                                <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={[]}
                                    // onChange={handleChange}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    fullWidth
                                // MenuProps={MenuProps}
                                >
                                    {genres && genres.map((genre, index) => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox onChange={() => {
                                                  let seleced =selectedGenres
                                                  if(seleced.includes(genre.genre)){
                                                     let i = seleced.indexOf(genre.genre);
                                                     seleced.splice(i, 1);
                                                  }else{
                                                      seleced.push(genre.genre);
  
                                                  }
                                                  console.log(seleced)
                                                  setSelectedGenres([...seleced])
                                            }} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-mutiple-checkbox-label">Artists</InputLabel>

                                <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={selectedArtists}
                                    //onChange={handleChange}
                                    input={<Input />}
                                    renderValue={(selected) => {
                                        selected.join(', ')
                                    }}
                                    fullWidth
                                // MenuProps={MenuProps}
                                >
                                    {artists && artists.map((artist, index) => (
                                        <MenuItem key={artist.id} value={`${artist.first_name} ${artist.last_name}`}>
                                            <Checkbox onChange={(e) => {
                                                let seleced =selectedArtists
                                                if(seleced.includes(artists[index])){
                                                   let i = seleced.indexOf(artists[index]);
                                                   seleced.splice(i, 1);
                                                }else{
                                                    seleced.push(artists[index]);

                                                }
                                                debugger
                                                console.log(seleced)
                                                setSelectedArtists([...seleced])
                                            }} 
                                            //checked={artist.check} 
                                            />
                                            <ListItemText primary={`${artist.first_name} ${artist.last_name}`} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    id="date"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                </FormControl>
                            <FormControl fullWidth>
                            <TextField
                                    id="date"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue={endDate}
                                    onChange={(e) => { console.log(e.target.value) ; setEndDate(e.target.value) }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                </FormControl>
                                <Button style={{width:"-webkit-fill-available"}}variant="contained" color="primary" onClick={()=>{
                                    setApply(true);
                                }}>apply</Button>

                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default Home;