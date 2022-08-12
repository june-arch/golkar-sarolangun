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

export const postMember = async (payload, token: string) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    const result = await fetcher(address, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
      method: 'POST',
      body: formData,
    });
    return result;
  } catch (error) {
    return error;
  }
};
