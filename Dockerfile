# Use python 3.10 docker image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app .

# Expose port 443 (HTTPS)
EXPOSE 443

# Environment variables
ENV NAME=olympicson-fastapi-docker
LABEL maintainer="olympicson <akinsiraolympicson@gmail.com>"

# Run Uvicorn (certs will be mounted at runtime)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile=/etc/ssl/certs/private/privkey.pem", "--ssl-certfile=/etc/ssl/certs/private/cert.pem"]