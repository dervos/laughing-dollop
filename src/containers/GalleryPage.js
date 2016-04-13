import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class GalleryPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <div className="header">
        </div>
        <div className="content">
        </div>
      </div>
    )
  }
}

GalleryPage.propTypes = {
}

function mapStateToProps(state, ownProps) {
}

export default connect(mapStateToProps, {
})(GalleryPage)
