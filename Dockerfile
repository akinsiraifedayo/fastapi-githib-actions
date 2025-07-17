
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app .

EXPOSE 80

ENV NAME=olympicson-fastapi-docker

# Set the maintainer label
LABEL maintainer="olympicson <akinsiraolympicson@gmail.com>"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]





