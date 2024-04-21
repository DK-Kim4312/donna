import spacy from "spacy";
import { Event } from "../types/Event";
import React, { useState } from "react";

export async function processText(text: string): Promise<{ intent: string; details: Event }> {
    const nlp = await spacy.load("en_core_web_sm");
    const doc = await nlp(text);

    let intent = "";
    const details = [] as string[];
    
    for ( const token of doc ) {
        const lemma = token.lemma_.toLowerCase();
        if (lemma === "create" || lemma === "add") {
            intent = "CREATE";
        } else if (lemma === "delete") {
            intent = "DELETE";
        } else if (lemma === "update" || lemma === "edit" || lemma === "modify" || lemma === "change" ) {
            intent = "UPDATE";
        } else if ( token.pos === "NOUN" ) {
            details.push(token.text.toLowerCase());
        }
    }
    return { intent, details };
}

export async function handleRequest(text: string, events : Event[]): Promise< { response: string, action: string, event_id: string, new_event: Event } > {
    const { intent, details } = await processText(text);

    let response = "";
    let action = "";
    let event_id = "";
    let new_event = {} as Event;

    if (intent === "CREATE") {
        new_event = {
            title: details.join(" "),
            start: new Date(),
            end: new Date(),
            allDay: false
        };
        new_event.title = details.join(" ");
        new_event.start = new Date();
        new_event.end = new Date();
        new_event.allDay = false;
        response = `Event ${new_event.title} created`;
        action = "CREATE";

        // return the event to be created
    } else if (intent === "DELETE") {
        action = "DELETE";

        for(const event of events) {
            for(const detail of details) {
                if (event.name.toLowerCase().includes(detail)) {
                    // return the event to be deleted
                    response = `Delete Event ${event.name} `;
                    action = "DELETE";
                    event_id = event.id;
                    break;
                }
            }
            if( response !== "" ) {
                break;
            }
        }
        if (response === "") {
            response = "No event found matching description";
        }

    } else if (intent === "UPDATE") {
        action = "UPDATE";
        for(const event of events) {
            for(const detail of details) {
                if (event.name.toLowerCase().includes(detail)) {
                    // return the event to be updated
                    response = `Update Event ${event.name} `;
                    action = "UPDATE";
                    event_id = event.id;
                    break;
                }
            }
            if( response !== "" ) {
                break;
            }
        }
        if (response === "") {
            response = "No event found matching description";
        }
    }
    return { response, action, event_id, new_event };
}




