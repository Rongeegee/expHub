from flask import *
from flaskext.mysql import MySQL

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/experts/')
def route1():
    return render_template('experts.html')


if __name__ == "__main__":
    app.run(debug=True)

mysql = MySQL()

dict = {}

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'iLove$100only'
app.config['MYSQL_DATABASE_DB'] = 'expertHub'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

conn = mysql.connect()

review = mysql.connect().cursor()
review.execute("SELECT * FROM clients")


