// Hold application secrets and config
module.exports = {
  secret: process.env.JWTsecret || 'praisethegreengoddess',
  domain: process.env.DOMAIN || 'localhost:3000'
}
