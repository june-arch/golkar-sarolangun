const domain = process.env.DOMAIN_API;
const address = `${domain}/api/v1/region`;

export const getAllRegions = async () => {
  const res = await fetch(`${address}/list`);
  return await res.json();
};