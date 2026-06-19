from datetime import datetime
from sqlmodel import SQLModel


class CommentCreate(SQLModel):
    content: str


class CommentRead(SQLModel):
    id: int
    content: str
    created_at: datetime
    author_id: int
    author_username: str
    author_avatar_url: str | None = None
    post_id: int