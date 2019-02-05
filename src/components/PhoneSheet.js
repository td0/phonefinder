import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

class PhoneSheet extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { classes, data } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          title={data.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='body2'>
            <b>Body</b>: {data.body}
          </Typography>
          <Typography variant='body2'>
            <b>Display</b>: {data.display}
          </Typography>
          <Typography variant='body2'>
            <b>Camera</b>: {data.camera}
          </Typography>
          <Typography variant='body2'>
            <b>Chipset</b>: {data.chipset}
          </Typography>
          <Typography variant='body2'>
            <b>Memories</b>: {data.memory}
          </Typography>
          <Typography variant='body2'>
            <b>Network</b>: {data.network}
          </Typography>
        </CardContent>
        <CardContent className={classes.cardFooter}>
          <Typography variant='subtitle1'>
            {data.brand}
          </Typography>
          <Typography variant='subtitle2'>
            Released {data.release_year}
          </Typography>
        </CardContent>
        
      </Card>
    )
  }
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
    width: '100%',
    height: '100%'
  },
  cardContent: {
    flex: '1 0 auto',
  },
  cardFooter: {
    flex: 0
  }
}

export default withStyles(styles)(PhoneSheet)


