FROM python:3.12.0a1-slim-bullseye

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /django_backend

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
    
 # Install dependencies
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .