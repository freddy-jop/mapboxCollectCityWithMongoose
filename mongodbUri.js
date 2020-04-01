const URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@serverreact-6mukc.mongodb.net/city?retryWrites=true&w=majority`;

module.exports = {
	URI
}