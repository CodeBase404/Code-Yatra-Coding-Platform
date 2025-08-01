const { createClient } = require("redis");

const rediClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 18381,
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        console.error("Too many Redis retries");
        return new Error("Retry limit reached");
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

rediClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err.message);
});

module.exports = rediClient;