from fastapi import FastAPI

app = FastAPI(docs_url="/api/docs")


@app.get("/api/fastapi/check")
def checker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}
