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
  yearList: [],
  brandList: [],
  filter: {
    search: '',
    years: [],
    brands: []
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
      const { list, years, brands } = action.payload
      return {
        ...state,
        isFetching: false,
        phoneList: list,
        yearList: years,
        brandList: brands,
        filter : {
          ...state.filter,
          years,
          brands
        }
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
      }

    default:
      return state
  }
}