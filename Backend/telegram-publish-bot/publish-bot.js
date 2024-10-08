// variables
import fs from 'fs';
import path from 'path';
import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron'
import ffmpeg from 'fluent-ffmpeg';
import ffprobeStatic from 'ffprobe-static';
import env from "dotenv";

ffmpeg.setFfprobePath(ffprobeStatic.path);
env.config();

const token = process.env.BOT_TOKEN;
const loginURL ='user link'
const openMsg = `opening message`;
const bot = new TelegramBot(token, { polling: true });
const selections = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "להזמנות", url: 'https://t.me/sasson_2' },
        { text: "לקטלוג", url: loginURL },
      ],
    ],
  },
};
// Admins 
const chatMaster = 6624325375981679;
const chatGustavo = 6656432130980578;
const chatsason = 583762151870103;
const chat247 = 574210345024311;
// Groups 
const chatIds = [chatsason,chatGustavo,chat247];
// const chatIds = [chatMaster];

// Handle any message command
bot.on("message", (msg) => {
  const thisChat = msg.chat.id;
  const messageText = msg.text;
  const chatType = msg.chat.type;
  console.log(`Received message from chat ${thisChat}: ${messageText}`);

  if (thisChat === chatGustavo || thisChat === chatMaster || thisChat === chatsason) {
    console.log(`${thisChat} is the master ID`);
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "LOGO", callback_data: "logo" },
          ],
          [
            { text: "NIKE", callback_data: "NIKE" },
            { text: "ADIDAS", callback_data: "ADIDAS" }
          ],
          [
            { text: "PULL & BEAR", callback_data: "PULL & BEAR" },
            { text: "GUCCI", callback_data: "GUCCI" }
          ],
          [
            { text: "ARMANI", callback_data: "ARMANI" },
            { text: "HUGO BOSS", callback_data: "HUGO BOSS" }
          ],
          [
            { text: "REPLAY", callback_data: "REPLAY" },
            { text: "ROLEX", callback_data: "ROLEX" }
          ],
          [
            { text: "APPLE", callback_data: "APPLE" },
            { text: "MICROSOFT", callback_data: "MICROSOFT" }
          ],
          [
            { text: "ZARA", callback_data: "ZARA" },
            { text: "PLAYSTATION", callback_data: "PLAYSTATION" }
          ],
          [
            { text: "FOX", callback_data: "FOX" },
            { text: "BERSHKA", callback_data: "BERSHKA" }
          ],
          [
            { text: "RANDOM PRODUCT🎲", callback_data: "RANDOM PRODUCT" },
            { text: "SHABBAT MSG✡️❤️", callback_data: "SHABBAT MSG" }
          ]
        ]
      }
    };
    
    bot.sendMessage(thisChat, "בחר פריט לפרסום:", opts);
  } else if (chatType === 'channel' || chatType === 'group' || chatType === 'supergroup'){
    console.log(`The chat ID for this ${chatType} is ${thisChat}`);
     } else {
      console.log(`Chat ID ${thisChat} is not the master ID (${chatMaster})`);
      bot.sendVideo(thisChat, './Pictures/logo/1.mp4', { caption: openMsg, reply_markup: selections.reply_markup })
        .then(() => {
          console.log('Video sent successfully');
        })
        .catch((error) => {
          console.error('Error sending video:', error.response.body);
        }); 
      }
});

// answer the button press
bot.on("callback_query", (callbackQuery) => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;
  const txtFilePath = path.join(directoryPath, callbackQuery.data, "txt.txt");
  if (data === "random") {
    getImageFiles(directoryPath)
      .then(({ album, caption }) => {
        sendPictures(chatIds, album, caption);
      })
      .catch((error) => {
        console.error("Error in getImageFiles:", error);
      });
  } else if(data === 'Shabat'){
    console.log(callbackQuery.data)
    sendPicture(chatIds, `./Pictures/${callbackQuery.data}/1.png`,txtFilePath);
  } else {
    console.log(callbackQuery.data)
    // sendPicture(chatIds, `./Pictures/${callbackQuery.data}/1.jpg`, txtFilePath);
    sendVideo(chatIds, `./Pictures/${callbackQuery.data}/1.mp4`, txtFilePath);
    bot.sendMessage(msg.chat.id, `בחרת: ${data}`);
  }
});

