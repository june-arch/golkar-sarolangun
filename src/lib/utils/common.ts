export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const isDate = function (value: string) {
  const checkDate = Date.parse(value)
  if (value) {
    if (Number(value)) {
      return false
    }
    if (
      !value.match(
        '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$'
      )
    ) {
      return false
    }
  }
  return checkDate
}

export function checkIfFilesAreTooBigArr(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > 10) {
        valid = false
      }
    })
  }
  return valid
}

export function checkIfFilesAreCorrectTypeArr(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
}

export function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true
  if (file) {
    if (file.size >  (1000 * 1024)) {
      valid = false
    }
  }
  return valid
}

export function checkIfFilesAreCorrectType(file?: File): boolean {
  let valid = true
  if (file) {
    if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      valid = false
    }
  }
  return valid
}