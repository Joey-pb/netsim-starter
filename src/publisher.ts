import { hostname } from "os";
import dotenv from "dotenv";
import path from "path/win32";

// CONFIGURATION
dotenv.config({ path: path.resolve(__dirname, "../.env") });

function getEnvVariables(key: string) {
  const value = process.env[key];
  if (!value) {
    console.error(`❌ ${key} is not set in the environment variables.`);
    process.exit(1);
  }

  return value;
}

const LISTENER_IP = getEnvVariables("LISTENER_IP");
const LISTENER_PORT = "3000";
const MY_NAME = getEnvVariables("MY_NAME") || "Anonymous";

const url = `ws://${LISTENER_IP}:${LISTENER_PORT}`;

console.log(`🔌 Connecting to NetSim Grid at ${url}...`);

// CONNECTION
const socket = new WebSocket(url);

socket.addEventListener("open", () => {
  console.clear();
  console.log(`✅ LINK ESTABLISHED: ${url}`);
  console.log("-----------------------------------");
  console.log("Type a message and hit ENTER to publish:");
});

// INTERACTIVE LOOP
// Listen for user input from the console
for await (const line of console) {
  const text = line.trim();
  if (!text) continue;

  if (socket.readyState === WebSocket.OPEN) {
    // Construct the payload
    const payload = {
      name: MY_NAME,
      text: text,
      device: hostname(), // Detects OS
    };

    // Send the payload as a JSON string
    socket.send(JSON.stringify(payload));

    // Clear line and reprint formatter
    process.stdout.write("\x1b[1A\x1b[2K"); // Move cursor up and clear line
    console.log(`You > ${text}`);
  } else {
    console.log("⚠️  Connection lost.");
  }
}

// ERROR HANDLING
socket.addEventListener("error", (err) => {
  console.error("❌ Connection Failed. Check the IP address.");
});
