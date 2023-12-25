import React from 'react'
import InfinityLoader from "./InfinityLoader.gif";
const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src={InfinityLoader} alt='InfinityLoader'></img>
      <h1>Loading...</h1>
      {/* You can add any specific loader animation here */}
    </div>
  )
}

export default Loader
