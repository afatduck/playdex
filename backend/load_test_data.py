from sqlalchemy import insert
from utils import hash_password
import models
import json
from database import SessionLocal, engine

ROOT_DIR = "./test_data/"

def populate_games():

    db = SessionLocal()
    with open(ROOT_DIR + "games.json", "r") as data:
        games = json.load(data)

        for game in games:
            game = models.Game(
                title = game["title"],
                description = game["description"],
                year = game["year"]
            )
            db.add(game)

        db.commit()
        print("Successfully added games.")

def populate_users():

    db = SessionLocal()
    with open(ROOT_DIR + "users.json", "r") as data:
        users = json.load(data)

        for user in users:
            user = models.User(
                username = user["username"],
                hashed_password = "🎸",
            )
            db.add(user)

        db.commit()
        print("Successfully added users.")

def populate_favorites():

    db = SessionLocal()
    with open(ROOT_DIR + "favorites.json", "r") as data:
        favorites = json.load(data)

        for fav in favorites:
            stmt = insert(models.favorites).values(
                user_id=fav['user_id'],
                game_id=fav['game_id']
            )
            db.execute(stmt)

        db.commit()
        print("Successfully added favorites.")

def populate_scores():

    db = SessionLocal()
    with open(ROOT_DIR + "scores.json", "r") as data:
        scores = json.load(data)

        for score in scores:
            score = models.Score(
                user_id = score["user_id"],
                game_id = score["game_id"],
                score = score["score"]
            )
            db.add(score)

        db.commit()
        print("Successfully added scores.")

def populate_comments():

    db = SessionLocal()
    with open(ROOT_DIR + "comments.json", 'r') as f:
        comments = json.load(f)
    
        for comment in comments:
            comment = models.Comment(
                user_id=comment['user_id'],
                game_id=comment['game_id'],
                text=comment['text']
            )
            db.add(comment)
    
    db.commit()
    print("Successfully added comments.")

if __name__ == "__main__":
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)

    populate_games()
    populate_users()
    populate_favorites()
    populate_scores()
    populate_comments()