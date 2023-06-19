const mineflayer = require("mineflayer");
var Vec3 = require("vec3").Vec3;
const webInventory = require("mineflayer-web-inventory");
const express = require("express");
const readline = require("readline");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const minecraftData = require("minecraft-data")("1.8"); // Replace with the correct version
const { navigatePlugin } = require("mineflayer-navigate");

// /is visit LemonNoob12322
// /is visit TheSmartyBee

// selling shop - /is visit _Ganker_

// Define color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

const bot = mineflayer.createBot({
  host: "Play.JartexNetwork.com",
  port: 25565,
  username: "MinecraftMinion",
  version: 1.8,
});

bot.once("login", () => {
  console.log("Successfully logged in");
  setTimeout(() => {
    bot.chat("/login Nivi@c103");
    console.log(
      colors.green + "Password written in chat for login" + colors.reset
    );
  }, 3000);
});

//moving hand to emply slot
// bot.once("spawn", () => {
//   setTimeout(() => {
//
//   }, 500);
// });

// Helper function to move to a specific slot in the hotbar
// function moveToHotbarSlot(slot) {
//   // Ensure the slot index is within the valid range
//   if (slot >= 0 && slot <= 8) {
//     bot.setQuickBarSlot(slot);
//   } else {
//     console.error(
//       "Invalid slot index. Please provide a value between 0 and 8."
//     );
//   }
// }

let partialPackets = {};

bot.on("packet", (packet, meta) => {
  if (meta.name === "sound_effect") {
    const packetId = meta.state + "." + meta.name;
    if (meta.buffer) {
      if (partialPackets[packetId]) {
        partialPackets[packetId] = Buffer.concat([
          partialPackets[packetId],
          meta.buffer,
        ]);
      } else {
        partialPackets[packetId] = meta.buffer;
      }
      if (partialPackets[packetId].length >= meta.size) {
        packet = partialPackets[packetId];
        delete partialPackets[packetId];
      } else {
        return;
      }
    }
  }

  // Process the packet normally
  // ...
});

// bot.on("chat", (username, message) => {
//   console.log(`${username}: ${message}`);
// });

// //bot.loadPlugin(navigatePlugin);
// const playerX = -9.492;
// const playerY = 86.18750;
// const playerZ = -50.700;

// var v1 = new Vec3(-90.5, +40.1, 3);

// const targetBlock = new Vec3(-9, 87, -51);
// // Change these coordinates as needed

// // bot moving to the lobby location to skyblock
// // bot.once("spawn", () => {
// //   setTimeout(() => {
// //     const defaultMove = new Movements(bot);
// //     // const targetPosition = { x: 10, y: 64, z: 10 };
// //     bot.pathfinder.setMovements(defaultMove);
// //     bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ));
// //     setTimeout(() => {
// //       console.log("Please console log in after 20 secconds");
// //       console.log(`Bot position: ${bot.entity.position}`);
// //       bot.activateItem(false);
// //     }, 15000);
// //   }, 10000); // Delay in milliseconds (10 seconds)
// // });

// // Making the bot click from the menu

//Finally worked !!!!!!!!!!!!

// rec

bot.on("error", (err) => {
  console.error("Bot encountered an error:", err.message);
});

/** Joining the skyblock server */
bot.once(
  "spawn",
  function () {
    // finalyy worked YAYY!!
    setTimeout(() => {
      console.log(
        colors.blue + "Am in the server now, typing /skyblock" + colors.reset
      );

      bot.chat("/skyblock");

      bot.on("windowOpen", function (window) {
        //console.log("Window:", window);

        bot.clickWindow(15, 0, 0);
      });
    }, 5000);
    // setTimeout(() => {
    //   bot.chat("/is visit SIMP1745");
    //   bot.on("windowOpen", function (window) {
    //     //console.log("Window:", window);

    //     bot.clickWindow(10, 0, 0);
    //   });
    //   bot.once("spawn", () => {
    //     // Find the nearest entity
    //     const entity = bot.nearestEntity();

    //     if (entity) {
    //       // Look at the entity
    //       bot.lookAt(entity.position.offset(0, entity.height, 0));
    //     } else {
    //       console.log("No entity found nearby.");
    //     }
    //   });
    // }, 15900);
  },
  10000
);

