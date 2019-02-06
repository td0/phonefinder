import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

class ProgressSpinner extends Component {
  render() {
    const { classes } = this.props
    return (
      <center className={classes.root}>
        <CircularProgress className={classes.progress} />
        <Typography 
          className={classes.title} 
          onClick={this.handleTitleClick}
          variant='h6' 
          noWrap>
          Loading
        </Typography>
      </center>
    )
  }
}

const styles = {
  root: {
    paddingTop: 100,
    paddingBottom: 150
  }
}

export default withStyles(styles)(ProgressSpinner)
