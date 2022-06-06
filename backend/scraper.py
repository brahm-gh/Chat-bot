from bs4 import BeautifulSoup
import requests
import json
import pprint

data = requests.get('https://www.allrecipes.com/recipes/').text
soup = BeautifulSoup(data, 'html5lib')

keyword = ' '
keyword = 'drinks'

l = []
for target in soup.find_all('script'):
        l.append(target.getText())
obj = l[-1]
obj = json.loads(obj)
obj = obj[-1]
dict = {}
dict['name'] = obj['name']
dict['url'] = obj['url']
url = ''
found = False
for i in range(len(dict['name'][0])):

        if dict['name'][0][i].lower() == keyword:
            url = dict['url'][0][i]
            found = True
if not found:
    print('No match')






#debugging
#print(dict)
#print (dict['name'][0][1])
#print(dict['url'][0][1])
print(url)


data2 = requests.get(url).text
soup2 = BeautifulSoup(data2, 'html5lib')

l2 = []
for target in soup2.find_all('script'):
        l2.append(target.getText())


obj2 = l2[-1]
obj2= json.loads(obj2)
obj2 = obj2[1]
obj2 = obj2['itemListElement']

keyword2 = ''
#match url to keyword2 (regex)

for i in range(len(obj2)):
    print(obj2[i]['url'])

url2 = obj2[0]['url'] #trial url (will depend on keyword2)




data3 = requests.get(url2).text
soup3 = BeautifulSoup(data3, 'html5lib')

l3 = []
for target in soup3.find_all('script'):
        l3.append(target.getText())

obj3 = l3[-1]
obj3= json.loads(obj3)
obj3 = obj3[1]
recipe_ingredients = obj3["recipeIngredient"]
ingredients = 'Ingredients:\n'
for i in range(len(recipe_ingredients)):
    ingredients += recipe_ingredients[i] + '\n'
instructions = ''
for i in range(len(obj3["recipeInstructions"])):
    instructions += obj3["recipeInstructions"][i]['text']


print(ingredients)
print(instructions)