const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

const createUser = async (email, password, fullName, profileImage, age, gender, addresses) => {
  try {
    const existingUser = await Users.findOne({ email })
       if(existingUser){
      throw new Error("Bu email zaten kullanılmakta lütfen başka bir eamil adresi girmeyi deneyin!")
      }
    let hashedPassword = null;
    const saltRounds = 10;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const name = fullName
      .split(" ")
      .map((name) => name[0].toUpperCase() + name.substring(1))
      .join(" ");

    const newUser = new Users({
      password: hashedPassword,
      age,
      gender,
      addresses,
      fullName: name,
      profileImage,
      email,
    });
    return newUser.save();

  } catch (error) {
    console.error(error);

    const errorMessage = error.message || "Bir hata oluştu, lütfen daha sonra tekrar deneyin.";

    return { error: errorMessage };
  }
};

const login = async (email, password) => {
  try {
    const user = await Users.findOne({ email })

    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    if (user.isBanner) {
      throw new Error("Yönetici ile iletişime geçin, hesabınız kısıtlandı.");
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Geçersiz şifre");
    }
    return { 
      logged: true, userId: user._id, profileImage: user.profileImage,
      fullName: user.fullName, isAdmin: user.isAdmin, age: user.age, 
      gender: user.gender, addresses: user.addresses
    
    };
  } catch (error) {
    console.error(error);

    let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";

    if (error.message.includes("Kullanıcı bulunamadı")) {
      errorMessage = "Kullanıcı bulunamadı. E-posta adresinizi kontrol edin.";
    } else if (error.message.includes("Yönetici ile iletişime geçin, hesabınız kısıtlandı.")) {
      errorMessage = "Yönetici ile iletişime geçin, hesabınız kısıtlandı.";
    } else if (error.message.includes("Geçersiz şifre")) {
      errorMessage = "Geçersiz şifre. Şifrenizi kontrol edin ve tekrar deneyin.";
    }

    return { error: errorMessage };
  }
};


  module.exports = {
    createUser,
    login
}