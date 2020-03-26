const app = require("./app");
const http = require("http");

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, err => {
  if (!!err) console.log(err);
  else console.log("listen on port : " + port);
});