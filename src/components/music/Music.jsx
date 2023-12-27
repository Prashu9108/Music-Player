import React, { Fragment, useState, useEffect } from 'react'
import "./assets/Music.css";
import key from '../../token/token'
import Artist from './artist/Artist';

const URL = 'https://api.spotify.com';

const Music = () => {

    const [artist, setArtist] = useState([]);

    const searchArtist = async (artistName) => {
        await fetch(`${URL}/v1/search?q=${artistName}&type=artist`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${key}`
            }
        })
        .then(res => res.json())
        .then(out => {
            console.log(out)
            setArtist(out.artists.items);
        })
        .catch((error)=> {console.log(error.message)})
    }

    //useEffect => a hook used to call api request
    useEffect(()=> {searchArtist("spb")}, []);

  return (
    <Fragment>
        <div className='banner'>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className='text-center text-secondary mt-5'>WELCOME TO REACT MUSIC PLAYER APP</h1>
                </div>
            </div>
        </div>
    </div>
    <div className='container my-5'>
        <div className="row">
            <div className="col">
                <h2 className='text-center'> ARTISTS</h2>
            </div>
        </div>
        <div className="row">
        {
            artist && artist.map((item, index)=> {
                return(
                    <Artist key={index} {...item} />
                )
            })
        }
        </div>
    </div>
    </Fragment>
    
  )
}

export default Music