/*
Problem3
Küçük boy peynirli pizza 50TL, Orta boy mantarlı pizza 100TL, Hamburger 120Tl olarak belirtilen
yiyecekler Voco Fast Food restoranının menüsüne yeni eklencektir. Bütün kayıtları tek bir transaction
içerisinde ekleyen sorguyu yazınız.
*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/restaurants', { useNewUrlParser: true, useUnifiedTopology: true });

const session = await mongoose.startSession();
session.startTransaction();

try {
  const opts = { session };

  const fastFoodRestaurant = await Restaurant.findOne({ name: 'Voco Fast Food' }).session(session);

  await Restaurant.updateOne(
    { _id: fastFoodRestaurant._id },
    {
      $push: {
        menu: [
          { name: 'Küçük Boy Peynirli Pizza', price: 50 },
          { name: 'Orta Boy Mantarlı Pizza', price: 100 },
          { name: 'Hamburger', price: 120 },
        ],
      },
    },
    opts
  );

  await session.commitTransaction();
  session.endSession();

  console.log('Yiyecekler başarıyla eklendi.');
} catch (error) {
  await session.abortTransaction();
  session.endSession();
  console.error('Hata:', error.message);
}
