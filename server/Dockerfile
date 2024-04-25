FROM python:3.11-slim-bookworm

# set working directory in the container
WORKDIR /app

COPY requirements.txt .

# install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && apt-get -y install libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

# install Python dependencies
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "application:app"]
# CMD ["/bin/bash", "/app/entrypoint.sh"]