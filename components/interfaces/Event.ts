export interface DonnaEventConstructor {
    new (...args: any[]): EventInterface;
  }
  
  export class EventInterface {
    constructor(...args: any[]);

    clone(): EventInterface;

    getDuration(): number;
  
    getStartTimezoneOffset(): number;

    getEndTimezoneOffset(): number;

    setDuration(duration: number): number;
  
    toString(): string;
  }
  
  export class LocalDate extends DateInterface {}
  export class UTCDate extends DateInterface {}
  export class MomentDate extends DateInterface {
    static setMoment(moment: any): TuiDateConstructor;
  }
  