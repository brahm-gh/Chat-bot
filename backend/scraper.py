from bs4 import BeautifulSoup
import requests
import json

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

