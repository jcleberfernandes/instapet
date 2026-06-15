from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db
from routers import auth, users, posts


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("CRIANDO BANCO...")
    create_db()
    yield


app = FastAPI(title="InstaPet", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)


@app.get("/")
def root():
    return {"message": "InstaPet 🐾"}