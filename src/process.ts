process.on("uncaughtException", (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);
});