// logs the errors
bot.on("polling_error", (error) => {
  console.error(`Polling error: ${error.message}`);
});

// function to send only one picture specific
function sendPicture(chatIds, filePath, txtFilePath) {
  fs.readFile(txtFilePath, "utf8", (err, caption) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    chatIds.forEach((chatId) => {
      bot
        .sendPhoto(chatId, filePath, { caption: caption, reply_markup: selections.reply_markup })
        // .sendPhoto(chatId, filePath, { caption: caption })
        .then(() => console.log(`Picture sent to ${chatId} from ${filePath}`))
        .catch((error) =>
          console.error(`Error sending picture to ${chatId}:`, error)
        );
    });
  });
}
// function to send videos 
function sendVideo(chatIds, filePath, txtFilePath) {
  // Get the video metadata to determine its original dimensions
  ffmpeg.ffprobe(filePath, (err, metadata) => {
    if (err) {
      console.error("Error getting video metadata:", err);
      return;
    }

    const width = metadata.streams[0].width;
    const height = metadata.streams[0].height;

    // Read the caption from the text file
    fs.readFile(txtFilePath, "utf8", (err, caption) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      chatIds.forEach((chatId) => {
        bot
          .sendVideo(chatId, filePath, { 
            caption: caption, 
            width: width, 
            height: height, 
            reply_markup: selections.reply_markup 
          })
          // .sendPhoto(chatId, filePath, { caption: caption })
          .then(() => console.log(`Video sent to ${chatId} from ${filePath}`))
          .catch((error) =>
            console.error(`Error sending video to ${chatId}:`, error)
          );
      });
    });
  });
}

// Function to send a array with caption to multiple chats
function sendPictures(chatIds, album, caption) {
  if (!Array.isArray(album)) {
    console.error("Album is not an array.");
    return;
  }
  chatIds.forEach((chatId) => {
    album.forEach((filePath) => {
      bot
        .sendPhoto(chatId, filePath, { caption: caption })
        .then(() => console.log(`Picture sent to ${chatId} from ${filePath}`))
        .catch((error) =>
          console.error(`Error sending picture to ${chatId}:`, error)
        );
    });
  });
}

// function to get every message a new Gen
const directoryPath = "Pictures/";
function getImageFiles(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        reject(err);
        return;
      }
      const randomIndex = Math.floor(Math.random() * files.length);
      const randomDir = files[randomIndex];
      const randomDirPath = path.join(directory, randomDir);
      fs.readdir(randomDirPath, (err, images) => {
        if (err) {
          console.error("Error reading random directory:", err);
          reject(err);
          return;
        }
        const album = [];
        const chosenImages = images.filter((image) => {
          const extname = path.extname(image).toLowerCase();
          return [".jpg", ".jpeg", ".png", ".gif"].includes(extname);
        });
        chosenImages.forEach((chosenImage) => {
          if (album.length === 0) {
            const fullPath = path.join(randomDirPath, chosenImage);
            album.push(fullPath);
          } else {
          }
        });
        if (chosenImages.length === 0) {
          reject(new Error(`No image files found in ${randomDirPath}`));
          return;
        }
        const txtFilePath = path.join(randomDirPath, "txt.txt");
        fs.readFile(txtFilePath, "utf8", (err, caption) => {
          if (err) {
            console.error("Error reading file:", err);
            reject(err);
            return;
          }
          resolve({ album, randomDirPath, caption });
        });
      });
    });
  });
}

// Function to schedule sending pictures at multiple times
// VPS Time is 3 hours before IL Time
function scheduleDailyJob(chatIds) {
  // Schedule job at 19:00 (7:00 PM)
  cron.schedule("12 14 * * *", () => {});

  // Schedule job at 21:30 (9:30 PM)
  cron.schedule("01 14 * * *", () => {
    getImageFiles(directoryPath);
  });

  cron.schedule("00 18 * * *", () => {
    sendPicture(chatIds, "./Pictures/copa2.jpg");
  });

  cron.schedule("00 18 * * *", () => {
    sendPicture(chatIds, "./Pictures/copa2.jpg");
  });

  // Schedule job at 2:00 AM
  cron.schedule("00 18 * * *", () => {
    sendPicture(chatIds, "./Pictures/copa2.jpg");
  });
}

