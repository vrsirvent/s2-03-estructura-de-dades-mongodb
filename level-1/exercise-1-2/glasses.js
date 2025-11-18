
// GLASSES CRUD - OpticsBottomBootle

use opticsbottombootle;

// db.glasses.insertOne()
db.glasses.insertMany([
  {
    "_id": "gls00004",
    "brand": "Carreron",
    "graduation": {
      "leftLens": 0.0,
      "rightLens": 0.0
    },
    "frameType": "Metallic",
    "frameColor": "Matte black",
    "lensColor": {
      "leftLens": "Black",
      "rightLens": "Black"
    },
    "price": 175.80,
    "supplierId": "sup00003",
    "stock": 3
  }
]);

db.glasses.find();
db.glasses.findOne({ "_id": "gls00001" });
db.glasses.find({ "brand": "Rayban" });
db.glasses.find({ "frameType": "Metallic" });
db.glasses.find({ 
  "price": { $gte: 100, $lte: 200 } 
});
db.glasses.find().sort({ "price": -1 });
b.glasses.find({}, { "brand": 1, "price": 1, "stock": 1 });

db.glasses.updateOne(
  { "_id": "gls00001" },
  { $set: { "price": 135.00 } }
);

db.glasses.updateOne(
  { "_id": "gls00002" },
  { $set: { "stock": 10 } }
);

db.glasses.updateOne(
  { "_id": "gls00001" },
  { 
    $set: { 
      "graduation.leftLens": 2.55,
      "graduation.rightLens": 2.25
    } 
  }
);

db.glasses.deleteOne({ "_id": "gls00005" });
db.glasses.deleteMany({ "stock": 0 });
db.glasses.deleteMany({ "supplierId": "sup00004" });

db.glasses.countDocuments();
db.glasses.countDocuments({ "brand": "Raybimbon" });

// Calculate total inventory value
db.glasses.aggregate([
  { 
    $project: { 
      totalValue: { $multiply: ["$price", "$stock"] } 
    } 
  },
  { 
    $group: { 
      _id: null, 
      inventoryTotal: { $sum: "$totalValue" } 
    } 
  }
]);

db.glasses.aggregate([
  { $group: { _id: "$frameType", quantity: { $sum: 1 } } },
  { $sort: { quantity: -1 } }
]);

