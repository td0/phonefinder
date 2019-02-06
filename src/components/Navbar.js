import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterPhoneList } from '../redux/actions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'


class Navbar extends Component {
  static propTypes = {
    filterPhoneList: PropTypes.func.isRequired
  }

  state = {
    search: ''
  }

  handleSearch = () => {
    const { filter, filterPhoneList } = this.props
    if (filter.search !== this.state.search)
      filterPhoneList({
        ...filter, 
        search: this.state.search
      })
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({[name] : value})
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') this.handleSearch()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>

            <div className={classes.search}>
              <InputBase
                name='search'
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.search}
                onChange={this.handleOnChange}
                onKeyPress={this.handleEnter}
              />
            </div>
            <Button 
              variant='outlined' 
              className={classes.menuButton}
              onClick={this.handleSearch} >
              <SearchIcon />
            </Button>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    flex: 0,
    color: 'white',
    borderColor: '#7AE',
  },
  search: {
    flex: 10,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

const mapStateToProps = ({ phones }) => {
  return {
    filter: phones.filter
  }
}

export default connect(
  mapStateToProps,
  { filterPhoneList } 
)(withStyles(styles)(Navbar))
