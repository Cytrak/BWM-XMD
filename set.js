const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUZVRlY5MXF1ZWpJcnFiUm1PcXo5WURDeGtFTm1Ja0ZWb1p5ZUltTCtYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVBJVUcxWEQ2K2JzbW9OWnFXaEkrRTVnbys3cFB3NUFPd1R1SXJyWlNUaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R1RHdVcrU1MyQzFjOVRTOFFiWWZKY3Y0YkVaQUdSZStncC9wRXlobUhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxKzgrWk1uWmRTd05qZWpxWHhnWks3cGI2bitXTEovYmZTSERFdStTdndrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlHZ0YrVXJBcEV4SE9YYm8xSUxrZWR3b0tMaGVUS2FpamVLYTJYQzBWbHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIL2JWdUZ0U0srVzk0UmZRUDRVeER1bVVYKzBnOFo3VGVZSlBQQjgxems9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlvRHlnN3dieEpPZWI2a2JKbkhoK21JRFE4Z1J2bHJKb21sSHFYNFpIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXg4OFYxd3I2ZU1VY3NidkJiUnU5TlJHak9jNXhrMDlxd2k5V3M3eWozaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlRQ0M1RXgvR3R1a2VxTHFKbi9BalAyV1VTNnZlenk4L2dscE1zT1NQN3BKUFlBRk83dTE0N2I4TU1ZTlJiMUxpWDg1WTZZdGhJSVBFSkswamhhckFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiIwMGZpeDQ1ZXFXOGVKTi8rZHJwZDJKMGIrK3FpcmRrNzIvNFQ5WXFQRkhvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxNTE1NTE5NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3QjY0NjY5Qzk0MDc2MUI2N0UyQzNBQjQ3QUQyREYzMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI0MjMxOTE3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtRkVCS2owV1JPeXlDSFVYSkdraURnIiwicGhvbmVJZCI6ImQzYjFmZDkxLTM1MzMtNDg0NS05NTZhLWJiOWRlZTQ3YzI2YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1UFdYemNhNzg3Zyt3VThsSlVVd1YxUHRCKzg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoici9yOHRHWWp6WDZiR1hPQml0YWtaQlRaME5ZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktLNEZURDRGIiwibWUiOnsiaWQiOiIyNTQ3MTUxNTUxOTY6MzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1AyN3FlTUNFTnpobHJZR0dDWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdVcFJ1SHJsLzFRQ2p4eUhlR29BUm51cDhCVkZ1OTA4ZVdoUlRrTWJGanM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkR5NmViODNNRnhMd2R2R2xIdzFVQitDbyt0QTlqWCtmSCs3S3Bwck02SDBpZ1NBRWV0bUFQc2lZRkhXL0c5dEZzK2szUnBHT1cvWXFPSVRmcE01ZEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJzTTNPcksxWXBIbDk5djR1TW9reldGY1Y4VkxBOU9UYWpVejBTZnFxS2w5THUxV2ZvallvNGd0TzdaeEtNK3FnLytPTnFPaFc3Vjh3Sy9UU2VhTkFEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxNTE1NTE5NjozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlMUtVYmg2NWY5VUFvOGNoM2hxQUVaN3FmQVZSYnZkUEhsb1VVNURHeFk3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MjMxOTEzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUR1eiJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Cytra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Cytra",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Cytra_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


