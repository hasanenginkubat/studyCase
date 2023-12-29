const result = await Restaurant.find({
    $and: [
      {
        $or: [
          { branches: { $in: ['fast food', 'ev yemekleri'] } },
          { description: { $regex: /fast/i } },
        ],
      },
      { ratings: { $gte: 4 } },
    ],
  }, { _id: 0, name: 1, branches: 1, description: 1 });
  
  