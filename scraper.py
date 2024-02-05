# url = "https://www.reddit.com/r/TwoSentenceHorror/top/"

# import ssl
# context = ssl._create_unverified_context()

# from urllib.request import urlopen

# page = urlopen(url, context=context)

# html_bytes = page.read()
# html = html_bytes.decode("utf-8")

# title_index = html.find("<article>")

# print(title_index)

import requests
from bs4 import BeautifulSoup

url = "https://www.reddit.com/r/TwoSentenceHorror/top/"

# BeautifulSoup 사용해서 웹 크롤링
try:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    # articles = soup.find_all("article")
    anchor_tag_list = soup.find_all("a[slot='full-post-link']")

    for tag in anchor_tag_list:
        print(tag)

    # href = anchor_tag.get("href")
    # print("Href:", href)

    # first_article = soup.select_one("article")

    # anchor_tag = first_article.select_one("a[slot='full-post-link']")
    # href = anchor_tag.get("href")
    # text = anchor_tag.get_text().strip()

    # print("Href:", href)
    # print("Text:", text)
except Exception as e:
    print(e)
