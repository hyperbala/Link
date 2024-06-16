import ReactPlayer from 'react-player'
import React from 'react'
 
 const Player = (props) => {
  
  const { url, muted, playing, isActive } = props;
   return (
      <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
          style={{borderRadius: '15px' }}
          />
   )
 }
 
 export default Player
 