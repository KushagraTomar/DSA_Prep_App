const http = require("http");
const app = require("./app");

const port = process.env.PORT || 1000;
const server = http.createServer(app)

server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})