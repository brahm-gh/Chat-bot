#input keyword, output answer
from bs4 import BeautifulSoup
import requests
import json
import re


data = requests.get('https://www.allrecipes.com/recipes/').text
soup = BeautifulSoup(data, 'html5lib')

keyword = ' '
keyword = 'drinks' #will be given by user via socket
with open('keywords.txt', 'r') as f:
    keyword = f.readline()

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
items = []
sites = []
for i in range(len(dict['name'][0])):

        items.append(dict['name'][0][i])
        sites.append(dict['url'][0][i])
        if dict['name'][0][i].lower() == keyword:
            url = dict['url'][0][i]
            found = True

with open('items.txt', 'a') as f:
    for item in items:
        f.write(item)
        f.write('\n')

with open('sites.txt', 'a') as f:
    for site in sites:
        f.write(site)
        f.write('\n')

print(items)
print(sites)
if not found:
    print('No match')


def display_items():
    return items


data2 = requests.get(url).text
soup2 = BeautifulSoup(data2, 'html5lib')

l2 = []
for target in soup2.find_all('script'):
        l2.append(target.getText())


obj2 = l2[-1]
obj2= json.loads(obj2)
obj2 = obj2[1]
obj2 = obj2['itemListElement']


sublist = []
for j in range(len(sites)):
    datax = requests.get(sites[j]).text
    soupx = BeautifulSoup(datax, 'html5lib')

    lx = []

    for target in soupx.find_all('script'):
        lx.append(target.getText())
    if j!= 7 and j!=12 and j!=14 and j!=19 and j!=21:
        objx = lx[-1]
        objx = json.loads(objx)
        objx = objx[1]
        objx = objx['itemListElement']

        print(items[j])
        sublist.append(items[j])
        try:
            for k in range(len(objx)):
                print(objx[k]['url'])
                sublist.append(objx[k]['url'])
        except KeyError:
            print('no url')

with open('sublist.txt', 'a') as f:
    for item in sublist:
        f.write(item)
        f.write('\n')


keyword2 = 'old fashioned lemonade' #will be given by the user via the socket


keyword2 = re.sub('\s', '-', keyword2)

#url2 = sublist[5] #trial url (will depend on keyword2) will be removed

print(keyword2)
for i in range(len(sublist)):
    n, m = len(sublist[i]), len(keyword2)
    for j in range(n-m+1):
        k = 0
        while k < m and sublist[i][j+k] == keyword2[k]:
            k += 1
        if k == m:
            url2 = sublist[i]
            break
    if k == m:
        break

if k != m:
    print('No match found between url and keyword')
print(url2)


for url in sublist:
    if len(url) > 42:
        data3 = requests.get(url).text
        soup3 = BeautifulSoup(data3, 'html5lib')
        l3 = []
        l4 = []
        for target in soup3.find_all('script'):
                l3.append(target.getText())
        for target in soup3.find_all('title'):
                l4.append(target.getText())
        title = l4[0].split('|')
        title = title[0]
        print(title)
        obj3 = l3[-1]
        obj3= json.loads(obj3)
        obj3 = obj3[1]
        try:
            recipe_ingredients = obj3["recipeIngredient"]
            ingredients = 'Ingredients:\n'
            for i in range(len(recipe_ingredients)):
                ingredients += recipe_ingredients[i] + '\n'
            instructions = ''
            for i in range(len(obj3["recipeInstructions"])):
                instructions += obj3["recipeInstructions"][i]['text']

            with open('recipes.txt', 'a') as f:
                f.write('\n')
                f.write(title)
                f.write('\n')
                f.write(str(ingredients.encode('utf8')))
                f.write('\n')
                f.write(instructions)
                f.write('\n')
                f.write('\n')

        except KeyError:
            print('no key found')
        except:
            print('no value')


print(ingredients)
print(instructions)