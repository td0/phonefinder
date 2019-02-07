import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isYearFiltered, isBrandFiltered } from '../redux/selectors'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import FilterModal from './FilterModal'

class FilterBar extends Component {
  static propTypes = {
    yearFiltered: PropTypes.bool,
    brandFiltered: PropTypes.bool
  }
  
  state = {
    yearAnchor: null,
    brandAnchor: null
  }

  openYearFilter = (e) => {
    this.setState({
      yearAnchor: e.currentTarget,
      brandAnchor: this.state.brandAnchor
    })
  }

  openBrandFilter = (e) => {
    this.setState({
      yearAnchor: this.state.yearAnchor,
      brandAnchor: e.currentTarget
    })
  }

  closeModal = () => {
    this.setState({
      yearAnchor: null,
      brandAnchor: null
    })
  }

  renderFilterBox = (label, filtered) => {
    const { classes } = this.props
    let anchorEl, openModal
    if (label === 'Years') {
      anchorEl = this.state.yearAnchor
      openModal = this.openYearFilter
    } else {
      anchorEl = this.state.brandAnchor
      openModal = this.openBrandFilter
    }

    return (
      <Fragment>
        <Card className={classes.card}
          onClick={openModal}>
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
        <FilterModal 
          label={label}
          anchorEl={anchorEl}
          filtered={filtered}
          close={this.closeModal} />
      </Fragment>
    )
  }

  render() {
    const { classes, yearFiltered, brandFiltered } = this.props
    return (
      <Grid container
        className={classes.gridContainer}
        spacing={16} >
        <Grid item
          className={classes.gridItem} >
          {this.renderFilterBox('Years', yearFiltered)}
        </Grid>
        <Grid item
          className={classes.gridItem} >
          {this.renderFilterBox('Brands', brandFiltered)}
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16
  },
  gridItem: {
    padding: 0,
    margin: 0
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: 280,
    height: 72,
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#EEE",
    }
  },
  cardLabel: {
    flexGrow: 1
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 30,
    borderLeft: '1px solid #DDD',
    paddingLeft: 8
  },
  actionIcon: {
    flex: 10,
  }
})

const mapStateToProps = ({phones}) => {
  return {
    yearFiltered: isYearFiltered(phones),
    brandFiltered: isBrandFiltered(phones)
  }
}

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(FilterBar))
