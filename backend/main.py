import flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = flask.Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mnt/C/Users/Intag/Desktop/DB/moviescape.db'

    db.init_app(app)

    from .views import main
    app.register_blueprint(main)

    return app
