from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return app.send_static_file('static')

if __name__ == "__main__":
    app.run()
