from flask import Flask, request
from goose3 import Goose
import requests
from config import Config

g = Goose({'enable_image_fetching': True})

def get_article_data(url):
    data = g.extract(url=url)
    return data

def get_article_summary(text):
    API_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"
    headers = {"Authorization": f"Bearer {app.config['API_TOKEN']}"}
    response = requests.post(API_URL, headers=headers, json=text)
    text_summary = response.json()
    return text_summary

# Flask server
app = Flask(__name__)
app.config.from_object(Config)

@app.route('/api', methods=['GET', 'POST'])
def api():
    if request.method == 'POST':
        article_data = get_article_data(request.json['url'])
        article_summary = get_article_summary(article_data.cleaned_text)
        return {
            'title': article_data.title,
            'image_url': article_data.top_image.src,
            'summary': article_summary
            }
    else:
        return '<p>API</p>'