// Socket.IO
const { Server } = require("socket.io");

let io = null;

function initiate(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.HOST,
            credentials: true
        }
    });

    io.on("connection", async (socket) => {
        console.log(socket.handshake.headers.cookie);
        const jwtObj = verifyAccessToken(
            socket.handshake.headers.cookie
            && socket.handshake.headers.cookie.split('=')[1]
        );
        console.log(jwtObj);
        if (jwtObj && jwtObj.role == 'admin')
        {
            await socket.join("admin");
            io.to("admin").emit("message", {"message": "This Works Well, welcome back admin"});
        }
        else
        {
            socket.disconnect(true);
        }
    
        socket.on("disconnecting", () => {
            console.log("SOME GUY LEFT [SOCKET.IO]");
        })
    });
};

module.exports = {
    io,
    initiate
}