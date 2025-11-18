
// SUPPLIERS CRUD - OpticsBottomBootle

use opticsbottombootle;
y
db.suppliers.insertOne({
  "_id": "sup00003",
  "name": "Polar Visio",
  "address": {
    "street": "Main Street",
    "number": "47",
    "floor": "1",
    "door": null,
    "city": "Bristol",
    "postalCode": "44-6001",
    "country": "Great Britain"
  },
  "phone": "943456789",
  "fax": null,
  "taxId": "L1122C23-GB"
});
// db.suppliers.insertMany - To create multiple

db.suppliers.find();
db.suppliers.findOne({ "_id": "sup00002" });
db.suppliers.find({ "address.city": "Barcelona" });
db.suppliers.find({ "name": { $regex: "Raybimbon", $options: "i" } });
db.suppliers.find({}, { "name": 1, "phone": 1 });
db.suppliers.find().sort({ "name": 1 });
db.suppliers.find({ "address.country": "Holand" });

db.suppliers.countDocuments();
 
db.suppliers.updateOne(
  { "_id": "sup00001" },
  { $set: { "phone": "923333222" } }
);

db.suppliers.updateOne(
  { "_id": "sup00002" },
  { 
    $set: { 
      "address.street": "Rivers of Babylon",
      "address.number": "1504"
    } 
  }
);


db.suppliers.deleteOne({ "_id": "sup00003" });
db.suppliers.deleteMany({ "address.city": "Bristol" });

