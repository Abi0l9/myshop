const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const config = require("./src/utils/config");

const PORT = config.PORT

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
