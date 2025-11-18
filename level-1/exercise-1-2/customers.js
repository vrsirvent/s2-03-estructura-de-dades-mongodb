// CUSTOMERS CRUD - OpticsBottomBootle

use opticsbottombootle;

db.customers.insertOne({
  "_id": "cus00004",
  "name": "Laura Torres Medianas",
  "address": {
    "street": "Vía Avenue",
    "number": "234",
    "city": "Sabadell",
    "postalCode": "08205",
    "country": "Spain"
  },
  "phone": "686868555",
  "email": "laurat@dominio.com",
  "registrationDate": "2024-02-15",
  // "recommendedBy": null
  "recommendedBy": "cus00001"
});

db.customers.find();
db.customers.findOne({ "_id": "cus00001" });
db.customers.find({ "name": { $regex: "Juan", $options: "i" } });
db.customers.find({ "recommendedBy": { $ne: null } });
db.customers.find({ "recommendedBy": "cus00001" });
db.customers.find({ "registrationDate": { $gte: "2023-01-01" } });
db.customers.find().sort({ "registrationDate": -1 });
db.customers.find({}, { "name": 1, "email": 1 });

db.customers.updateOne(
  { "_id": "cus00001" },
  { 
    $set: { 
      "address.street": "Left Street",
      "address.number": "678"
    } 
  }
);

db.customers.updateOne(
  { "_id": "cus00004" },
  { $set: { "recommendedBy": "cus00002" } }
);

db.customers.deleteOne({ "_id": "cus00004" });
db.customers.deleteMany({ "address.city": "Sabadell" });

db.customers.countDocuments();
db.customers.countDocuments({ "recommendedBy": { $ne: null } });

db.customers.find().sort({ "registrationDate": -1 });
db.customers.find({}, { "name": 1, "email": 1 });

db.customers.aggregate([
  { $match: { "recommendedBy": { $ne: null } } },
  { $group: { _id: "$recommendedBy", totalRecommended: { $sum: 1 } } },
  { $sort: { totalRecommended: -1 } }
]);
