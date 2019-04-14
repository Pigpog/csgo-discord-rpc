# csgo-discord-rpc
Discord rich presence for Counter Strike Global Offensive

(based on [this code sample from Valve](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration#Sample_HTTP_POST_Endpoint_Server))

## Setup

1. [Install node if you havent already](nodejs.org)

2. Run `npm install --silent` in the project directory

3. Copy `gamestate_integration_rpc.cfg` file to `steamapps/common/Counter-Strike Global Offensive/csgo/cfg/`

4. Run `node server.js` in the project directory

5. Launch the game and the rich presence will start when you reach the main menu
