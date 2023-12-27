import React from 'react'
const noImage = "https://th.bing.com/th/id/OIP.rm3U-o63yd2xH2hgdQOOxAAAAA?rs=1&pid=ImgDetMain";

const Image = (props) => {
  return (
    <img src={props.data ? props.data.url : noImage} alt="" className='rounded' style={{height:'300px'}}/>
  )
}

export default Image