// Create a readline interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user to enter "start"
// rl.question(
//   colors.cyan + 'Enter "start" to start mining: \n ' + colors.reset,
//   (answer) => {
//     if (answer.toLowerCase() === "start") {
//       console.log(
//         colors.red + "Received message: Starting to dig" + colors.reset
//       );
//       changeHotbarSlot(3);
//       digInFront();
//       setInterval(nextHotbar, 600000);
//       console.log("Current Hotbar Slot:", bot.quickBarSlot);
//       setInterval(() => {
//         digInFront();
//       }, 5000);
//       // Add your desired actions here
//     } else {
//       console.log("Invalid input. Exiting...");
//     }
//     rl.close(); // Close the readline interface
//   }
// );

function nextHotbar() {
  return changeHotbarSlot(bot.quickBarSlot + 1);
}
// Mining function

// bot.on("chat", (username, message) => {
//   if (message === "zhe") {

//     //continuousMining();
//   }
// });

/**
 * digning fucntion
 */
async function digInFront() {
  try {
    let blockPosition = bot.entity.position.offset(+1, 0, 0);
    let block = bot.blockAt(blockPosition);
    await bot.dig(block);
  } catch (error) {
    console.error("An error occurred:", error);
    digInFront();
  }

  //console.log("Mined a block");
}

// async function continuousMining() {
//   const targetBlock = bot.blockAt(bot.entity.position.offset(1, 0, 0));
//   await bot.dig(targetBlock);
//   setTimeout(continuousMining, 5000); // Adjust the delay as desired
// }

// Function to check if the equipped tool is broken
function checkToolDurability() {
  const heldItem = bot.heldItem;

  if (heldItem && heldItem.type.isTool && heldItem.metadata.durability === 0) {
    console.log("Tool broke!");
    changeHotbarSlot(bot.quickBarSlot + 1);
    console.log(
      colors.green + "Current Hotbar Slot:",
      bot.quickBarSlot + colors.reset
    );
  }
}

function changeHotbarSlot(slotIndex) {
  bot.setQuickBarSlot(slotIndex);
}

// Prompt the user for the bot to start hiting the entity in front of it
bot.loadPlugin(pathfinder);
const movements = new Movements(bot, bot.entity);
const checkInventoryloop = null;

rl.question(
  colors.magenta + 'Enter "hunt" to start farming \n ' + colors.reset,
  (answer) => {
    if (answer.toLowerCase() === "hunt") {
      //the part of the hunt function
      // Find the nearest entity
      //changeHotbarSlot(0);
      hunt(true);
    } else {
      console.log("Invalid input. Exiting...");
    }
    rl.close(); // Close the readline interface
  }
);

let logDurabilityLoop = null;
let attackEntityLoop = null;
let attackpigloop = null;

//function of hunt
function hunt(value) {
  if (value === true) {
    // Messaging in console
    console.log(
      colors.bright + "Received message: Starting to farm(kill)" + colors.reset
    );
    logDurability();
    logDurabilityLoop = setInterval(() => {
      logDurability();
    }, 5000 - 1000);
    console.log("Current Hotbar Slot:", bot.quickBarSlot);
    //attacking the entity
    attackEntityLoop = setInterval(() => {
      attackpigloop = setTimeout(function () {
        var entity = nearestEntity();
        if (entity) {
          bot.attack(entity, true);
        } else {
          bot.chat("no nearby entities");
        }
      }, 500);
    }, 1500 - 1000);
  } else if (value === false) {
    stopHunt();
    console.log("Stoping the hunt function!");
  }
}
//killing the pig

function nearestEntity(type) {
  var id, entity, dist;
  var best = null;
  var bestDistance = null;
  for (id in bot.entities) {
    entity = bot.entities[id];
    if (type && entity.type !== type) continue;
    if (entity === bot.entity) continue;
    dist = bot.entity.position.distanceTo(entity.position);
    if (!best || dist < bestDistance) {
      best = entity;
      bestDistance = dist;
    }
  }
  return best;
}

