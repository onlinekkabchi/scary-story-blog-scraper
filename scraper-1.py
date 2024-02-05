import requests
from bs4 import BeautifulSoup


url="https://www.reddit.com/r/TwoSentenceHorror/top/"

page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")

# results = soup.find("article").find("a")
# print(results.prettify())

# a 태그 전체 검색
results = soup.find_all("a", href=True)

# 전체 a 태그 갯수
# print(len(results))

# a 태그에 들어간 주소에 comment가 있을 경우 출력
# for result in results :
#     href = result['href']
#     if href.find("comments") != -1:
#         print("find the url: ", result)

comment_url_number = 0
for result in results:
    href = result['href']
    if href.find("comments") != -1:
        comment_url_number += 1

print(comment_url_number)