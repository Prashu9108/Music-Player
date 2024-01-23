import React, { useState } from 'react'

const Search = (props) => {
    const [artist, setArtist]= useState();

    const submitHandler = (e)=>{
        e.preventDefault();
        props.searchName(artist)
    }
  return (
   <div className="row">
        <div className="col-sm-12 col-md-12 collg-6 col-xl-6 col-xxl-6 offset-lg-3 offset-xl-3 offset-xxl-3">
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <div className="input-group">
                            <input type="search" name='artist' id='artist' className='form-control' placeholder='Enter Artist Name' required onChange={(e)=> setArtist(e.target.value)} value={artist}/>
                            <button className="btn btn-outline-success" type='button' onClick={submitHandler}><i className='bi bi-search'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  )
}

export default Search