import { createSelector } from 'reselect'

const phoneList = phones => phones.phoneList
const searchFilter = phones => phones.filter.search
const yearFilters = phones => phones.filter.years
const brandFilters = phones => phones.filter.brands

const filterPhones = (list, search, years, brands) => list
  .filter(el => search.length === 0 ? true : el.name.toLowerCase().includes(search.toLowerCase()))
  .filter(el => years.includes(el.release_year))
  .filter(el => brands.includes(el.brand))

export const getFilteredPhones =  createSelector(
  phoneList,
  searchFilter,
  yearFilters,
  brandFilters,
  filterPhones
)