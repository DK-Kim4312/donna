export interface DonnaDateConstructor {
    new (...args: any[]): DateInterface;
  }
  
  export class DateInterface {
    constructor(...args: any[]);
  
    setTimezoneOffset(offset: number): DateInterface;
  
    setTimezoneName(zoneName: string): DateInterface;
  
    clone(): DateInterface;
  
    toDate(): Date;
  
    getTime(): number;
  
    getTimezoneOffset(): number;
  
    getYear(): number;
  
    getMonth(): number;
  
    getDate(): number;
  
    getHours(): number;
  
    getMinutes(): number;
  
    getSeconds(): number;
  
    getDay(): number;
  
    setTime(time: number): number;
  
    setYear(year: number, month?: number, date?: number): number;
  
    setMonth(month: number, date?: number): number;
  
    setDate(date: number): number;
  
    setHours(hours: number, min?: number, sec?: number): number;
  
    setMinutes(min: number, sec?: number): number;
  
    setSeconds(sec: number): number;
  
    toString(): string;
  }
  
  export class LocalDate extends DateInterface {}
  export class UTCDate extends DateInterface {}
  export class MomentDate extends DateInterface {
    static setMoment(moment: any): DonnaDateConstructor;
  }
  