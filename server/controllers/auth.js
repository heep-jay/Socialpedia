import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
/* Register User*/
export const register = async (req, res) => {
  try {
    /* Destructure body of request*/
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    /* create password hash*/
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    /* create register user with hashed password*/
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    /* Save Registered User*/
    const savedUser = await newUser.save();

    /* Return new User response to the front end*/
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user === null || undefined)
      return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const login = async (req, res, next) => {
//   const user = await User.findOne({ email: req.query.email });
//   if (user !== null) {
//     const verify_password = await bcrypt.compare(
//       req.query.password,
//       user.password
//     );
//     if (verify_password) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       // res.header("x-auth-token", token).send({
//       //   token: token,
//       // });
//       res.status(200).json({ user, token });
//     } else {
//       res.status(400).send({ message: "Wrong email or password." });
//     }
//   } else {
//     res.status(404).send({ message: "User not found." });
//   }
// };
