from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import spacy

app = FastAPI(docs_url="/api/docs")


@app.get("/api/fastapi/check")
def checker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NLPMessage(BaseModel):
    message: str

class NLPAction(BaseModel):
    action: str

class EventObject(BaseModel):
    id: str
    user_id: str
    title: str
    start: str
    end: str
    allDay: bool

# in-memory storage for events
events = {}

# nlp model using spacy
nlp = spacy.load("en_core_web_sm")

# Receives JSON from client that has events data
# and stores it in the events list
@app.post("/api/fastapi/events")
def create_event(input_events: List[EventObject]):
    for event in input_events:
        events[event.id] = event
    return {"status": "success", "message": "Event added successfully"}

@app.get("/api/fastapi/events")
def get_events():
    return events

@app.get("/api/fastapi/event/{event_id}")
def get_event(event_id: int):
    return events[event_id]

@app.delete("/api/fastapi/event/{event_id}")
def delete_event(event_id: int):
    del events[event_id]
    return {"status": "success", "message": "Event deleted successfully"}

@app.put("/api/fastapi/event/{event_id}")
def update_event(event_id: int, event: EventObject):
    events[event_id] = event
    return {"status": "success", "message": "Event updated successfully"}




