const http = require("http");

const server = http.createServer((req, res)=> {
    if (req.url === "/api") {
        res.write("Hello world");
        res.end;
    }
});

server.on("connection", function(socket) {
    console.log("Trigerred");
})


server.listen(65535);

console.log("Listening 65535...");