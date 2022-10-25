import axios from "axios";

const domain = process.env.DOMAIN_API;
const addressAdmin = `${domain}/api/v1/auth/admin`;

export const postLogin = async (payload: {
  username: string;
  password: string;
}) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  try {
    const response = await axios.post(addressAdmin, payload, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
