from bs4 import BeautifulSoup
import requests

data = requests.get('https://www.allrecipes.com/recipes/').text
soup = BeautifulSoup(data, 'html5lib')

keyword = ' '

l = []
for target in soup.find_all('script'):
        l.append(target)
print(l[-1])