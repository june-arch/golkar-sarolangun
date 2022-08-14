import { fetcher } from '@/helpers/utils/common';

const domain = process.env.DOMAIN_API;
const address = `${domain}/api/v1/user`;

export const getMemberByNik = async (params: { nik: string }) => {
  const { nik } = params;
  try {
    const result = await fetcher(address + '?nik=' + nik, { method: 'GET' });
    return result;
  } catch (error) {
    return error;
  }
};

export const postMember = async (payload) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    formData.append('status', '0');
    const result = await fetch(address, {
      headers: {
        Accept: '*/*',
      },
      method: 'POST',
      body: formData,
    });
    return result.json();
  } catch (error) {
    return error;
  }
};
