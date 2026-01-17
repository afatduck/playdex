from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from injections import create_access_token, get_current_user
from utils import verify_password, hash_password
from injections import get_db

import models

router = APIRouter()

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password): # type: ignore
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register")
def register(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if len(form_data.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long!")

    user = models.User(
        username=form_data.username,
        hashed_password=hash_password(form_data.password)
    )
    
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Username already taken!")    

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def read_users_me(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    favorites = db.query(
        models.favorites.c.game_id
    ).where(
        models.favorites.c.user_id == current_user.id
    ).all()

    favorites = [{
        "game_id": game_id
    } for game_id, in favorites]

    return {
        "id": current_user.id,
        "username": current_user.username,
        "favorites": favorites
    }