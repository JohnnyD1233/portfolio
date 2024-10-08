// variables
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import axios from "axios";
import env from "dotenv";

env.config();

const token = "Your bot token";
const bot = new TelegramBot(token, { polling: true });
// messages variables
const shabatMSG =
  "❤️ שבת שלום! ✡️\n מאחלים לכם שבת שלום מלאה בשלווה, אהבה ורוח ספורטיבית!⚽️🏀🏈\n ";
const loginURL = process.env.liveStream;
const messageUEFA = `המשחק הבא: אליפות היורו🇪🇺`;
const messageCopaAmerica = `המשחק הבא: קופה אמריקה טירוף `;
const messageArgentinaLiga = `המשחק הבא: ליגה הארגנטינאית 🇦🇷`;
const messageBrazilSerieA = `המשחק הבא: ליגה ברזילאית נון-סטופ 🇧🇷`;
const messageWimbledon = `🎾המשחק הבא: טורניר ווימבלדון הגדול 🇬🇧`;
const messageMLS = `המשחק הבא: ליגה אמריקאית 🇺🇸`;
const messagePin = process.env.message;

// Admins
const chatMaster = 662756598179;
const chatNi = 6435656858792;

// Groups
const maxGroup = -100221549575454;
const football24 = -1001515547109900;
const shoeShop = -100154597673575;
const sasonDaily = -100133754910552;
const sratim = -1054601742866412;
const old = -100198915476940;
const chatIds = [maxGroup];

// Photos Buttons
const selections = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "new text", url: "https://t.me/Max24Bets" },
        { text: "new", url: "https://t.me/Max24BetsLive" },
      ],
    ],
  },
};

const More = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "call us", url: "https://t.me/Max24Bets" },
        { text: "contact", url: loginURL },
      ],
    ],
  },
};

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate);

// get the today games
const tournamentNames = [
  "Euro, Knockout stage",
  "CONMEBOL Copa América, Knockout stage",
  "Brasileirão Série A",
  "MLS",
];
async function getTournamentStartTime(tournamentNames) {
  const options = {
    method: "GET",
    url: `https://sportapi7.p.rapidapi.com/api/v1/sport/football/scheduled-events/${formattedDate}`,
    headers: {
      "x-rapidapi-key": process.env.RAPID_KEY,
      "x-rapidapi-host": process.env.RAPID_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    const events = response.data.events;
    // console.log(JSON.stringify(events))
    if (Array.isArray(events)) {
      tournamentNames.forEach((tournamentName) => {
        const tournamentEvent = events.find(
          (event) => event.tournament.name === tournamentName
        );
        if (tournamentEvent) {
          let startTime = tournamentEvent.startTimestamp * 1000;
          let eventstart = new Date(startTime);
          eventstart.setMinutes(eventstart.getMinutes() - 10);
          const hours = eventstart.getHours().toString().padStart(2, "0");
          const minutes = eventstart.getMinutes().toString().padStart(2, "0");
          scheduleDailyJob(chatIds, minutes, hours, tournamentName);
        } else {
          console.log(`Tournament with name ${tournamentName} not found.`);
        }
      });
    } else {
      console.log("Unexpected data structure:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const now = new Date();
  const hour = now.getHours();
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, openMsg);
  // bot.sendMessage(chatId, `message sent in ${hour , now}`);
});

// button presses
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const chatType = msg.chat.type;
  console.log(`Received message from chat ${chatId}: ${messageText}`);
  if (chatId == chatMaster || chatId == chatNis) {
    console.log(chatId);
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "משחקי היום⚙️", callback_data: "fetch" }],
          [{ text: "שבת שלום ✡️❤️", callback_data: "Shabat" }],
          [
            { text: "🇪🇺יורו", callback_data: "UEFA_Euro" },
            { text: "🇺🇸קופה אמריקה", callback_data: "Copa_america" },
          ],
          [
            {
              text: "🇦🇷ארגנטינה ראשונה",
              callback_data: "Argentina_liga_professional",
            },
            { text: "🇧🇷ברזיל ראשונה", callback_data: "Brazil_serie_a" },
          ],
          [
            { text: "🎾🇬🇧טורניר ווימבלדון", callback_data: "Wimbeldon" },
            { text: "ליגה אמריקאית🇺🇸", callback_data: "MLS" },
          ],
        ],
      },
    };
    bot.sendMessage(chatId, "בחר ליגה לפרסום:🏆", opts);
  } else if (
    chatType === "channel" ||
    chatType === "group" ||
    chatType === "supergroup"
  ) {
    console.log(`The chat ID for this ${chatType} is ${thisChat}`);
  } else {
    console.log(`Chat ID ${chatId} is not the master ID (${chatMaster})`);
    bot.sendVideo(chatId, "./Pictures/logo.mp4", {
      caption: messagePin,
      reply_markup: selections.reply_markup,
    });
  }
});

