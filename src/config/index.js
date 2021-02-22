const prod = {
  // API_URL: 'https://api.nextgenshop.co.uk',
  API_URL: 'https://nextgenshop.pythonanywhere.com',
};

const dev = {
  API_URL: 'http://127.0.0.1:8000',
};

const shared = {
  ENV: process.env.NODE_ENV,
  HOME_URL: 'https://www.nextgenshop.github.io/nextgenshop-frontend',
  APP_NAME: 'NextGenShop',
};

const config =
  process.env.NODE_ENV === 'development'
    ? { ...dev, ...shared }
    : { ...prod, ...shared };

export default config;
