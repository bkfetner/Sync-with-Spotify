"""
Directory Structure
├── csc648-04-sp21-team06
       ├── app
       │   ├── __init__.py       Initialise our app. run_app.py will call create app funtion that will be defined here
       │   ├── templates         All templates can live here
       |   │   ├── index.html    Index page for our app
       |   │   ├── base.html     Base template for our web UI
       |   ├── static            Place to park all the static components our app will be using. For instance, favicon etc.
       ├── config.py             Configuration for different environment such as development and production
       ├── requirements.txt      Lists all the packages our app will be using
       └── run_app.py            Initialise our application
"""

from flask import Flask, render_template

# Web app declaration
app = Flask(__name__)

# Defining index
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ashwini')
def render_ashwini_page():
    return render_template('ashwini.html')

@app.route('/vishakha')
def render_vishakha_page():
    return render_template('vishakha.html')

@app.route('/bryan')
def render_bryan_page():
    return render_template('bryan.html')

@app.route('/jeremiah')
def render_jeremiah_page():
    return render_template('jeremiah.html')

@app.route('/luong')
def render_luong_page():
    return render_template('luong.html')

@app.route('/malcolm')
def render_malcolm_page():
    return render_template('malcolm.html')

@app.route('/rebecca')
def render_rebecca_page():
    return render_template('rebecca.html')


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=15667, debug=True)
