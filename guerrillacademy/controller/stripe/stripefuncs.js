require('dotenv').config();
const { STRIPE_SECRET } =  process.env;
const stripe         = require('stripe')(STRIPE_SECRET);
const { v4: uuidv4 } = require('uuid');


module.exports = {
    oneTimeCharge: function oneTimeCharge(product, customer, key){
        const charge = async function(product, customer, key) {
          await stripe.charges.create({
              amount: product.price * 100,
              currency: 'usd',
              customer: customer.stripeCustomerId,
              receipt_email: token.email,
              description: `Purchase of ${product.name}`
            }, {idempotency_key: key})
            .then(result => {
                res.status(200).json(result)
              })
            .catch(err => console.log(err))
          }
        return charge(product, customer, key)

    },
    subscribeUser: function subscribeUser(plan, customer){
      // Subscribe the customer to the plan while applying a coupon.
      const subscription = async function(plan, customer) {
        if(plan.coupon == null){
          await stripe.subscriptions.create({
            customer: customer.stripeCustomerId,
            plan: plan.id
          })
          .then(result => {
            res.status(200).json(result)
          })
        .catch(err => console.log(err))
        } else {
            await stripe.subscriptions.create({
              customer: customer.stripeCustomerId,
              plan: plan.id,
              coupon: plan.coupon
            })
            .then(result => {
              res.status(200).json(result)
            })
          .catch(err => console.log(err))
        }
      }
      return subscription(plan, customer)
    },
    subscriptionPlans: function subscriptionPlans(newPlan){
      // Create a monthly plan.
      const plan = async function(newPlan) {
          await stripe.plans.create({
          amount: newPlan.amount,
          currency: newPlan.currency,
          interval: newPlan.interval,
          product: {
            name: newPlan.name,
          }
        })
      };
      return plan(newPlan)
    },
    retrieveSubscription: function retrieveSubscription(token){
      const plan = async function(token) {
        await stripe.subscriptions.retrieve(token.subId);
      }
      return plan(token)
    },
    updateSubscription: function updateSubscription(token){
      const plan = async function(token) {
        await stripe.subscriptions.update(
        token.subId,
        {metadata: {order_id: token.order_id}})
      }
      return plan(token)
    },
    cancelSubscription: function cancelSubscription(token){
      const plan = async function(token) {
        await stripe.subscriptions.del(token.subId);
      }
      return plan(token)
    },
    createCustomer: function createCustomer(token){
        const customer = async function(token) {
            await stripe.customers.create({
                email: token.email,
                source: token.id
              })
        };
        return customer(token)
    },
    refund: function refund(token){
      const refund = async function(token) {
        await stripe.refunds.create(
          {charge: token.chargeId}
        );
    };
    return refund(token)
    }
};