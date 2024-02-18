from dotenv import load_dotenv
from pymongo import MongoClient
import os

# load .env
load_dotenv()

def get_database():
    CONNECTION_STRING = os.environ.get("MONGO_URI")
    client = MongoClient(CONNECTION_STRING)

dbname = get_database()
collection_name = dbname["short_story"]
items = collection_name.find()

for item in items:
    print(item)