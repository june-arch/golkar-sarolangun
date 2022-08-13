const domain = process.env.DOMAIN_API;

export const requestCategoryAll = async () => {
  const res = await fetch(`${domain}/api/v1/news/category`);
  return res.json();
};
