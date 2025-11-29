import React from 'react'
import useStore from '#store/window'

const WindowControllers = ({ target }) => {
  const { closeWindow } = useStore()

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)}></div>
      <div className="minimize"></div>
      <div className="maximize"></div>
    </div>
  )
}

export default WindowControllers