// clearin the timeloops of hunt function
function stopHunt() {
  clearInterval(logDurabilityLoop);
  clearInterval(attackEntityLoop);
  clearTimeout(attackpigloop);
}

// Function to log the durability of the held tool
function logDurability() {
  const heldItem = bot.inventory.slots[bot.getEquipmentDestSlot("hand")];
  if (heldItem) {
    if (heldItem.type === 276) {
      // Replace with the correct tool item ID (e.g., 276 for diamond sword)
      const durability = 1561 - heldItem.metadata;
      console.log(
        colors.yellow +
          colors.dim +
          `Durability of held tool: ` +
          colors.reset +
          colors.yellow +
          colors.bright +
          `${durability}` +
          colors.reset
      );
      checkInventory();
      if (durability < 100) {
        // Add function here if the sword durability is below 100.
        //hunt(false);
        //repairSword();
        changeHotbarSlot(bot.quickBarSlot + 1);
        console.log(
          colors.red +
            colors.bright +
            "Changing to next hotbar slot" +
            colors.reset
        );
        console.log("Current Hotbar Slot:", bot.quickBarSlot);
      }
    } else {
      console.log("No tool is currently held.");
      changeHotbarSlot(bot.quickBarSlot + 1);
      console.log(
        colors.red +
          colors.bright +
          "Changing to next hotbar slot" +
          colors.reset
      );
      console.log("Current Hotbar Slot:", bot.quickBarSlot);
    }
  } else {
    console.log("No item is currently held.");
    changeHotbarSlot(bot.quickBarSlot + 1);
    console.log(
      colors.red + colors.bright + "Changing to next hotbar slot" + colors.reset
    );
    console.log("Current Hotbar Slot:", bot.quickBarSlot);
  }
}


function checkInventory() {
  const emptySlotCount = bot.inventory.emptySlotCount();
  if (emptySlotCount === 0) {
    console.log('Bot inventory is full!');
    hunt(false);
  } else {
    //console.log('Bot inventory is not full yet.');
  }
}

bot.once("spawn", function () {
  setInterval(() => {
    const entity = bot.nearestEntity();
    if (entity !== null) {
      if (entity.type === "player") {
        bot.lookAt(entity.position.offset(0, 1.6, 0));
      } else if (entity.type === "mob") {
        bot.lookAt(entity.position);
      }
    }
  }, 50);
});

// Function to do after sword is less that 100 durability
function repairSword() {
  console.log("Going to repair sword using anvil");
  //opening the anvil
  const opened = openNearbyAnvil(bot);
  if (opened) {
    console.log("Anvil opened!");
  } else {
    console.log("No anvil found nearby.");
  }
  bot.on("windowOpen", function (window) {
    //console.log("Window:", window);
    setTimeout(() => {
      console.log("clicked anvil repairer");
      bot.clickWindow(15, 0, 0);
      console.log("Window:", window);
      setTimeout(() => {
        bot.clickWindow(69, 0, 0);
        setTimeout(() => {
          bot.clickWindow(5, 0, 0);
        }, 1400);
      }, 1400);
    }, 1400);
  });
  bot.on("windowClose", () => {
    console.log(
      colors.red +
        colors.bright +
        `sword repair done, going back to farming!!` +
        colors.reset
    );
    hunt(true);
  });
}

// opening the anvil
function openNearbyAnvil(bot) {
  const anvil = bot.findBlock({
    matching: 145, // Anvil block ID
    maxDistance: 3, // Maximum distance from the bot
  });

  if (anvil) {
    bot.activateBlock(anvil);
    return true; // Anvil found and opened
  } else {
    return false; // No anvil found nearby
  }
}

// checking inventory if full or nah

/**
 *
 * Unessary things
 *
 */

// fucntion leave server (might use later)
// function leaveServer() {
//   console.log("Bot is leaving the server.");
//   bot.quit();
// }

/**
 * Possible location for blaze farming
 *
 * /is visit Leo121
 *
 */
