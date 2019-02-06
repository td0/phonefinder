import { createSelector } from 'reselect'

const phoneList = phones => phones.phoneList
const searchFilter = phones => phones.filter.search.toLowerCase()
const yearFilters = phones => phones.filter.years
const brandFilters = phones => phones.filter.brands

const filterPhones = (searched, years, brands) => {
  let filtered = searched
  if (years.length !== 0)
    filtered = filtered.filter(el => (years.indexOf(el.release_year) > -1))
  if (brands.length !== 0)
    filtered = filtered.filter(el => (brands.indexOf(el.brand) > -1))
  return filtered
}

const isFiltered = (filter) => filter.length > 0

export const getSearched = createSelector(
  [phoneList, searchFilter],
  (list, search) => {
    if (search.length === 0) return list
    else return list.filter(({name}) => name.toLowerCase().indexOf(search) > -1)
  }
)

export const getYearSelected = createSelector(
  [phoneList, yearFilters],
  (list, years) => {
    if (years.length === 0) return list
    else return list.filter(el => !years.indexOf(el.release_year) > -1)
  }
)

export const getBrandSelected = createSelector(
  [phoneList, brandFilters],
  (list, brands) => {
    if (brands.length === 0) return list
    else return list.filter(el => !brands.indexOf(el.brand) > -1)
  }
)

export const isYearFiltered = createSelector(
  yearFilters,
  isFiltered
)

export const isBrandFiltered = createSelector(
  brandFilters,
  isFiltered
)

export const getFilteredPhones =  createSelector(
  [getSearched, yearFilters, brandFilters],
  filterPhones
)