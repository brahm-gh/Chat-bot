const {bot} = require('bard-builder')

const main = function () {
    // declare the chatbot instance 
    const bot = new Bot({name: "Recipicooo"});
    
    /* here we declare the dialogs */
    setup_flow(bot);

    /* here we start the chatbot */
    bot.start();

    /* here we setup and start the message gateway */
    const gateway = new Gateway(8888, bot);
    gateway.pullProcess();
}

main()
