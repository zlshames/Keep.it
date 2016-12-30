import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import background from './assets/background.jpg'


export const CoreLayout = ({ children }) => (
  <div className = "main__wrapper">
		<div className = "background"></div>
    <Header/>
    <div className = "main__body">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
