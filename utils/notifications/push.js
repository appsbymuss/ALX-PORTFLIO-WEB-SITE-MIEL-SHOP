var webPush = require("web-push");

let subscribers = [];

// To Generate new VAPID Public-Private Key pair:
// console.log(webPush.generateVAPIDKeys());

// let vapidKeys = {
//     publicKey: process.env.PUSH_PUBLIC_KEY,
//     privateKey: process.env.PUSH_PRIVATE_KEY
// };

// webPush.setVapidDetails(
//     `mailto:${process.env.PRIMARY_EMAIL}`,
//     vapidKeys.publicKey,
//     vapidKeys.privateKey
// );

function setNewAdminSubscription(sub) {
    subscribers.push(sub);
    console.log("new subscription")
}

function sendAdminsNotification(message=null) {
    for (let adminSub of subscribers)
        webPush.sendNotification(adminSub, "Test");
}

module.exports = {
    setNewAdminSubscription,
    sendAdminsNotification
}