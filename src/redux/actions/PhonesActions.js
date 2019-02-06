import { 
  FETCHING_PHONE_LIST,
  PHONE_LIST_FETCHED,
  FILTERING_LIST,
  LIST_FILTERED
} from '../types'

import config from '../../config'
const { FonoApi } = config

export const fetchPhoneList = () => dispatch => {
  dispatch({type: FETCHING_PHONE_LIST})
  fetch(FonoApi.url.fbStorage)
  .then(response => {
    return response.json()
  })
  .then(phoneList => {
    const filterList = getFilterList(phoneList)
    dispatch({
      type: PHONE_LIST_FETCHED,
      payload: {
        phoneList,
        filterList
      }
    })
  })
  .catch(err => console.log('err : ' + err));
}

export const filterPhoneList = (filter) => dispatch => {
  dispatch({
    type: FILTERING_LIST,
    filter
  })
}

export const filteringDone = () => dispatch => {
  dispatch({
    type: LIST_FILTERED
  })
}

const getFilterList = (data) => {
  const brandSet = new Set()
  const brandList = []
  const yearSet = new Set()
  const yearList = []
  
  data.forEach(el => {
    if (!yearSet.has(el.release_year)) {
      yearSet.add(el.release_year)
      yearList.push(el.release_year)
    }
    if (!brandSet.has(el.brand)) {
      brandSet.add(el.brand)
      brandList.push(el.brand)
    }
  })
  yearList.sort((a, b) => b - a)
  brandList.sort((a, b) => a - b)
  
  return { yearList, brandList }
}