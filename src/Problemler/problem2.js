/*
Problem2
Açıklamasında lahmacun içeren, (39.93, 32.85) koordinatlara en yakın 5 restoranı listeleyiniz.
*/

const result = await Restaurant.find(
    {
      $text: { $search: 'lahmacun' },
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [39.93, 32.85] },
        },
      },
    },
    { _id: 0, name: 1, description: 1, location: 1 }
  )
    .limit(5)
    .exec();
  
  