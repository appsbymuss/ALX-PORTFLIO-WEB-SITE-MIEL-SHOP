const { PrismaClient } = require('@prisma/client');
const { updateOrder } = require('./order.model');
const prisma = new PrismaClient();

async function applyPayment(payment_data) {

	let formated_data = {
		paymentIntent: payment_data.payment_intent,
		amountTotal: payment_data.amount_total,
		currency: payment_data.currency,
		id_user: parseInt(payment_data.metadata.user_id),
		id_order: parseInt(payment_data.metadata.order_id)
	}
	
	let createdPayment;
	console.log(formated_data);
	
	try {
		createdPayment = await prisma.payment.create({ data: formated_data });
		const modifiedOrder = await updateOrder(formated_data.id_order, {
			status: "payee"
		})
	} finally {
		await prisma.$disconnect();
	}
	return createdPayment;
}

async function getAllPayments(filter, pagination) {
	let payments = [];
	try {
		payments = await prisma.payment.findMany({
			where: filter,
			orderBy: {
				createdAt: "desc"
			},
			...pagination
		});
	} finally {
		await prisma.$disconnect();
	}
	return payments;
}

async function getPaymentsCount(filter) {
  try {
	return await prisma.payment.count({ where: filter });
  } catch (err) {
	return 0;
  }
}

async function getPaymentByOrderId(orderId) {
	let payment;
	try {
		payment = await prisma.payment.findUnique({
			where: {
				order_id: orderId,
			},
		});
	} finally {
		await prisma.$disconnect();
	}
	return payment;
}

async function getPaymentById(paymentId) {
	let payment;
	try {
		payment = await prisma.payment.findUnique({
			where: {
				paymentIntent: paymentId,
			},
		});
	} finally {
		await prisma.$disconnect();
	}
	return payment;
}
module.exports = {
	applyPayment,
	getPaymentByOrderId,
	getPaymentById,
	getAllPayments,
	getPaymentsCount
};