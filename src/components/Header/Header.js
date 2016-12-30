import React from 'react'
import { IndexLink, Link } from 'react-router'
import { AppBar, Tabs, Tab, IconButton, FlatButton } from 'material-ui'

import './Header.scss'

const styles = {
  title: {
    cursor: 'pointer',
    marginLeft: 0
  },
}

export const Header = () => (
  <div>
    <AppBar
      title={<span style={styles.title}>Keep.it</span>}
      iconElementRight={<FlatButton label="Login" />}>
    </AppBar>
  </div>
)

export default Header
