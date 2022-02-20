const crypto = require('crypto');

module.exports = function encrypt(password) {
    let hash = crypto.createHash('sha1');
    hash.update(password);
    const hashPassword = hash.digest('hex');
    return hashPassword;
  }