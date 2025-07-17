from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "CI/CD working!"}

@app.get("/ping")
def ping():
    return {"pong": True}
