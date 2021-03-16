import os
MAIL_DEFAULT_SENDER = 'yuyingsudevtesting@gmail.com'
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USERNAME = 'yuyingsudevtesting@gmail.com'
MAIL_PASSWORD = 'OrangeCat1994'
MAIL_USE_TLS = False
MAIL_USE_SSL = True

SECRET_KEY= 'orange cat the best'
SECURITY_PASSWORD_SALT= 'iloveorangecat'

SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///data.db")
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = True

UPLOADED_IMAGES_DEST = os.path.join("static", "images")  # manage root folder

JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = [
    "access",
    "refresh",
] 