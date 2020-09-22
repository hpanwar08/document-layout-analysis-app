from flask_wtf import FlaskForm

from flask_wtf.file import FileField, FileRequired
from wtforms import SubmitField


class ImageUploadForm(FlaskForm):
    image = FileField()
    submit = SubmitField(label="submit")