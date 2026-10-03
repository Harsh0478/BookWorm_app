import cron from "cron";
import https from "https";
import "dotenv/config";

const job = new cron.CronJob("*/14 * * * *", () => {
  if (!process.env.API_URL) return;

  https
    .get(process.env.API_URL, (res) => {
      console.log(`Keep-alive request: ${res.statusCode}`);
      res.resume();
    })
    .on("error", (error) => {
      console.error("Keep-alive request failed:", error.message);
    });
});

export default job;