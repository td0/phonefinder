import { 
  FETCHING_PHONE_LIST,
  PHONE_LIST_FETCHED,
  FILTERING_LIST,
  LIST_FILTERED
} from '../types'



import config from '../../config'
const { FonoApi } = config

export const fetchPhoneList = () => dispatch => {
  // const body = {
  //   token: FonoApi.token,
  //   limit: FonoApi.limit
  // }

  dispatch({type: FETCHING_PHONE_LIST})
  fetch(FonoApi.url.fbStorage)
  .then(response => {
    return response.json()
  })
  .then(list => {
    dispatch({
      type: PHONE_LIST_FETCHED,
      payload: list
    })
  })
  .catch(err => console.log('err : ' + err));
}

export const filterPhoneList = (data, filter) => dispatch => {
  dispatch({type: FILTERING_LIST })
  let filtered = getFiltered(data, filter)
  dispatch({
    type: LIST_FILTERED,
    filtered
  })
}

const getFiltered = (data, filter) => {
  return data.filter(el => {
    if (filter.year !== '') {
      if (el.release_year !== filter.year) return false
    }
    if (filter.brand !== '') {
      if (el.Brand !== filter.brand) return false
    }
    if (filter.search !== '') {
      if (!el.DeviceName.includes(filter.search)) return false
    }
    return true
  })
}