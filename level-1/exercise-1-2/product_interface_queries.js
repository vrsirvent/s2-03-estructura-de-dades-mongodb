
// PRODUCTS INTERFACE - OpticsBottomBootle

use opticsbottombootle;

db.glasses.find({ "brand": "Raybimbon" });
db.glasses.find({ "frameType": "Metallic" });
db.glasses.find({
  "graduation.leftLens": { $gte: 2.0, $lte: 2.5 },
  "graduation.rightLens": { $gte: 1.75, $lte: 2.25 },
  "stock": { $gt: 0 }
});


db.glasses.aggregate([
  { $group: { _id: "$brand", quantity: { $sum: 1 } } },
  { $sort: { quantity: -1 } }
]);
db.glasses.aggregate([
  { $group: { _id: "$frameType", quantity: { $sum: 1 } } },
  { $sort: { quantity: -1 } }
]);

// Search by supplier
db.glasses.aggregate([
  {
    $lookup: {
      from: "suppliers",
      localField: "supplierId",
      foreignField: "_id",
      as: "supplier"
    }
  },
  { $unwind: "$supplier" },
  { $match: { "supplier.name": { $regex: "Raybimbon Ltd.", $options: "i" } } },
  {
    $project: {
      brand: 1,
      price: 1,
      frameType: 1,
      stock: 1,
      "supplier.name": 1,
      "supplier.phone": 1
    }
  }
]);

db.glasses.find({ 
  "price": { $gte: 95, $lte: 300 } 
}).sort({ "price": 1 });

// Combined search
db.glasses.aggregate([
  {
    $match: {
      "brand": "Raybimbon",
      "frameType": "Metallic",
      "price": { $lte: 150 }
    }
  },
  {
    $lookup: {
      from: "suppliers",
      localField: "supplierId",
      foreignField: "_id",
      as: "supplier"
    }
  },
  { $unwind: "$supplier" },
  {
    $match: {
      "supplier.name": { $regex: "Raybimbon Ltd.", $options: "i" }
    }
  },
  {
    $project: {
      brand: 1,
      graduation: 1,
      frameType: 1,
      frameColor: 1,
      price: 1,
      stock: 1,
      "supplier.name": 1,
      "supplier.phone": 1,
      "supplier.address": 1
    }
  }
]);

// Count customers by product
db.sales.aggregate([
  {
    $group: {
      _id: "$glassesId",
      numberOfCustomers: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "glasses",
      localField: "_id",
      foreignField: "_id",
      as: "glasses"
    }
  },
  { $unwind: "$glasses" },
  {
    $project: {
      brand: "$glasses.brand",
      price: "$glasses.price",
      numberOfCustomers: 1
    }
  },
  { $sort: { numberOfCustomers: -1 } }
]);

db.glasses.aggregate([
  { $match: { "_id": "gls00001" } },
  {
    $lookup: {
      from: "suppliers",
      localField: "supplierId",
      foreignField: "_id",
      as: "supplier"
    }
  },
  { $unwind: "$supplier" },
  {
    $project: {
      brand: 1,
      price: 1,
      "supplier": 1
    }
  }
]);

