
export type Event = {
    id: string ; //uuid
    user_id: string; //uuid
    title: string;
    start: Date | string;
    end: Date | string;
    allDay: boolean;
};
