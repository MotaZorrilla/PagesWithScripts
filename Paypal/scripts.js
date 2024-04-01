paypal.Buttons({
    style: {
        shape: 'pill',
        color: 'silver',
        layout: 'vertical',
        label: 'subscribe'
    },
    createSubscription: function(data, actions) {
        return actions.subscription.create({
        /* Creates the subscription */
        plan_id: 'P-2L197743JX1605925MXJHDZQ'
        });
    },
    onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
    }
}).render('#paypal-button-container-P-2L197743JX1605925MXJHDZQ'); // Renders the PayPal button