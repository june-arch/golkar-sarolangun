import axios from 'axios';

import { ParamsActivity } from './activity.interface';

const domain = process.env.DOMAIN_API;
const addressAdmin = `${domain}/api/v1/admin/activity`;
const address = `${domain}/api/v1/activity`;

// Admin Service
export const getAllActivityAdmin = async ( queries: ParamsActivity, token: string) => {
  const { page, limit, debouncedSearch } = queries;
  let uri = `${addressAdmin}?page=${page}&limit=${limit}${debouncedSearch && '&search=' + debouncedSearch}`;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${uri}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getOneActivityAdmin = async (params: { id: string }, token: string) => {
  const { id } = params;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${addressAdmin}/${id}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postOneActivityAdmin = async ({payload, token}) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });
  const config = {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(addressAdmin, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const patchOneActivityAdmin = async ({payload, id, token}) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    if (typeof payload[key] == 'object') {
      for (let item of payload[key]) {
        formData.append(key, item);
      }
    }
    formData.append(key, payload[key]);
  });
  const config = {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.patch(`${addressAdmin}/${id}`, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteOneActivityAdmin = async ({id, token}) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  };
  try {
    const response = await axios.delete(`${addressAdmin}/${id}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// User Service
export const getAllActivity = async (queries: ParamsActivity) => {
  const { page, limit, debouncedSearch = '' } = queries;
  try {
    const uri = `${address}?page=${page}&limit=${limit}${debouncedSearch && '&search=' + debouncedSearch}`;
    const response = await axios.get(`${uri}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getOneActivity = async (id: string) => {
  try {
    const response = await axios.get(`${address}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};