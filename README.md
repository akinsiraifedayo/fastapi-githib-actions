# FastAPI + Docker + GitHub Actions CI/CD - With Passing and Failing Tests

This is a minimal but complete FastAPI project containerized with Docker, tested using `pytest`, and integrated with GitHub Actions for CI/CD. It includes:

- A working FastAPI app
- Docker support
- A CI/CD pipeline with GitHub Actions
- Unit tests that PASS and intentionally FAIL
- A skipped test using `@pytest.mark.skip`

Let’s walk through it all.

---

## Full Project Structure
```css
.
|__ app/
|   |__ main.py
|   |__ test_main.py
|__ Dockerfile
|__ requirements.txt
|__ .github/
    |__ workflows/
        |__ tests.yml

```

## 1. The API Server (FastAPI)

We’re starting simple: two GET endpoints, one to check the root, another to test ping.

### `app/main.py`

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "CI/CD working!"}

@app.get("/ping")
def ping():
    return {"pong": True}

```

## 2. Create the test file

We want to create the test file so we can use pytest to simulate fails

### `app/test_main.py`

```python
from fastapi.testclient import TestClient
import pytest
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "CI/CD working!"}

def test_ping_pass():
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"pong": True}

@pytest.mark.skip(reason="This test is temporarily skipped")
def test_ping_fail():
    response = client.get("/ping")
    assert response.status_code == 200
    # Intentionally failing test to verify GitHub Actions Works
    assert response.json() == {"pong": False}

```

## 3. Create the requirements.txt

We want to create the requirements.txt with all the necessary dependencies

### `requirements.txt`
```re
fastapi
uvicorn[standard]
pytest
```

## 4. Dockerize It

We want to containerize the app to run it anywhere, including CI/CD jobs.

### `Dockerfile`

```Dockerfile
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

```

## 5. Test that all the setup is correct

### In your terminal, type the below commands
```bash
# this would build the docker image and give it a tag olympicson/pythonapp:1.0
# using the Dockerfile in the current working directory
docker build -t "olympicson/pythonapp:1.0" .

# then this would start the app on port 8000 and also bind it to port 8000 on your pc
docker run -it -p 8000:8000 "olympicson/pythonapp:1.0"
``` 

## 6. visit [localhost:8000](http://localhost:8000) to see your api server, you should see
```json
{"message": "CI/CD working!"}
```


## 



