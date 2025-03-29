import "dotenv/config";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

// Command data for message context menu commands
const commands = [
  {
    name: "Answer Message", // This is what users will see in the context menu
    type: 3, // 3 = MESSAGE command type (for right-click context menu on messages)
    integration_types: [1], // 1 = USER_INSTALL (making this a user-installable command)
    contexts: [0, 1, 2], // GUILD (0), BOT_DM (1), and PRIVATE_CHANNEL (2)
  },
  {
    name: "Tag - Not Found", // Second command
    type: 3, // 3 = MESSAGE command type
    integration_types: [1], // 1 = USER_INSTALL
    contexts: [0, 1, 2], // GUILD (0), BOT_DM (1), and PRIVATE_CHANNEL (2)
  },
];

// Register each command
for (const command of commands) {
  const response = await fetch(
    `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    },
  );

  if (!response.ok) {
    const data = await response.json();
    console.error(`Error registering command "${command.name}":`, data);
    throw new Error(`Failed to register command "${command.name}"`);
  }

  const data = await response.json();
  console.log(`Successfully registered command "${command.name}":`, data);
}
