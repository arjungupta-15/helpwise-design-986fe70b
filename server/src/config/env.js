const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:8080';

module.exports = {
  corsOrigin,
  glpi: {
    baseUrl: process.env.GLPI_BASE_URL,
    appToken: process.env.GLPI_APP_TOKEN,
    userToken: process.env.GLPI_USER_TOKEN,
  },
  solman: {
    baseUrl: process.env.SOLMAN_BASE_URL,
    username: process.env.SOLMAN_USERNAME,
    password: process.env.SOLMAN_PASSWORD,
  },
  imap: {
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT || 993),
    user: process.env.IMAP_USER,
    pass: process.env.IMAP_PASS,
  },
};