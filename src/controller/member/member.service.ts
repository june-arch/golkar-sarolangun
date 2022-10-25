import axios from 'axios';

const domain = process.env.DOMAIN_API;
const addressAdmin = `${domain}/api/v1/admin/member`;
const address = `${domain}/api/v1/user`;

// Admin Service
export const getAllMemberAdmin = async (
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

export const getOneMemberAdmin = async (params: { id: string }, token: string) => {
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

export const postOneMemberAdmin = async ({payload, token}) => {
  const config = {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    }
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

export const patchOneMemberAdmin = async (
  payload: { body: { name?: string; kemendagri_code?: string }, id: string, token: string},
) => {
  const config = {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${payload.token}`,
    },
  };
  try {
    const formData = new FormData();
    Object.keys(payload.body).forEach((key) => {
      formData.append(key, payload.body[key]);
    });
    const response = await axios.patch(`${addressAdmin}/${payload.id}`, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteOneMemberAdmin = async ({id, token}) => {
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
export const getAllMemberByNik = async (params: { nik: string }) => {
    const { nik } = params;
    try {
      const response = await axios.get(`${address}?nik=${nik}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
};
  
export const postOneMember = async (payload) => {
  const config = {
    headers: {
      Accept: '*/*',
    },
  }
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    formData.append('status', '0');
    const response = await axios.post(address, formData, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
  