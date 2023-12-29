const Resturant = require("../models/Resturant")
const Menu = require("../models/Menu")
const axios = require("axios");


// Eğer google gecode api keyim olsaydı bu fonksiyon ile kordinatları otomatik olarak apim doldurcaktı
// const geocodeAddress = async (address) => {
//     const apiKey = "api-key";
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(apiUrl);
//         console.log(response)
//         const location = response.data.results[0].geometry.location;
//         return {
//             type: "Point",
//             coordinates: [location.lng, location.lat],
//         };
//     } catch (error) {
//         console.error("Adres dönüştürme hatası:", error.message);
//         throw new Error("Adres dönüştürme hatası");
//     }
// }


const createRestaurant = async (name, description, logo, address, location, types) => {
    try {
        
        // const location = await geocodeAddress(address);

        const restaurant = new Resturant({
            name,
            description,
            logo,
            address,
            location,
            types,
            branches: address.district
        });

        return await restaurant.save();

    } catch (error) {
        console.error("Restoran oluşturma hatası:", error.message);
    }
};


createBranchForRestaurant = async (id, address, location) => {
    try {
        const restaurant = await Resturant.findById(id);

        if (!restaurant) {
            throw new Error("Resturant bulunamadı, lütfen bilgilerinizi kontrol ediniz...");
        }

        const newBranch = address.district;


        const newRestaurant = new Resturant({
            name: restaurant.name,
            description: restaurant.description,
            logo: restaurant.logo,
            types: restaurant.types,
            address: address,
            location: location,
            branches: [...restaurant.branches, newBranch],
        });


        return await newRestaurant.save();
    } catch (error) {
        console.error("Şube oluşturma hatası:", error.message);
    }
}


const createMenu = async (restaurantId, name, price, content, coverImage) => {
    try {
        const restaurant = await Resturant.findById(restaurantId);

        if (!restaurant) {
            throw new Error("Restoran bulunamadı, lütfen geçerli bir restoran ID'si sağlayın.");
        }

        const newMenu = new Menu({
            name,
            price,
            content,
            coverImage,
            restaurantId: restaurant._id,
        });

        await newMenu.save();

        console.log("Yeni menü öğesi başarıyla eklendi.");
        return newMenu;
    } catch (error) {
        console.error("Menü öğesi oluşturma hatası:", error.message);
        throw error;
    }
};

const getRestaurants = async () => {
    try {
      const restaurants = await Resturant.find();
      if (restaurants) {
        return restaurants;
      }
  
      return "Bir şeyler ters gitti :(";
    } catch (error) {
      console.error("Restoran getirme hatası:", error.message);
      throw error;
    }
  };
   // ratingleri avarajlamak için kullandığım fonksiyon
  const calculateAverageRating = (ratings) => {
    
    if (ratings.length === 0) {
        return 0;
    }

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;
    return average;
};



const getRestaurantsByRating = async () => {
    try {
        const restaurants = await Resturant.find();
        
        if (restaurants) {
            const userFriendlyResult = restaurants.map((restaurant) => {
                const averageRating = calculateAverageRating(restaurant.ratings);
                return {
                    restaurantName: restaurant.name,
                    averageRating: isNaN(averageRating) ? 'Henüz değerlendirme yok' : averageRating.toFixed(2),
                };
            });

            return userFriendlyResult;
        }

        return "Bir şeyler ters gitti :(";
    } catch (error) {
        console.error("Restoran getirme hatası:", error.message);
        throw error;
    }
};


  


module.exports = {
    createRestaurant,
    createMenu,
    createBranchForRestaurant,
    getRestaurants,
    getRestaurantsByRating

}
