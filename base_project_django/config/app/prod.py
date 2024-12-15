from config.app.base import *
from config.db.database import DATABASE_CONFIG

DEBUG = False

ALLOWED_HOSTS = ["*","192.168.20.101"]

THIRDS_APPS += []

INSTALLED_APPS = COMMON_APPS + THIRDS_APPS + MY_APPS 

MIDDLEWARE += []

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASE = env("DATABASE")

DATABASES = {'default': DATABASE_CONFIG["prod"][DATABASE]}

FORCE_SCRIPT_NAME = '/base'