// Handle button presses
bot.on("callback_query", (callbackQuery) => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;
  console.log(`Callback query data received: ${data}`);
  switch (data) {
    case "UEFA_Euro":
      sendPicture(chatIds, "./Pictures/Euro.webp", messageUEFA);
      break;
    case "Copa_america":
      sendPicture(chatIds, "./Pictures/Copa-America.png", messageCopaAmerica);
      break;
    case "Argentina_liga_professional":
      sendPicture(chatIds, "./Pictures/Argentina.jpg", messageArgentinaLiga);
      break;
    case "Brazil_serie_a":
      sendPicture(chatIds, "./Pictures/Brazil.png", messageBrazilSerieA);
      break;
    case "Wimbeldon":
      sendPicture(chatIds, "./Pictures/Wimbeldon.jpg", messageWimbledon);
      break;
    case "Shabat":
      sendPicture(chatIds, "./Pictures/Shabat.jpg", shabatMSG);
      break;
    case "MLS":
      sendPicture(chatIds, "./Pictures/MLS.png", messageMLS);
      break;
    case "fetch":
      getTournamentStartTime(tournamentNames);
      break;
    default:
      bot.sendMessage(msg.chat.id, `${data}: פרסמת את הליגה `);
      break;
  }
});

// Function to send a picture with caption to multiple chats
function sendPicture(chatIds, filePath, caption) {
  if (!Array.isArray(chatIds)) {
    bot
      .sendPhoto(chatIds, filePath, {
        caption: caption,
        reply_markup: More.reply_markup,
      })
      .then(() => bot.sendMessage(chatMaster, `Post sent to ${chatIds} `))
      .catch((error) =>
        console.error(`Error sending picture to ${chatIds}:`, error)
      );
  } else {
    chatIds.forEach((chatId) => {
      bot
        .sendPhoto(chatId, filePath, {
          caption: caption,
          reply_markup: More.reply_markup,
        })
        .then(() => console.log(`Post sent to ${chatIds}`))
        .catch((error) =>
          console.error(`Error sending picture to ${chatIds}:`, error)
        );
    });
  }
}

// Function to schedule sending pictures at multiple times
// VPS Time is 3 hrs less than IL
function scheduleDailyJob(chatIds, minutes, hours, name) {
  if (name === "Brasileirão Série A") {
    bot.sendPhoto(chatMaster, "./Pictures/Brazil.png", {
      caption: `תזכורת לליגה ברזילאית נוספה בשעה: ${hours}:${minutes}`,
    });
    cron.schedule(`${minutes} ${hours} * * *`, async () => {
      sendPicture(chatIds, "./Pictures/Brazil.png", messageBrazilSerieA);
    });
  } else if (name === "CONMEBOL Copa América, Knockout stage") {
    bot.sendPhoto(chatMaster, "./Pictures/Copa-America.webp", {
      caption: `תזכורת לקופה אמריקה נוספה בשעה : ${hours}:${minutes}`,
    });
    cron.schedule(`${minutes} ${hours} * * *`, async () => {
      sendPicture(chatIds, "./Pictures/Copa-America.webp", messageCopaAmerica);
    });
  } else if (name === "MLS") {
    bot.sendPhoto(chatMaster, "./Pictures/MLS.jpg", {
      caption: `תזכורת לליגה אמריקאית נוספה בשעה: ${hours}:${minutes}`,
    });
    cron.schedule(`${minutes} ${hours} * * *`, async () => {
      sendPicture(chatIds, "./Pictures/MLS.jpg", messageMLS);
    });
  } else if (name === "Euro, Knockout stage") {
    bot.sendPhoto(chatMaster, "./Pictures/Euro.webp", {
      caption: `תזכורת ליורו נוספה בשעה: ${hours}:${minutes}`,
    });
    cron.schedule(`${minutes} ${hours} * * *`, async () => {
      sendPicture(chatIds, "./Pictures/Euro.webp", messageUEFA);
    });
  }
}

// logs errors
bot.on("polling_error", (error) => {
  console.error(`Polling error: ${error.message}`);
});
