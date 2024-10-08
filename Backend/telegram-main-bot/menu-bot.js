// variables
import TelegramBot from 'node-telegram-bot-api';
import env from "dotenv";

env.config();

const token = process.env.BOT_TOKEN;
const shoesURL ='shoes shop link'
const clothURL = 'cloth shop link'
const orderLink = ' user link'
const opentext = `ברוכים הבאים לחנות הבוטיק של שולי ✅`;
const placetext = 'באמת חשבת שיש אזורים עובדים כל הארץ כבר 3 שנים🚀'
const menuText = `חנות הבגדים והנעליים של שולי מביאים את הסחורה הטובה ביותר ואת המוצרים היפים ביותר`;
const bot = new TelegramBot(token, { polling: true });
const opts = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "לחנות הנעליים", url: shoesURL }],
      [{ text: "לחנות הבגדים", url: clothURL }],
      [{ text: "להזמנות📱", url: orderLink }],
      [{ text: "קצת עלינו❤️", callback_data: 'about_us' },
        { text: "אזורי פעילות📍", callback_data: 'place' },
      ],
    ]
  }
};

// Inline keyboard options for the back button
const back = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "חזרה↪️", callback_data: 'back_to_menu' }],
    ]
  }
};

// Store the ID of the last message sent
let lastMessageId = null;

// Function to delete the last message sent by the bot
function deleteLastMessage(chatId) {
  if (lastMessageId) {
    bot.deleteMessage(chatId, lastMessageId)
      .then(() => {
        console.log(`Deleted message ${lastMessageId}`);
        lastMessageId = null; // Reset lastMessageId after deletion
      })
      .catch((error) => {
        console.error(`Error deleting message: ${error}`);
      });
  } else {
    console.log('No message to delete');
  }
}

// Handle incoming messages
bot.on("message", (msg) => {
  const thisChat = msg.chat.id;
  const messageText = msg.text;
  console.log(`Received message from chat ${thisChat}: ${messageText}`);

  // Send initial video with opentext
  bot.sendVideo(thisChat, './logo/logo.mp4', { caption: opentext, reply_markup: opts.reply_markup })
    .then((sentMessage) => {
      console.log('Video sent successfully');
      lastMessageId = sentMessage.message_id; // Store the message ID of the sent message
    })
    .catch((err) => {
      console.error('Error sending video:', err);
    });
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // Handle 'back_to_menu' callback
  if (data === 'back_to_menu') {
    deleteLastMessage(chatId); // Delete the last message sent
    bot.sendVideo(chatId, './logo/logo.mp4', { caption: opentext, reply_markup: opts.reply_markup })
      .then((sentMessage) => {
        console.log('Sent initial video with opentext');
        lastMessageId = sentMessage.message_id; // Store the message ID of the new sent message
      })
      .catch((err) => {
        console.error('Error sending initial video:', err);
      });

  // Handle 'about_us' callback
  } else if (data === 'about_us') {
    deleteLastMessage(chatId); // Delete the last message sent
    bot.sendVideo(chatId, './logo/logo.mp4', { caption: menuText, reply_markup: back.reply_markup })
      .then((sentMessage) => {
        console.log('Sent video with menuText');
        lastMessageId = sentMessage.message_id; // Store the message ID of the new sent message
      })
      .catch((err) => {
        console.error('Error sending video:', err);
      });
  } else if (data === 'place'){
    deleteLastMessage(chatId); // Delete the last message sent
    bot.sendVideo(chatId, './logo/logo.mp4', { caption: placetext, reply_markup: back.reply_markup })
      .then((sentMessage) => {
        console.log('Sent video with menuText');
        lastMessageId = sentMessage.message_id; // Store the message ID of the new sent message
      })
      .catch((err) => {
        console.error('Error sending video:', err);
      });
  }

  // Answer callback query
  bot.answerCallbackQuery(callbackQuery.id);
});