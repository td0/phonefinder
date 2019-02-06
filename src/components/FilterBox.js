import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

class FilterBox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    filtered: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired
  }
  
  render() {
    const { classes, label, filtered, clickHandler } = this.props

    return (
      <Card className={classes.card}
        onClick={()=>clickHandler(label)} >
        <div className={classes.cardLabel}>
          <Typography variant='h5'>
            {label}
          </Typography>
          <Typography variant='subtitle1'>
            {filtered ? 'Filtered' : 'All ' + label}
          </Typography>
        </div>
        <div className={classes.cardAction}>
          <ExpandMoreIcon className={classes.actionIcon} />
        </div>
      </Card>
    )
  }
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: 270,
    height: 72,
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#EEE",
    },
  },
  cardLabel: {
    flexGrow: 1
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 30,
    borderLeft: '1px solid #F2F2F2',
    paddingLeft: 8
  },
  actionIcon: {
    flex: 10,
  }
}

// const mapStateToProps = ({ phones }) => {
//   return {
//   }
// }

export default connect(
  null,
  {}
) (withStyles(styles)(FilterBox))
