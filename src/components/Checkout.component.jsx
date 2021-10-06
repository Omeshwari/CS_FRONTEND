import React from "react";

import StripeButton from './stripebutton.component';

const Checkout = () => {
    return(
        <div>
            <div className="total"> Total : Rs. 200</div>
            <StripeButton price = "200"/>
        </div>
    );
};

export default Checkout;