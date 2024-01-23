import React, { Fragment, useEffect, useState } from 'react'
import './Track.css'
import { useParams } from 'react-router-dom';
import token from '../../token/token';

const  URL = 'https://api.spotify.com';

const Track = () => {
    const [tracks, setTracks] = useState([]);
    const [view, setView] = useState(false); //true= card, false= list

    //player states
    const [audio,setAudio]= useState(false);
    const [playing,setPlaying]= useState(false);//true = play, false = pause
    const [preUrl,setPreUrl]= useState(false)//song url

    const params = useParams();

    const serachTracks = async ()=>{
        await fetch(`${URL}/v1/artists/${params.artistId}/top-tracks?market=IN`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(out =>{
            console.log(out.tracks)
            setTracks(out.tracks);
        }).catch(error => console.log(error.message));
    }

    useEffect(()=>{serachTracks()}, []);

    const trackIcon =(url)=>{
        if (!url) {
        return <strong className='text-danger'>No Track</strong>
        }
        if (playing && url ===preUrl) {
            return <button className="btn btn-sm btn-warning"><i className='bi bi-pause-fill'></i></button>
        }
        else{
            return <button className="btn btn-sm btn-success"><i className='bi bi-play-fill'></i></button>
        }
    }

    //to convert milliseconds to time(min:sec)
    const msToTime = (ms)=>{
        let mSec = ms % 1000;
        let sec = Math.floor((ms/1000) % 60);
        let min =Math.floor((ms/(60*1000)%60));
        return `${min}:${sec}`
    } 

    //to handle play
    const playAudio = (url)=>{
        // console.log(url)
        const myAudio = new Audio(url);

        setAudio(myAudio);
        setPreUrl(url);

        if (!playing) {
            myAudio.play();
            setPlaying(true)
        } else {
            //play to pause
            audio.pause();

            //pause to play again
            if (preUrl === url) {
                setPlaying(false); //pause state
            } else {
                myAudio.play();
                setPlaying(true);
                setPreUrl(url);
                setAudio(myAudio);
            }
        }
    }
  return (
    <Fragment>
        <div className="trackBanner">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="display-3 text-success text-center mt-5">Track</h1>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="container my-5">
            <div className="row my-5">
                <div className="col">
                    <i class="border border-primary btn rounded text-primary" onClick={() =>{setView(!view)}}>
                        {view ? <i class="bi bi-music-note-list h3"></i>: <i class="bi bi-card-heading h3"></i>}
                    </i>
                </div>
            </div>
            <div className="row">
                {
                    tracks && tracks.map((item, index)=>{
                        const {id, name, album,preview_url, duration_ms}= item;
                        return(
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 col-my-2" key={index}>
                                {
                                    view ? (
                                        <div className="card" onClick={()=>{playAudio(preview_url)}}>
                                            <img src={album ? album.images[0].url : ''} alt="" className='img-fluid card-img-top' style={{height: '300px'}}/>
                                            <div className="card-body">
                                                <h5 className="text-success text-center">{name}</h5>
                                            </div>
                                            <div className="card-footer">
                                                { trackIcon(preview_url)}
                                            </div>
                                        </div>
                                    ) : (
                                        <ul className="list-group" onClick={()=>{playAudio(preview_url)}}>
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                      <img src={album? album.images[0].url: ''} alt="noimage" className='img-fluid rounded-circle'/>
                                                    </div>

                                                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6 text-center">
                                                        <h6 className='text-success text-uppercase'>{name}</h6>
                                                    </div>
                                                    
                                                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <p className="text-danger float-end">Time: {msToTime(duration_ms)}</p>
                                                        <span className='float-end'>{trackIcon(preview_url)}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </Fragment>
  )
}

export default Track