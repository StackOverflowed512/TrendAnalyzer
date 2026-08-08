from sqlalchemy import Column, Integer, String, Text, JSON
from app.database.session import Base

class Template(Base):
    __tablename__ = "templates"

    id = Column(Integer, primary_key=True, index=True)
    template_name = Column(String, index=True)
    structure = Column(JSON)
    description = Column(Text)
    category = Column(String, index=True)
