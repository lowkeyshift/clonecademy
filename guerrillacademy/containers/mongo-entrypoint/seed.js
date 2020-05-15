// DEMO USER DATA
db = db.getSiblingDB('gurillaMain')
db.users.insertMany([
    { "_id" : ObjectId("5de9e206681dff63e7aa1c7f"),
    "email" : "admin+email@gmail.com",
    "userName": "admin1234",
    "emailVerified" : true, 
    "isTokenValid" : true,
    "passwordHash" : "$2b$10$eZvLjhmAjuWyZK6tnMbmROeRLOMHwYwN0Mkr1VOBepPKFrTN2uzpW",
    "firstName": "Admin",
    "lastName": "Demo",
    "subscription": ObjectId("5de9e206681dff63e9cc2e9h"),
    "role" : "Admin",
    "stripeCustomerId": "ST.*uawnf89&Ygr098Y90*Gy(guJpkje",
    "billingAddr": {
        "companyName": null,
        "addressLine1": "123 Safe St",
        "addressLine2": null,
        "addressCity": "Revere",
        "addressZip": "02151",
        "addressCountry": "USA",
        "addressState": "MA",
        "phone": "555-555-4562"
      },    
    "__v" : 0, 
    "_email_verify_token" : "820128dcfb618f041fcd40e41ef1f3d0d4074b78450e71c2c7292a4cd735d880" },
    { "_id" : ObjectId("5de9e206681dff63e7aa2d8u"),
    "email" : "student+email@gmail.com",
    "userName": "student1234",
    "emailVerified" : true, 
    "isTokenValid" : true,
    "passwordHash" : "$2b$10$eZvLjhmAjuWyZK6tnMbmROeRLOMHwYwN0Mkr1VOBepPKFrTN2uzpW",
    "firstName": "student",
    "lastName": "Demo",
    "subscription": null,
    "role" : "Student",
    "stripeCustomerId": "ST.*uawnf89&Ygr098kjhgB*&^(UBHi87y",
    "billingAddr": {
        "companyName": null,
        "addressLine1": "123 Safe St",
        "addressLine2": null,
        "addressCity": "Revere",
        "addressZip": "02151",
        "addressCountry": "USA",
        "addressState": "MA",
        "phone": "555-555-4562"
      },    
    "__v" : 0, 
    "_email_verify_token" : "820128dcfb618f041fcd40e41ef1f3d0d4074b78450e71c2c7292a4cd735d880" },
{ "_id" : ObjectId("5eae576b459abf5c5c28b48c"),
  "email": "instructor+email@gmail.com",
  "userName": "instructor1234",
  "emailVerified": true,
  "isTokenValid": true,
  "passwordHash": "$2b$10$eZvLjhmAjuWyZK6tnMbmROeRLOMHwYwN0Mkr1VOBepPKFrTN2uzpW",
  "firstName": "instructor",
  "lastName": "Demo",
  "subscription": "5de9e206681dff63e9cc2e9h",
  "role": "Instructor",
  "stripeCustomerId": null,
  "billingAddr": {
      "companyName": null,
      "addressLine1": "123 Safe St",
      "addressLine2": null,
      "addressCity": "Revere",
      "addressZip": "02151",
      "addressCountry": "USA",
      "addressState": "MA",
      "phone": "555-555-4562"
  },
  "__v": {
      "$numberInt": "0"
  },
  "_email_verify_token": "820128dcfb618f041fcd40e41ef1f3d0d4074b78450e71c2c7292a4cd735d880"
}
]);
// db.subscriptions.insertMany([
//     { "_id" : ObjectId("5de9e206681dff63e9cc2e9h"),
//     "userId": ObjectId("5de9e206681dff63e7aa1c7f"),
//     "subscription": {
//     "tier":"Admin",
//     "recuring": "yearly",
//     "status": "active" 
//     }
//   }
// ]);
// db.enrolledCourses.insertMany([
//     { "_id" : ObjectId("5de9e206681dff63e9cc2e9h"),
//     "userId": ObjectId("5de9e206681dff63e7aa1c7f"),
//     "subId" : ObjectId("5de9e206681dff63e9cc2e9h"),
//     "subscription": {
//     "tier":"Admin",
//     "recuring": "yearly",
//     "status": "active" 
//     }
//   }
// ]);