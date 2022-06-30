const root = require("./dialogs/root");
const bye = require("./dialogs/bye");
const faq = require("./dialogs/faq");
const intents= require("./dialogs/intents");

/* 
    export a function that receives the chatbot as a parameter, then link the dialogs to it
*/
module.exports = function(bot) {
    
    /* this can be used to pass dependencies to dialogs */
    const deps = {};

    /* link dialogs into our chatbot */
    bot.trailing("root", root(deps));
    bot.trailing("bye", bye(deps));
    bot.trailing("faq", faq(deps));
    bot.incoming("intents", intents(deps));
}
