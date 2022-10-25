import axios from 'axios';

const domain = process.env.DOMAIN_API;
const addressAdmin = `${domain}/api/v1/admin/news`;
const address = `${domain}/api/v1/news`;

// Admin Service
export const getAllNewsAdmin = async (
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

export const getOneNewsAdmin = async (params: { id: string }, token: string) => {
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

export const postOneNewsAdmin = async ({payload, token}) => {
  const config = {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    const response = await axios.post(addressAdmin, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const patchOneNewsAdmin = async ({payload, id, token}) => {
  const config = {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    const response = await axios.patch(`${addressAdmin}/${id}`, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteOneNewsAdmin = async ({id, token}) => {
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
export const getAllNews = async (queries: {
  page: string;
  limit: string;
  debouncedSearch?: string;
  category?: string;
}) => {
  const { page, limit, debouncedSearch = '', category = '' } = queries;
  const uri = `${address}?page=${page}&limit=${limit}${debouncedSearch && '&search=' + debouncedSearch}${category && '&category=' + category}`;
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getOneNews = async (params: { id: string }) => {
  const { id } = params;
  try {
    const response = await axios.get(`${address}/${id}`);
    return response.data;  
  } catch (error) {
    return error.response.data;
  }
};
