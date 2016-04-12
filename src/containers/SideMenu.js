import React from 'react'
import { Link } from 'react-router'


class SideMenu extends React.Component {
  render() {
    return (
      <div id="menu">
        <div class="pure-menu">
          <Link className="pure-menu-heading" to="/">Dervos</Link>
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/user/dervos">Galleries</Link>
            </li>
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/user/dervos/gallery/amsterdam">Amsterdam</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SideMenu
