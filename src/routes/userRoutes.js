const express = require('express');
const router = express.Router();
const {
  createUser,
  login
} = require("../controllers/userControllers")

router.post("/createuser", async (req, res) => {
  try {
    const {email, password, fullName, profileImage, age, gender, addresses} = req.body;
    const newUser = await createUser(email, password, fullName, profileImage, age, gender, addresses);
    if (newUser.error) {
      return res.status(500).json({ error: newUser.error });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post("/login", async (req, res) => {
  try {
  const { email, password } = req.body;
  const user = await login(email, password);
  if(user.error){
    return res.status(500).json({ error: user.error });
  }
  res.status(201).json(user)
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  })

module.exports = router;