
const fs = require('fs')

const lineByLine = require('n-readlines');

function write_keyword(meal){
    try {
        //write the user recipe (keyword) to a text file
        fs.writeFile('keywords.txt', meal) 
    }catch (err) {
        console.error(err);
    }
}

function read_links(){
        try {
            //const data = fs.readFileSync('sublist.txt', 'utf8');
            const liner = new lineByLine('sublist.txt');
            let line;
            let data = []
            while (line = liner.next()) {
                data.push(line)
            }
            //console.log(data);
            return data;
        } catch (err) {
            //console.error(err);
            return;
        }
}

function find_ingredients(meal, data){
    let list = []
    let answer = "I don't have an answer yet"
    for (let i = 0; i <  data.length; i++) {
        if (data[i].includes(meal)) {
            list.push(data[i])
        }
    }
    if (list.length < 1) {
        answer = "I am dumb, I don't have answer to \"" + meal + "\" yet, can you rephrase?"; 
    }else{
        answer = "Here are Links to \""+  meal +"\" Ingredients, Take a look: \n"; 
        for (let i = 0; i < list.length; i++){
            answer += list[i] + "\n"
        }
    }
    return answer
}
let data = read_links()
//console.log(data)

user_input = "Baby Blt"
user_input = user_input.toLowerCase() 
const result = user_input.replaceAll(' ', '-');
let answer = find_ingredients(result, data)
console.log(answer)

function get_ingredients(user_input){
    user_input = user_input.toLowerCase() 
    const result = user_input.replaceAll(' ', '-');
    data = read_links()
    bot_response = find_ingredients(result, data)
    return bot_response
}

function read_input(){
    try {
        const items = fs.readFileSync('items.txt', 'utf8');
        items =  items.toString().split("\n");
        return items;
    }catch (err) {
        //console.error(err);
        return;
    }
}

function dialogue(user_input){
    var greetings = ['hi', 'hello', 'morning', 'evening', 'hey']
    var bye = ['bye', 'see you', 'no! thank you']
    var meal = ['meal', 'recipe', 'food', 'drink']

    user_input = user_input.toLowerCase() 
    let result = user_input.replaceAll(' ', '-');

        if (greetings.includes(user_input)){
            answer = "Hello! I am Recipico Chatbot! What's your Recipe Today"
        }else if (meal.includes(user_input)){
            answer = get_ingredients(result)
        }else if (bye.includes(user_input)){
            answer = "Bye Bye! I hope to see you again"
        }else{
            answer = "You may need to paraphrase your question"
        }
    return answer
}
//console.log(dialogue('Meal'))


