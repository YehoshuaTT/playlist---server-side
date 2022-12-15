const userController = require("./user.controller");
const bcrypt = require("bcrypt");

const register = async (userDetails) => {
  const userPass = userDetails.password;
  const hash = bcrypt.hashSync(userPass, 10);
  userDetails.password = hash;

  return await userController.creat(userDetails);
};

const login = async (loginUserDetails) => {
  const doesExict = await userController.findOne({
    email: loginUserDetails.email,
  });

  if (!doesExict) return null;
  else {
    const validation = await bcrypt.compare(
      loginUserDetails.password,
      doesExict.password
    );

    if (validation) return doesExict;
    else return null;
  }
};
module.exports = { register, login };
