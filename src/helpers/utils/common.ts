export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatDateHome = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatGender = (gender: string) => {
  return gender == 'L' ? 'Laki-laki' : 'Perempuan';
}

export const formatDateInput = (date: string) => {
  const result = new Date(date);
  const yyyy = result.getFullYear();
  let mm = result.getMonth() + 1; // Months start at 0!
  let dd = result.getDate();
  let d, m;

  dd < 10 ? d = '0' + dd : d = dd;
  mm < 10 ? m = '0' + mm : m = mm;

  const formattedToday = yyyy + '-' + m + '-' + d;
  return formattedToday;
}

export const isDate = function (value: string) {
  const checkDate = Date.parse(value);
  if (value) {
    if (Number(value)) {
      return false;
    }
    if (
      !value.match(
        '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$'
      )
    ) {
      return false;
    }
  }
  return checkDate;
};

export function checkIfFilesAreTooBigArr(files?: [File]): boolean {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export function checkIfFilesAreCorrectTypeArr(files?: [File]): boolean {
  let valid = true;
  if (files) {
    files.map((file) => {
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    if (file.size > 1000 * 1024) {
      valid = false;
    }
  }
  return valid;
}

export function checkIfFilesAreCorrectType(file?: File): boolean {
  let valid = true;
  if (file) {
    if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      valid = false;
    }
  }
  return valid;
}

export const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

export const fetcher = async (...args: [string, object]) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching');
    error['info'] = await res.json();
    error['status'] = res.status;
    throw error;
  }

  return await res.json();
};

export const dayOfWeekAsString = (dayIndex) => {
  return (
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][dayIndex] || ''
  );
};

export const statusMember = (value) => {
  const objectStatus = {
    0: 'Pending',
    1: 'Approved',
    2: 'Rejected'
  }
  return objectStatus[value];
}

export const statusMemberCss = (value) => {
  const objectStatus = {
    0: 'text-grey-500',
    1: 'text-green-500',
    2: 'text-red-500'
  }
  return objectStatus[value];
}
