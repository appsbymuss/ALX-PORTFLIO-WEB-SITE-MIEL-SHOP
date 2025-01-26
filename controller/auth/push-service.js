const pushUtil = require("../../utils/notifications/push")

function handlePushSubscription(req, res) {
    try {
        pushUtil.setNewAdminSubscription(req.body);
    } catch (err) {
        return res.status(500).json({"message": `Problem: ${err}`});
    }
    return res.sendStatus(201);
}

function initiatePushNotification(req, res) {
    try {
        pushUtil.sendAdminsNotification(null);
    } catch (err) {
        return res.status(500).json({"message": `Problem: ${err}`});
    }
    return res.sendStatus(200);
}

module.exports = {
    handlePushSubscription,
    initiatePushNotification
}