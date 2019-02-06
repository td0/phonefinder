import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterPhoneList } from '../redux/actions'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import FilterBox from './FilterBox'

class FilterBar extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    filterList: PropTypes.object.isRequired,
    filterPhoneList: PropTypes.func.isRequired
  }

  state = {
    yearFilterOpen: false,
    brandFilterOpen: false
  }


  filterBoxClick = (label) => {
    if (label === 'Years') {
      this.setState({
        yearFilterOpen: true,
        brandFilterOpen: false
      })
    }
  }
  
  render() {
    const { classes } = this.props

    return (
      <Grid container
        className={classes.gridContainer}
        spacing={16} >
        <Grid item
          className={classes.gridItem} >
          <FilterBox label='Years'filtered={false} clickHandler={this.filterBoxClick} />
        </Grid>
        <Grid item
          className={classes.gridItem} >
          <FilterBox label='Brands'filtered={false} clickHandler={this.filterBoxClick} />
        </Grid>
      </Grid>
    )
  }
}

const styles = {
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16
  },
  gridItem: {
    padding: 0
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: 270,
    height: 100,
    padding: 16
  },
  cardLabel: {
    flex: 10,
    flexGrow: 1
  }
}

const mapStateToProps = ({ phones }) => {
  return {
    filterList: phones.filterList,
    filter: phones.filter
  }
}

export default connect(
  mapStateToProps,
  {filterPhoneList}
) (withStyles(styles)(FilterBar))
