function keepAlive() {
    setTimeout(keepAlive, 24 * 60 * 60 * 1000); // Keep running every 24 hours
    console.log("ping!")
  }
  
  keepAlive();
  