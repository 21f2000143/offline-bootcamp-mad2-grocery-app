from datetime import timedelta
ACCESS_EXPIRES = timedelta(hours=1)


class LocalDevelopmentConfig:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    JWT_SECRET_KEY = '5#y2LF4Q8z\n\xec]/'
    JWT_ACCESS_TOKEN_EXPIRES = ACCESS_EXPIRES
    BROKER_CONNECTION_RETRY_ON_STARTUP = True
    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    CELERY_TIMEZONE = "Asia/Kolkata"
    REDIS_URL = "redis://localhost"
