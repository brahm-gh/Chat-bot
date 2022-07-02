
const fs = require('fs')

function write_keyword(meal){
    try {
        //write the user recipe (keyword) to a text file
        fs.writeFile('keywords.txt', meal) 
    }catch (err) {
        console.error(err);
    }
}

function read_links(){
    fs.readFile('sublist.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
            }else{
            data =  data.toString().split("\n");
            return data;
            }
    })
}

function find_ingredients(meal, data){
    for (let i = 0; i <  data.length; i++) {
        if (data[i] == meal) {
            list = []
            j = i + 1
            while (data[j].length > 30) {
                list += data[j]
            }
        }
    }
    if (list.length < 1) {
        answer = "I am dumb, I don't have answer to \"" + meal + "\" yet, can you rephrase?"; 
    }else{
        answer = "Here are Links to \"" + meal + "\" Ingredients, Take a look"; 
        }
    return answer
}

function get_ingredients(meal){
    write_keyword(meal)
    data = read_links()
    bot_response = find_ingredients(meal, data)
    return bot_response
}


/*
var greetings = ['hi', 'hello', 'morning', 'evening', 'hey']
var bye = ['bye', 'see you', 'no! thank you']
//var meal = ['meal', 'recipe', 'food', 'drink', '']
function read_input(){
    fs.readFile('items.txt', 'utf8', (err, items) => {
        if (err) {
            console.error(err);
            return;
        }else{
            items =  items.toString().split("\n");
            return items;
        }
    })
}
meal = read_input()

for (let i = 0; i < meal.length(); i++){
    meal[i] = meal[i].toLowerCase()
}
console.log(meal)

function dialogue(user_input){
    user_input = user_input.toLowerCase() 
        if (user_input in greetings){
            answer = "Hello! I am Recipico Chatbot! What's your Recipe Today"}
        else if (user_input in meal){
            answer = "Here you can find"}
        else if (user_input in bye){
            answer = "Bye Bye! I hope to see you again"
        }else{
            answer = "You may need to paraphrase your question"
        }
    return answer
}
//dialogue('Bye')
*/