console.log("\n=============================================");
console.log("      📡 NETSIM MASTER NODE LISTENING       ");
console.log("=============================================\n");

Bun.serve({
  port: 3000,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response("NetSim Uplink Active");
  },
  websocket: {
    message(ws, message) {
      try {
        const data = JSON.parse(message.toString());
        const time = new Date().toLocaleDateString();
        console.log(
          `[${time}] \x1b[36m${data.name}\x1b[0m (${data.device}): ${data.text}`,
        );
      } catch (e) {
        console.log(`[UNKNOWN DATA] ${message}`);
      }
    },
  },
});

console.log(`Waiting for signals on Port 3000...`);
