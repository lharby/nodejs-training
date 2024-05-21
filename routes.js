const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter message</title></head>");
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if (req.url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.statusCode = 302;
                    res.setHeader("Location", "/");
                    return res.end();
                }
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Response title</title></head>");
    res.write("<body><p>This is the response, well done</p></body>");
    res.write("</html>");
    res.end();
};

module.exports = requestHandler;