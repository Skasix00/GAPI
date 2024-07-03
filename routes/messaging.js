const express = require("express");
const { errors } = require("smpp/lib/defs");
const messagingRouter = express.Router();

messagingRouter.post("/send", (req, res) => {
	const url = "https://msg.messaggio.com/api/v1/send";
	fetch(url, {
		method: "GET",
		withCredentials: true,
		headers: {
			"Messagio-Login": process.env.MESSAGIO_API_TOKEN,
			"Content-Type": "application/json",
		},
	})
		.then((resp) => resp.json())
		.then(function (data) {
			console.log(data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = messagingRouter;
