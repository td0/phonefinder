import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPhoneList } from '../../redux/actions'

import { withStyles } from '@material-ui/core/styles'

import config from '../../config'

class Home extends Component {
  static propTypes = {
    fetchPhoneList: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchPhoneList()
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <h1>HOME PAGE</h1>
      </div>
    )
  }
} 

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30px'
  }
}

const mapStateToProps = ({ phones }) => {
  return {
    phones
  }
}

export default connect(
  mapStateToProps,
  { fetchPhoneList } 
)(withStyles(styles)(Home))
