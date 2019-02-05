import { 
  FETCHING_PHONE_LIST,
  PHONE_LIST_FETCHED,
  FILTERING_LIST,
  LIST_FILTERED
} from '../types'

const initialState = {
  isFetching: true,
  isFiltering: false,
  phoneList: [],
  filteredList: [],
  filter: {
    year: '',
    brand: '',
    search: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCHING_PHONE_LIST:
      return {
        ...state,
        isFetching: true
      }

    case PHONE_LIST_FETCHED:
      return {
        ...state,
        isFetching: false,
        phoneList: action.payload,
        filteredList: action.payload
      }

    case FILTERING_LIST:
      return {
        ...state,
        isFiltering: true,
        filter: action.filter
      }

    case LIST_FILTERED:
      return {
        ...state,
        isFiltering: false,
        filter: action.filtered
      }

    default:
      return state
  }
}