import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPhoneList } from '../../redux/actions'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import PhoneSheet from '../../components/PhoneSheet'

class Home extends Component {
  static propTypes = {
    fetchPhoneList: PropTypes.func.isRequired,
    list: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchPhoneList()
  }

  renderContent () {
    const { classes, list } = this.props  

    return (
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
       (<center>
          <Typography variant='h5'>No Data</Typography>
        </center>))
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.renderContent()}
      </div>
    )
  }
} 

const styles = {
  root: {
    padding: '120px 10px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left'
  },
  grid: {
  }
}


const mapStateToProps = ({ phones }) => {
  const { phoneList } = phones
  return {
    list: phoneList
  }
}

export default connect(
  mapStateToProps,
  { fetchPhoneList } 
)(withStyles(styles)(Home))
