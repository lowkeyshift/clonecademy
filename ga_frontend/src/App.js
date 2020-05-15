import React, {useState} from 'react';
import logo from './logo.svg';
import StripeCheckout from "react-stripe-checkout";

function App() {
const [plan] = useState({
  name: "Course 1",
  id: "cheapCourse",
  price: 10,
  planBy: "edwin",
  coupon: null
});

const makePayment = token => {
  const body = {
    token,
    plan,
    id: "5eae5803459abf5c5c28b48f"
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTllMjA2NjgxZGZmNjNlN2FhMWM3ZiIsImVtYWlsIjoiYWRtaW4rZW1haWxAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTg4NDU4NDM5LCJleHAiOjE1OTEwNTA0Mzl9.AlsTcaOJtJObt0Tvu7hqBjikApRquKWe4WKQXheBzhc"
  }
  return fetch('http://192.168.0.145:3000/api/payment', {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  }).then(res => {
    console.log("RESPONSE",res);
    const {status} = res;
    console.log("STATUS: ", status)
  })
  .catch(err => console.log(err));
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <StripeCheckout
        stripeKey={process.env.REACT_APP_Stripe_Key}
        token={makePayment}
        name="Buy Edwin"
        amount={plan.price * 100}
        > 
        <button className="btn-large pink">
          Buy {plan.name} Today for {plan.price}
        </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
