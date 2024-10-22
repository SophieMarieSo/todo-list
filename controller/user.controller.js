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
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 이메일 정보로 유저정보 가져오기
    const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
    if (user) {
      // 사용자가 보낸 비밀번호와 데이터베이스에 있는 비밀번호가 같은지 확인
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        // 토큰 발행
        const token = user.generateToken();
        return res.status(200).json({ status: 'ok', user, token });
      }
    }
    throw new Error('아이디 또는 비밀번호가 일치하지 않습니다');
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = User.findById(userId);
    if (!user) {
      throw new Error('can not find user');
    }

    res.status(200).json({ status: 'ok', user });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

module.exports = userController;
