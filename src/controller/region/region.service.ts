import axios from 'axios';

const domain = process.env.DOMAIN_API;
const addressAdmin = `${domain}/api/v1/admin/region`;
const address = `${domain}/api/v1/region`;

// Admin Service
export const getAllRegionAdmin = async (
  queries: { page: string; limit: string; debouncedSearch?: string },
  token: string
) => {
  const { page, limit, debouncedSearch } = queries;
  const uri = `${addressAdmin}?page=${page}&limit=${limit}${debouncedSearch && '&search=' + debouncedSearch}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(uri, config);
    return response.data;
  } catch (error) {
    return error.response.data;    
  }
};

export const getListRegionAdmin = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${addressAdmin}/list`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getOneRegionAdmin = async (params: { id: string }, token: string) => {
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

export const postOneRegionAdmin = async ({payload,token}) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(addressAdmin, payload, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const patchOneRegionAdmin = async ({ payload, id, token }) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.patch(`${addressAdmin}/${id}`, payload, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteOneRegionAdmin = async ({id, token}) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`${addressAdmin}/${id}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// User Service
export const getListRegion = async () => {
  try {
    const response = await axios.get(`${address}/list`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};