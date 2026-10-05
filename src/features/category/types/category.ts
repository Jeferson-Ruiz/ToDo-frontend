export interface Category {
  id?: string | number
  name: string
  description?: string | null
  dateCreation?: string | null
}

export interface CategoryFilterValues {
  from: string | null
  to: string | null
}
