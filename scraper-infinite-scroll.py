import requests
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from urllib.parse import urljoin

url="https://www.reddit.com/r/TwoSentenceHorror/top/"


##### Web scrapper for infinite scrolling page #####
driver = webdriver.Chrome()
driver.get(url)

time.sleep(2)  # Allow 2 seconds for the web page to open
scroll_pause_time = 1 # You can set your own pause time. My laptop is a bit slow so I use 1 sec
screen_height = driver.execute_script("return window.screen.height;")   # get the screen height of the web
i = 1

while True:
    # scroll one screen height each time
    driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))  
    i += 1
    time.sleep(scroll_pause_time)
    # update scroll height each time after scrolled, as the scroll height can change after we scrolled the page
    scroll_height = driver.execute_script("return document.body.scrollHeight;")  
    # Break the loop when the height we need to scroll to is larger than the total scroll height
    # if (screen_height) * i > scroll_height:
    #     break 
    if i > 5:
        break

urls = [];
soup = BeautifulSoup(driver.page_source, "html.parser")

results = soup.find_all("a", href=True)

# infinite scroll로 길어진 웹페이지에서 a 태그 전부 추출, 태그 갯수 129개
print(len(results))

# for result in results:
#     new_url = urljoin(url, link)
#     urls.append()