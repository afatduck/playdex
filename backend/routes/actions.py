from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy import delete
from sqlalchemy.dialects.sqlite import insert
from injections import get_current_user, get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, NoReferencedColumnError
import models

router = APIRouter()

@router.put("/mark_favorite/{game_id}")
def mark_favorite(
    game_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    try:
        stmt = insert(models.favorites).values(
            user_id=current_user.id,
            game_id=game_id
        )
        db.execute(stmt)
        db.commit()
    except IntegrityError as e:
        error_msg = str(e.orig).lower()
        if "foreign key" in error_msg or "fk_" in error_msg:
            raise HTTPException(status_code=400, detail="Game does not exist!")

        raise HTTPException(status_code=400, detail="Alrediy marked as favorite!")
    
    return {"message": "success"}

@router.put("/unmark_favorite/{game_id}")
def unmark_favorite(
    game_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    stmt = delete(models.favorites).where(
        models.favorites.c.user_id == current_user.id,
        models.favorites.c.game_id == game_id
    )
    result = db.execute(stmt)
    db.commit()

    if result.rowcount == 0: # type: ignore
        raise HTTPException(status_code=400, detail="Not marked favorite!")
    
    return {"message": "success"}

@router.post("/score/{game_id}")
def score(
    game_id: int,
    score: int = Form(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if score and (score < 1 or score > 5):
        raise HTTPException(status_code=400, detail="Score must be between 1 and 5.")

    try:
        stmt = insert(models.Score).values(
            user_id=current_user.id,
            game_id=game_id,
            score=score
        ).on_conflict_do_update(
            index_elements=['user_id', 'game_id'],
            set_={'score': score}
        )

        db.execute(stmt)
        db.commit()

    except IntegrityError:
        raise HTTPException(status_code=400, detail="Game does not exist!")
    
    return {"message": "success"}

@router.post("/comment/{game_id}")
def comment(
    game_id: int,
    text: str = Form(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    try:
        stmt = insert(models.Comment).values(
            user_id=current_user.id,
            game_id=game_id,
            text=text
        )

        db.execute(stmt)
        db.commit()

    except IntegrityError:
        raise HTTPException(status_code=400, detail="Game does not exist!")
    
    return {"message": "success"}
