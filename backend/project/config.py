import os


class BaseConfig(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get("SECRET_KEY") or "l;afhdofhaoie2hifhskldn09234023 -u09)7(^(Y*IHFY *Yoisdf8"


class DevelopmentConfig(BaseConfig):
    """Development configuration"""

    DEBUG = True


class ProductionConfig(BaseConfig):
    """Production configuration"""

    DEBUG = False