const crypto = require('crypto');

const hashpass = (password) => {
  const salt = crypto.randomBytes(16).toString('hex'); 
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); 
  return { salt, hashedPassword }; 
};

const verifyPassword = (password, salt, hashedPassword) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); 
  return hash === hashedPassword; 
};

module.exports = { hashpass, verifyPassword };