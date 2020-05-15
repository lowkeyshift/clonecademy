'use strict';

const crud        = require('../../models/crud'),
      userSchema  = require('../../schemas/user'),
      mongoose     = require('mongoose');

const stripeFunc    = require('./stripefuncs');


let validateRequest = (req, res, next) => {
    if (!req.decode.userId) {
        return res.status(400).send('No User id provided');
    }
    next();
};

let stripe_customer = (req, res, next) => {
  req.data = {};
  let conditions = [
    {
    $match: { _id: mongoose.Types.ObjectId(req.body.id)}
    },
    {
        $project: {
          _id: 0,
          stripeCustomerId: 1

        }
    }
];

  userSchema.aggregate(conditions, (err, stripeCustomerId) => {
      if (err) { return res.status(500).send(err); } 
      if (stripeCustomerId){ //=== null || !stripeCustomerId) {
        stripeFunc.createCustomer(req.body.token) //turn back to const data = and then await data to extract results
        .then(result => {
          let update = {
            $set: {
              stripeCustomerId: result
            }
          }
          req.data.customer = result;
          console.log("########################################",result, req.data.customer)
          res.status(200).json({results: result})
          // userSchema.update(conditions, update,(err, results) => {
          //   if (err) {
          //     return res.status(500).json({ message: 'Failed to update user' });
          //   } else if (results) {
          //     console.log("########################################",result, req.data.customer)
          //     next()
          //   } else {
          //     return res.status(404).json({ message: 'Cannot find user to update StripeId' });
          //   }
          // });
        })
        .catch(err => console.log(err));
        } else {
          req.data.customer = stripeCustomerId;
          console.log("########################################",req.data.customer)
          //next()
        }
    });
};

let subscribeCustomer = (req, res) => {

  const {plan} = req.body;
  const {customer} = req.data;
  console.log("########################################");
  console.log("#########Create Customer ERROR#########",req.data.customer);
  console.log("########################################");

  try {
      stripeFunc.subscribeUser(plan, customer)
      .then(result => {
        if (result.raw.headers.statusCode == 400){
          return res.status(404).json({ message: 'Cannot find user to update StripeId' });
        }
        res.status(200).json(result)
      })
    .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }

};

// let stripe_charge = (req, res, next) => {
//   const {product} = req.body;
//   const {customer} = req.data;
//   console.log("PRODUCT", product);
//   console.log("PRICE", product.price);
//   const idempontencyKey = uuidv4();

// try {
//     return stripeFunc.oneTimeCharge(product, customer, idempontencyKey);
//   } catch (err) {
//     console.log(err)
//   }
// };
//use the below update code once jwtTokens are built into React Frontend
// let updateUser = (req, res) => {
//     var filter = {_id: req.decoded.id};
//     var update = {
//         $set:
//         {
//             stripeCustomerId: req.body.pg_sId,
//             dateUpdated: Date_stamp
//         }
//     };
//     let options = {useFindAndModify: false, upsert: true, new: true, setDefaultsOnInsert: true};

//   crud.findOneAndUpdate(filter, update, options, userSchema, (error, updated) => {
//       if (error) {
//         return res.status(500).json({
//           message: 'Something went wrong.', error
//         });
//       }
//       if (updated) {
//         return res.status(200).json();
//       } else {
//         return res.status(500).json({ message: 'Failed to update user' });
//       }
//     });
// };


module.exports = [
    //validateRequest,
    stripe_customer,
    //subscribeCustomer
];
