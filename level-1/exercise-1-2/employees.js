
// EMPLOYEES CRUD - OpticsBottomBootle

use opticsbottombootle;

db.employees.insertMany([
 {
    "_id": "emp00003",
    "name": "Libertad Mogollón",
    "phone": "654321987",
    "email": "libertadV@dominio.com",
    "position": "SalesPerson",
    "hireDate": "2024-03-18"
  },
  {
    "_id": "emp00004",
    "name": "Carmen Marciana Verde",
    "phone": "600440022",
    "email": "carmenm@dominio.com",
    "position": "Secretary",
    "hireDate": "2024-07-24"
  }
]);
// db.suppliers.insertOne - To create only one

db.employees.find();
db.employees.findOne({ "_id": "emp00001" });
db.employees.find({ "name": { $regex: "Rosa", $options: "i" } });
db.employees.find({ "position": "SalesPerson" });
db.employees.findOne({ "email": "pedrop@dominio.com" });
db.employees.find({ "hireDate": { $gte: "2020-01-01" } });
db.employees.find().sort({ "hireDate": 1 });
db.employees.find({}, { "name": 1, "position": 1 });

db.employees.updateOne(
  { "_id": "emp00001" },
  { $set: { "phone": "651111111" } }
);

db.employees.updateOne(
  { "_id": "emp00002" },
  { 
    $set: { 
      "phone": "677999888",
      "position": "Director"
    } 
  }
);

db.employees.deleteOne({ "_id": "emp00004" });
db.employees.deleteMany({ "position": "Director" });

db.employees.countDocuments();
db.employees.countDocuments({ "position": "SalesPerson" });

db.employees.aggregate([
  { $group: { _id: "$position", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

db.employees.aggregate([
  {
    $lookup: {
      from: "sales",
      localField: "_id",
      foreignField: "employeeId",
      as: "salesMade"
    }
  },
  {
    $project: {
      name: 1,
      position: 1,
      numberOfSales: { $size: "$salesMade" }
    }
  },
  { $sort: { numberOfSales: -1 } }
]);


