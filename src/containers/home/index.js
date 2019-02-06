import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPhoneList } from '../../redux/actions'
import { getFilteredPhones } from '../../redux/selectors'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import PhoneSheet from '../../components/PhoneSheet'
import FilterBar from '../../components/FilterBar'
import ProgressSpinner from '../../components/ProgressSpinner'

class Home extends Component {
  static propTypes = {
    fetchPhoneList: PropTypes.func.isRequired,
    list: PropTypes.array,
    isFetching: PropTypes.bool,
  }

  componentDidMount() {
    this.props.fetchPhoneList()
  }

  renderContent () {
    const { classes, list, isFetching } = this.props  

    return !isFetching ? (
      list.length !== 0 ? 
        (<Grid container 
          spacing={8}
          className={classes.container}>
          {list.map(el => (
            <Grid item
              xs={12} sm={6} md={4}
              className={classes.grid}
              key={el.id} >
              <PhoneSheet data={el} />
            </Grid>))}
        </Grid>) :
       (<center className={classes.center}>
          <Typography variant='h5'>No Data</Typography>
        </center>)) :
      (<ProgressSpinner />)
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FilterBar className={classes.filterBar} />
        {this.renderContent()}
      </div>
    )
  }
} 

const styles = {
  root: {
    padding: '30px 10px',
  },
  filterBar: {
    width: '100%',
    height: 60
  },
  center: {
    marginTop: 120,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left'
  }
}


const mapStateToProps = ({ phones }) => {
  return {
    list: getFilteredPhones(phones),
    isFetching: phones.isFetching
  }
}

export default connect(
  mapStateToProps,
  { fetchPhoneList } 
)(withStyles(styles)(Home))
