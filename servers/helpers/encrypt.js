const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const encrypt = (password) => {
  return bcrypt.hashSync(password, salt);
};

const validateHash = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { encrypt, validateHash };
