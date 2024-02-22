const fetch = require('node-fetch');

const plugin = {
  commands: ['/bing'],
  tags: ['openai'],
  init: async (bot, { buttonUrl, mess, api, apikey }) => {
    bot.onText(/^\/bing(?: (.+))?$/, async (msg, match) => {
      const chatId = msg.chat.id;
      const inputText = match[1];
      if (!inputText) {
        bot.sendMessage(chatId, 'Input Query! Example /bing hai', { reply_to_message_id: msg.message_id });
        return;
      }
      bot.sendMessage(chatId, mess.wait, { reply_to_message_id: msg.message_id });
      try {
        const response = await fetch(api + '/api/search/bing-chat?apikey=' + apikey + '&text=' + encodeURIComponent(inputText));
        const responseMessage = await response.json();

        const replyMarkup = {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'WhatsApp Group', url: buttonUrl }],
            ],
          },
        };

       bot.sendPhoto(chatId, 'https://btch.pages.dev/file/9e4162d4034241953fdfb.jpg', { caption: responseMessage.message, parse_mode: 'Markdown', reply_to_message_id: msg.message_id, ...replyMarkup });                 
      } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'An error occurred while processing your request.',  { reply_to_message_id: msg.message_id });
      }
    });
  },
};

module.exports = plugin;
