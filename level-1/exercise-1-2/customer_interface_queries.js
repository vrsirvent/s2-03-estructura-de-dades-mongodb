
// CUSTOMERS INTERFACE - OpticsBottomBootle

use opticsbottombootle;

db.sales.aggregate([
  { $match: { "customerId": "cus00001" } },
  {
    $lookup: {
      from: "glasses",
      localField: "glassesId",
      foreignField: "_id",
      as: "glasses"
    }
  },
  { $unwind: "$glasses" },
  {
    $project: {
      _id: 0,
      brand: "$glasses.brand",
      leftGraduation: "$glasses.graduation.leftLens",
      rightGraduation: "$glasses.graduation.rightLens",
      leftLensColor: "$glasses.lensColor.leftLens",
      rightLensColor: "$glasses.lensColor.rightLens",
      frameType: "$glasses.frameType",
      price: "$salePrice",
      purchaseDate: "$saleDateTime"
    }
  }
]);


db.glasses.findOne({ 
  "_id": "gls00001",
  "stock": { $gt: 0 }
});
db.glasses.updateOne(
  { "_id": "gls00001" },
  { $inc: { "stock": -1 } }
);
db.sales.insertOne({
  "_id": "sal00010",
  "customerId": "cus00001",
  "employeeId": "emp00001",
  "glassesId": "gls00001",
  "saleDateTime": new Date().toISOString(),
  "salePrice": 127.0,
  "paymentMethod": "Card"
});


db.customers.aggregate([
  { $match: { "_id": "cus00001" } },
  {
    $lookup: {
      from: "customers",
      localField: "recommendedBy",
      foreignField: "_id",
      as: "recommenderCustomer"
    }
  },
  {
    $lookup: {
      from: "sales",
      localField: "_id",
      foreignField: "customerId",
      as: "purchaseHistory"
    }
  },
  {
    $project: {
      name: 1,
      address: 1,
      phone: 1,
      email: 1,
      registrationDate: 1,
      recommendedBy: { 
        $arrayElemAt: ["$recommenderCustomer.name", 0] 
      },
      totalPurchases: { $size: "$purchaseHistory" },
      totalSpent: { $sum: "$purchaseHistory.salePrice" }
    }
  }
]);


db.sales.aggregate([
  { $match: { "customerId": "cus00001" } },
  {
    $group: {
      _id: "$customerId",
      totalPurchases: { $sum: 1 },
      totalSpent: { $sum: "$salePrice" },
      averageSpent: { $avg: "$salePrice" },
      firstPurchase: { $min: "$saleDateTime" },
      lastPurchase: { $max: "$saleDateTime" }
    }
  }
]);

