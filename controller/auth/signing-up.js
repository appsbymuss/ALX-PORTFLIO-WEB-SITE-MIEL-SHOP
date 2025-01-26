const { validationResult } = require("express-validator");
const userModel = require("../../model/user.model");
const { generateRandomString } = require("../../utils/misc/string-operations");
const { sendEmailVerification } = require("../../utils/mail/mailer");

async function prepareEmailVerification(id) {
	const verifyToken = generateRandomString(48, false);

	const userUpdated = await userModel.updateUser(id, {
		verify_token: verifyToken
	})

	if (!userUpdated)
		throw Error('Not Updated.');

	const send_status = await sendEmailVerification(userUpdated.email, verifyToken);

	
	if (!send_status)
		throw Error('Verification Email not sent.');

	
	return true;
}

async function signUp(req, res) {
  try {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ error: errors.array() });
	}
	// BUG: Check if user already exists
	const newUser = await userModel.createUser(req.body);
	
	const verificationSendingStatus = await prepareEmailVerification(newUser.id);

	if (!verificationSendingStatus)
		throw Error('Verification Email sending was not successful.');

	return res.status(200).json({"message": "created (Unverified) account with Success !"});
  } catch (error) {
	console.error(error);
	return res.status(500).json({"error": "Internal Server Error"});
  }
}

async function verifyAccount(req, res) {
	try {
		const token = req.query.token;

		if (!token)
			return res.status(403).json({"error": "not authorized to use this resource."});

		const user = await userModel.getUnverifiedUserByToken(token);

		if (!user)
			return res.status(403).json({"error": "No active user has the token you provided"});
		
		const userUpdated = await userModel.updateUser(user.id,{
			verified_at: new Date()
		});

		return res.status(201).json({"message": "Verified account with Success !"});
	} catch (error) {
		console.error(error);
		return res.status(500).json({"error": "Internal Server Error"});
	}
}

module.exports = {
	signUp,
	verifyAccount
}