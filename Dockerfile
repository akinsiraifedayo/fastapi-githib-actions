
# use python 3.10 docker image
FROM python:3.10-slim

# use the /app as working dir in container
WORKDIR /app

# copy the requirements.txt to working dir
COPY requirements.txt .

# install all dependencies with pip install
RUN pip install --no-cache-dir -r requirements.txt

# copy main code in the current ./app directory 
# from local to work dir in container
COPY ./app .

# expose port 80 so it can be accessed
EXPOSE 80

# set name env variable
ENV NAME=olympicson-fastapi-docker

# set the maintainer label
LABEL maintainer="olympicson <akinsiraolympicson@gmail.com>"

# finally run the server with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]