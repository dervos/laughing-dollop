import React from 'react'
import {
  Banner,
  Heading,
  Text
} from 'rebass'

const Header = () => (
  <Banner
    style={{
      minHeight: '75vh',
      paddingTop: 48,
      backgroundAttachment: 'fixed'
    }}
    backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg">
    <Heading size={1} big children="Rebass" />
    <Text children="Configurable example page" />
  </Banner>
)

export default Header
