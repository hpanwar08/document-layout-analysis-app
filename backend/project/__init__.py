import os

from flask import Flask

from flask_cors import CORS


def create_app(script_info=None):
    app = Flask(__name__)

    CORS(app)

    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    from project.api.dla_api import dla_blueprint

    app.register_blueprint(dla_blueprint, url_prefix="/api")

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app}

    return app
