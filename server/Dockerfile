FROM python:3.11-slim

# set working directory in the container
WORKDIR /app

# set environment variables
ENV SQLALCHEMY_DATABASE_URI=postgresql://test_user:test_password@localhost:5432/test_db
ENV FLASK_APP=app.py

# creates directory
ADD ./ /app/
# COPY . .

# install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends

# install Python dependencies
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["flask", "app.py"]
# CMD ["python", "hello_world.py"]