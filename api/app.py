from flask import Flask, request
from goose3 import Goose
import requests
from config import Config

g = Goose({'enable_image_fetching': True})

def get_article_text(url):
    article_text = g.extract(url=url)
    return article_text.cleaned_text

def get_article_summary(article_text):
    API_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"
    headers = {"Authorization": f"Bearer {app.config['API_TOKEN']}"}
    response = requests.post(API_URL, headers=headers, json=article_text)
    summary_text = response.json()
    return summary_text


# Flask server
app = Flask(__name__)
app.config.from_object(Config)

@app.route('/api', methods=['GET', 'POST'])
def api():
    if request.method == 'POST':
        print(request.json)
        article_text = get_article_text(request.json['url'])
        article_summary = get_article_summary(article_text)
        return {'summary': article_summary}
    else:
        return '<p>API</p>'