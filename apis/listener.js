'use strict'

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

var dbString = "localhost:27017/fission";
const db = require("monk")(dbString);

const todo = db.get("fission_todo");
const port = 9008;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

var clients = []
var orgC = []
io.on("connection", socket => {
  console.log("New client connected " + socket.id);
  var childId,parentId;
  socket.on("initial_connect", (res) => {
	clients.push({socketId:socket.id,adminId:res.adminId})

	orgC = clients.filter(a=>{
		if(io.sockets.sockets[a.socketId]!=undefined){
			return true;
		} 
	})

	// console.log(clients,clients.length,"clients")
	// console.log(orgC,orgC.length,"orgC")
    childId = res.childId;
    parentId = res.parentId;
	// console.log(res,"resp")
	if (res.admin === "yes" && res.parentId === 0) {
		todo.aggregate([{
			$lookup: {
				from: "fission_user", 
				localField: "userId",
				foreignField: "id",
				as: "inDet",
			}
		}]).then( (students) =>{
			let std = students.filter(st=>{
				if (st.viewed === "no") {
					if (st.inDet.length > 0) {
						if(st.inDet[0].by === childId) {
							return true
						}
					}
				}
			})
			if (std.length > 0) {
				io.sockets.emit("todo_action", std);
			}
		});
	} else if (res.admin === "no" && res.parentId !== 0) {
		if (orgC.length > 0) {
			
			// io.sockets.emit("todo_add", {data:"virat 18"})
			todo.aggregate([{
				$lookup: {
					from: "fission_user", 
					localField: "userId",
					foreignField: "id",
					as: "inDet",
				}
			}]).then( (students) =>{
				let std = students.filter(st=>{
					if (st.viewed === "no") {
						if (st.inDet.length > 0) {
							if(st.inDet[0].by === parentId) {
								return true
							}
						}
					}
				})
				if (std.length > 0) {
					orgC.map(respC=>{
						if (respC.adminId === res.adminId) {
							io.to(respC.socketId).emit("todo_add", std);
						}
					})
				} else {
					console.log("no notifications found")
				}
			});	
		}
	}
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static("build"));
app.use("/kitchen", express.static("build"));
app.use("/updatepredicted", express.static("build"));
server.listen(port, () => console.log(`Listening on port ${port}`));
