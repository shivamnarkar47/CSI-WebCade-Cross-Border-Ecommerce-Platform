import bcrypt from 'bcryptjs';
import User from '../Models/user.model.js';

export const createUser = async (req, res) => {
  const { name, email, password, role, country } = req.body;
  try {
    const user
      = await User.create({ name, email, password: bcrypt.hashSync(password, 8), role, country });
    res.status(201).json({ user });
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User
      .findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ user });
    }
    else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await
      User.findById(id);
    res.status(200).json({ user });
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User
      .findByIdAndUpdate(id, {
        name, email, password: bcrypt.hashSync(password, 8)
      });
    res.status(200).json({ user });
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User
      .findByIdAndDelete(id);
    res.status(200).json({ user });
  }
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}


