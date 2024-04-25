#!/bin/bash

#Flask-Migrate
flask db upgrade

exec gunicorn --bind 0.0.0.0:8000 application:app