export enum tableAdmin {
  REGION = 'Region',
  MEMBER = 'Member',
  ACTIVITY = 'Activity',
  NEWS = 'News',
  CATEGORY_NEWS = 'Category News',
  CATEGORY_ACTIVITY = 'Category Activity',
}

export enum methodAdmin {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const headerItemRegions = ['name', 'kemendagri_code']
export const headerItemMembers = [
  'fullname',
  'gender',
  'status',
  'created_date',
]

export const itemLimit = [5, 10, 20, 30, 40, 50]

export const styleNotActive =
  'cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
export const styleActive =
  'cursor-pointer z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
