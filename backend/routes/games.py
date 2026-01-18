from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session, aliased
from sqlalchemy import and_, exists, func
from injections import get_current_user, get_current_user_optional, get_db
import models

router = APIRouter()

@router.get("/games")
def get_games(db: Session = Depends(get_db)):
    games = db.query(
        models.Game,
        func.avg(models.Score.score).label('average_score'),
        func.count(models.favorites.c.user_id).label('favorites_count')
    ).outerjoin(
        models.Score, models.Game.id == models.Score.game_id
    ).outerjoin(
        models.favorites, models.Game.id == models.favorites.c.game_id
    ).group_by(
        models.Game.id
    ).all()
    
    result = []
    for game, avg_score, fav_count in games:
        result.append({
            "id": game.id,
            "title": game.title,
            "description": game.description,
            "year": game.year,
            "average_score": round(avg_score, 2) if avg_score else None,
            "favorites_count": fav_count
        })
    
    return result

@router.get("/favorites")
def get_favorites(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):

    user_favorited = exists().where(
        and_(
            models.favorites.c.game_id == models.Game.id,
            models.favorites.c.user_id == current_user.id
        )
    ).correlate(models.Game)

    games = db.query(
        models.Game,
        func.avg(models.Score.score).label('average_score'),
        func.count(models.favorites.c.user_id).label('favorites_count')
    ).outerjoin(
        models.Score, 
        models.Game.id == models.Score.game_id
    ).outerjoin(
        models.favorites, 
        models.Game.id == models.favorites.c.game_id
    ).filter(
        user_favorited
    ).group_by(
        models.Game.id
    ).all()

    result = []
    for game, avg_score, fav_count in games:
        result.append({
            "id": game.id,
            "title": game.title,
            "description": game.description,
            "year": game.year,
            "average_score": round(avg_score, 2) if avg_score else None,
            "favorites_count": fav_count
        })
    
    return result

@router.get("/game/{id}")
def get_game(id: int, 
             db: Session = Depends(get_db),
             current_user: models.User = Depends(get_current_user_optional),
             ):
    game = db.query(
        models.Game,
        func.avg(models.Score.score).label('average_score'),
        func.count(models.favorites.c.user_id).label('favorites_count')
    ).where(
        models.Game.id == id
    ).outerjoin(
        models.Score, models.Game.id == models.Score.game_id
    ).outerjoin(
        models.favorites, models.Game.id == models.favorites.c.game_id
    ).group_by(
        models.Game.id
    ).first()

    comments = db.query(
        models.Comment.id,
        models.Comment.text,
        models.User.username,
    ).where(
        models.Comment.game_id == id
    ).join(
        models.User
    ).all()

    comments = [{
        "id": id,
        "text": text,
        "username": username
    } for id, text, username in comments]

    if game is None:
        raise HTTPException(status_code=404, detail="Game not found...")
    
    user_score = None
    if current_user is not None:
        user_score = db.query(
            models.Score.score
        ).where(
            models.Score.game_id == id,
            models.Score.user_id == current_user.id
        ).first()
        if user_score: user_score = user_score[0]

    game, avg_score, fav_count = game
    result = {
        "id": game.id,
        "title": game.title,
        "description": game.description,
        "year": game.year,
        "comments": comments,
        "average_score": round(avg_score, 2) if avg_score else None,
        "favorites_count": fav_count,
        "user_score": user_score
    }
    
    return result