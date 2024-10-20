const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 이미 가입된 사용자인지 확인
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('이미 가입된 사용자입니다😥');
    }

    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(200).json({ status: 'ok', data: newUser });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

module.exports = userController;
