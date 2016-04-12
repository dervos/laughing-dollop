import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import UserPage from 'containers/UserPage'
import GalleryPage from 'containers/GalleryPage'

export default (store) => (
  <Route path="/" component={App}>
    <Route path="user/:username" component={UserPage}>
      <Route path="gallery/:path" component={GalleryPage} />
    </Route>
  </Route>
)
