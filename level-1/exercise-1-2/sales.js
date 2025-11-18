// SALESS CRUD - OpticsBottomBootle

use opticsbottombootle;

// db.sales.insertOne()
db.sales.insertMany([
  {
    "_id": "sal00004",
    "customerId": "cus00002",
    "employeeId": "emp00002",
    "glassesId": "gls00001",
    "saleDateTime": "2024-04-20T10:15:00Z",
    "salePrice": 127.30,
    "paymentMethod": "Cash"
  },
  {
    "_id": "sal00005",
    "customerId": "cus00001",
    "employeeId": "emp00003",
    "glassesId": "gls00003",
    "saleDateTime": "2024-05-10T14:45:00Z",
    "salePrice": 189.98,
    "paymentMethod": "Transfer"
  }
]);

db.sales.find();
db.sales.findOne({ "_id": "sal00001" });
db.sales.find({ "customerId": "cus00001" });
db.sales.find({ 
  "saleDateTime": { 
    $gte: "2024-01-01T00:00:00Z", 
    $lte: "2025-12-31T23:59:59Z" 
  } 
});
db.sales.find({ "salePrice": { $gt: 150 } });
db.sales.find().sort({ "saleDateTime": -1 });

db.sales.updateOne(
  { "_id": "sal00002" },
  { $set: { "salePrice": 130.00 } }
);
db.sales.deleteOne({ "_id": "sal00005" });
db.sales.deleteMany({ 
  "saleDateTime": { $lt: "2019-01-01T00:00:00Z" } 
});

db.sales.countDocuments();

db.sales.aggregate([
  { $group: { _id: null, totalSales: { $sum: "$salePrice" } } }
]);

db.sales.aggregate([
  { 
    $group: { 
      _id: "$employeeId", 
      totalSold: { $sum: "$salePrice" },
      numberOfSales: { $sum: 1 }
    } 
  },
  { $sort: { totalSold: -1 } }
]);

db.sales.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerData"
    }
  },
  { $unwind: "$customerData" }
]);

db.sales.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  {
    $lookup: {
      from: "employees",
      localField: "employeeId",
      foreignField: "_id",
      as: "employee"
    }
  },
  {
    $lookup: {
      from: "glasses",
      localField: "glassesId",
      foreignField: "_id",
      as: "glasses"
    }
  },
  { $unwind: "$customer" },
  { $unwind: "$employee" },
  { $unwind: "$glasses" },
  {
    $project: {
      _id: 1,
      saleDateTime: 1,
      salePrice: 1,
      paymentMethod: 1,
      "customer.name": 1,
      "customer.email": 1,
      "employee.name": 1,
      "glasses.brand": 1,
      "glasses.frameType": 1
    }
  }
]);
