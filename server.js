http = require('http');
fs = require('fs');
const client = require('discord-rich-presence')('421510081469743114');
const data=require("./data.js")
port = 3000;
host = '127.0.0.1';

var nowPlaying={
  state: '',
  details: '',
  largeImageKey: '',
  smallImageKey: '',
  instance: true,
}

server = http.createServer( function(req, res) {
	if (req.method == 'POST') {
		console.log("Handling POST request...");
		res.writeHead(200, {'Content-Type': 'text/html'});
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
		var bodyParsed=JSON.parse(body)
		var newPlaying={
			details:"",
			state:"",
			instance:true,
			largeImageKey:"",
			smallImageKey:""
		}
		if(bodyParsed.player){
			if(bodyParsed.provider.steamid===bodyParsed.player.steamid){
				//console.log("POST payload: " + body);
				//when you are playing and not spectating
				var newPlaying={
					details: "",
					state: "????",
					instance: true,
				}
				var template=""
				if(bodyParsed.player.team){
					newPlaying.smallImageKey=bodyParsed.player.team.toLowerCase()
					if(bodyParsed.player.team==="T"){
						template="t-c"
					}else if(bodyParsed.player.team==="CT"){
						template="c-t"
					}
				}
				if(bodyParsed.map){
					newPlaying.largeImageKey=bodyParsed.map.name;
					newPlaying.state=data.maps[bodyParsed.map.name] || bodyParsed.map.name;
					if(template){
						newPlaying.details=(data.gamemodes[bodyParsed.map.mode] || bodyParsed.map.mode)+" - Score: "+template.replace("t",bodyParsed.map.team_t.score).replace("c",bodyParsed.map.team_ct.score);
					}else{
						newPlaying.details=data.gamemodes[bodyParsed.map.mode] || bodyParsed.map.mode;
					}
				}else{
					var newPlaying={
						details: "Main Menu",
						state: "what did you expect this to say",
						instance: true,
						largeImageKey: "large"
					}
				}
				}
			}
			if(newPlaying.state!==nowPlaying.state || newPlaying.details!==nowPlaying.details || newPlaying.smallImageKey!==nowPlaying.smallImageKey){
				client.updatePresence(newPlaying);
			}
			res.end( '' );
		});
	}else{
		console.log("Not expecting other request types...");
		res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
		res.end(html);
	}
});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
