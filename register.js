import "dotenv/config";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

// Command data for a message context menu command
const command = {
  name: "Answer Message", // This is what users will see in the context menu
  type: 3, // 3 = MESSAGE command type (for right-click context menu on messages)
  integration_types: [1], // 1 = USER_INSTALL (making this a user-installable command)
  contexts: [0, 1, 2], // GUILD (0), BOT_DM (1), and PRIVATE_CHANNEL (2)
};

// Register as a global command
const response = await fetch(
  `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`,
  {
    method: "POST",
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  }
);

if (!response.ok) {
  const data = await response.json();
  console.error("Error registering command:", data);
  throw new Error("Failed to register command");
}

const data = await response.json();
console.log("Successfully registered command:", data);
