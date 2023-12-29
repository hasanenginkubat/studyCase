/*
Problem4
Restoranlara yapılan yorumlar baz alınarak, son yorum yapan 20 erkek kullanıcıyı yaşa göre sıralayınız.
(Bir sonraki sorguda sonraki 20 erkek listelenecek şeklinde yorumlayıp sorguyu yazmanız
beklenmektedir)
*/


const result = await Review.aggregate([
    { $group: { _id: "$userId", reviewDate: { $max: "$date" } } },
    
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    { $match: { "userDetails.gender": "male" } },
  
    { $sort: { "userDetails.age": 1 } },
    { $limit: 20 },
  
    {
      $project: {
        _id: 0,
        userId: "$_id",
        age: "$userDetails.age",
        reviewDate: 1,
      },
    },
  ]);
  
  