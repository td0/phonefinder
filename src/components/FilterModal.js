import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { filterPhoneList } from '../redux/actions/PhonesActions'
import { connect } from 'react-redux'

import Popover from '@material-ui/core/Popover'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

class FilterModal extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    anchorEl: PropTypes.object,
    close: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    filtered: PropTypes.bool,
    filterList: PropTypes.object.isRequired,
    filterPhoneList: PropTypes.func.isRequired
  }

  handleCheckBox = (value, type) => e => {
    let newFilter = Object.assign(this.props.filter)
    let filterType = new Set(newFilter[type])
    if (e.target.checked) filterType.add(value)
    else filterType.delete(value)
    newFilter[type] = [...filterType]
    this.props.filterPhoneList(newFilter)
  }

  handleClose = () => {
    this.props.close()
  }
  
  renderCheckBox () {
    const { 
      classes,
      label,
      filterList,
      filter
    } = this.props
    const type = label.toLowerCase()

    return (
      <FormGroup className={classes.formGroup}>
        {filterList[type].map( el => (
          <FormControlLabel 
          control={<Checkbox
            defaultChecked={filter[type].indexOf(el) > -1}
            onChange={this.handleCheckBox(el, type)} 
            value={el} />} 
          key={el}
          label={el} />
        ))}
      </FormGroup>
    )
  }

  render () {
    const {
      classes,
      label,
      anchorEl,
      filtered
    } = this.props

    return (
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionDuration={0} >
        <div className={classes.container}>
          <div className={classes.header}
            onClick={this.handleClose} >
            <div className={classes.headerLabel}>
              <Typography variant='h5'>
                {label}
              </Typography>
              <Typography variant='subtitle1'>
                {filtered ? 'Filtered' : 'All ' + label}
              </Typography>
            </div>
            <div className={classes.headerAction}>
              <ExpandLessIcon className={classes.actionIcon} />
            </div>
          </div>
          <div className={classes.body}>
            {this.renderCheckBox()}
          </div>
        </div>
      </Popover>
    )
  }
}

const styles = theme => ({
  container: {
    margin: 0,
    minHeight: 100,
    maxHeight: 400,
    width: 280,
    padding: '8px 12px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    cursor: 'pointer',
  },
  headerLabel: {
    flexGrow: 1
  },
  headerAction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 30,
    borderLeft: '1px solid #DDD',
    paddingLeft: 8
  },
  actionIcon: {
    flex: 10,
  },

  body: {
    paddingBottom: 20,
    paddingLeft: 10
  }
})

const mapStateToProps = ({ phones }) => {
  return {
    filter: phones.filter,
    filterList: phones.filterList
  }
}

export default connect(
  mapStateToProps,
  { filterPhoneList }
)(withStyles(styles)(FilterModal))
