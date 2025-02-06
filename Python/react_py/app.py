from flask import Flask

app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route('/')
def hello():
    return "Szia!"

if __name__ == '__main__':
    app.run()
