
import dotenv
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
dotenv.load_dotenv()

from fastapi import FastAPI, HTTPException
from database import engine
from routes import games, auth, actions
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(games.router, prefix='/api')
app.include_router(auth.router, prefix='/api')
app.include_router(actions.router, prefix='/api')

@app.get("/api/{full_path:path}")
def api_404():
    raise HTTPException(status_code=404, detail="Endpoint not found!")

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/{full_path:path}")
async def serve_spa():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)