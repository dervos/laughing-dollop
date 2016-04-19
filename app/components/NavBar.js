import React from 'react'
import {
  Arrow,
  Dropdown,
  DropdownMenu,
  Fixed,
  NavItem,
  Space,
  Toolbar
} from 'rebass'

const Navbar = () => (
  <Fixed top left right zIndex={1}>
    <Toolbar>
      <NavItem children="Dervos" />
      <Space auto />
      <Dropdown>
        <NavItem>
          Config
          <Arrow />
        </NavItem>
        <DropdownMenu
          right>
          Blub
        </DropdownMenu>
      </Dropdown>
      <Space />
      <NavItem
        children="Edit" />
    </Toolbar>
  </Fixed>
)

export default Navbar
