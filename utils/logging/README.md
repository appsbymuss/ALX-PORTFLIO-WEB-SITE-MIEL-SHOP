[AUTH]:
signup - Sign Up
        - NO INFO
signin - Login (optional [because repititve])
    - NO INFO
oauth2-signin - OAuth2: Google:: login (optional [because repititve])
    - NO INFO
oauth2-signup - OAuth2: Google:: Sign Up
    - NO INFO
verify - Verified Account
    - Show ID of verified Account
[STCK]:
stock-low    - Running low
        - Show Id of product
        - Show Name of product
        - Show current Count
stock-change    - Stock change (Increase/Decrease)
        - Show Id of product
        - Show an increase/decrease (symbol)
        - Show current Count
[PYMT]:
payment-creation    - Creation of Checkout
        - order ID
payment-success    - Payement Success
        - for what order ID
        - show payment Intent (id)
        - show total paid
[ORDR]:
order-creation    - Creation of Order: optional
        - Order ID
order-paid    - Paid
        - Order ID
order-validated    - Validated
        - Order ID
[DLVR]:
delivery-initiated    - Initiated
        - Show OrderID
        - Show Country Code
        - Show Type (Relay or Domicile)
[UPLD]:
file-upload    - Uploaded: optional
        - NO INFO
[INVC]:
invoice-generation    - Generated
        - Show ID of PDF Generation
[E-ML]:
email-verifcation    - Sent EmailVerification
        - NO INFO
email-orderconfirm    - Send OrderConfirmation
        - Order ID