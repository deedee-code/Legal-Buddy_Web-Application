const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

function sendMessage() {
	const userMessage = userInput.value.trim();
	if (userMessage === "") {
		return;
	}

	addMessage("User: " + userMessage);
	userInput.value = "";

	setTimeout(() => processUserMessage(userMessage), 1000);
}

function addMessage(message) {
	const messageElem = document.createElement("div");
	messageElem.classList.add("message");
	messageElem.textContent = message;
	chatbox.appendChild(messageElem);
}

function processUserMessage(message) {
	if (
		message.toLowerCase().includes("abuse") ||
		message.toLowerCase().includes("rape") ||
		message.toLowerCase().includes("divorce")
	) {
		addMessage(
			"AI Chatbot: How can I assist you today? Are you looking for a lawyer to 'draft agreements' or handle a 'legal matter'?"
		);
	} else if (message.toLowerCase().includes("draft agreement")) {
		addMessage(
			"AI Chatbot: Great! I can help with that. To better assist you, could you please provide me with some details about the agreement you need?"
		);
	} else if (message.toLowerCase().includes("legal matter")) {
		addMessage(
			"AI Chatbot: Perfect! I'll match you with lawyers in your location who can help with legal matters. Please hold on for a moment while I find the best matches for you."
		);
		// Simulate processing and presenting lawyer list...
		setTimeout(() => {
			addMessage(
				`AI Chatbot: Here are some lawyers in your location who specialize in legal matters as regards the matter you request for:  
				Yaseerah Umar,
				Joseph Daniel,
				Abdulaziz Bello Pyawu,
				Ayomide Micheal,
				Alex Iwobi
				You can review their profiles and choose the one that suits you best. If you have any questions or need further assistance, feel free to ask.`
			);
		}, 2000);
	} else if (message.toLowerCase().includes("abused at work")) {
		addMessage(
			"AI Chatbot: I'm really sorry to hear that you're going through this. Your well-being is essential to us. We have lawyers who handle pro bono cases for individuals facing such issues. I'll match you with them so they can provide you with the necessary support. Please give me a moment."
		);
		// Simulate processing and presenting pro bono lawyer list...
		setTimeout(() => {
			addMessage(
				`AI Chatbot: Here are some lawyers who specialize in pro bono cases related to workplace abuse:
				Yaseerah Umar,
				Joseph Daniel,
				Abdulaziz Bello Pyawu,
				Ayomide Micheal,
				Alex Iwobi,
				They can assist you further. Take your time to review their profiles, and if you have any questions, feel free to ask.`
			);
		}, 2000);
	} else {
		addMessage(
			"AI Chatbot: I'm sorry, but I'm not able to assist with that specific issue. Can I help you with anything else?"
		);
	}
}
