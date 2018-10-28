import { DefaultTime } from './default-time.type';

export class Time {
    private _value: string;
    private _hour: string;
    private _minutes: string;

    /**
     * Getter meridian
     * @return {string}
     */
	public get meridian(): string {
		return this._meridian;
	}

    /**
     * Setter meridian
     * @param {string} value
     */
	public set meridian(value: string) {
		this._meridian = value;
	}
    private _meridian: string;


    /**
     * Getter value
     * @return {string}
     */
	public get value(): string {
		return this._value;
	}

    /**
     * Setter value
     * @param {string} value
     */
	public set value(value: string) {
		this._value = value;
	}

    /**
     * Getter hour
     * @return {string}
     */
	public get hour(): string {
		return this._hour;
	}

    /**
     * Setter hour
     * @param {string} value
     */
	public set hour(value: string) {
		this._hour = value;
	}

    /**
     * Getter minutes
     * @return {string}
     */
	public get minutes(): string {
		return this._minutes;
	}

    /**
     * Setter minutes
     * @param {string} value
     */
	public set minutes(value: string) {
		this._minutes = value;
    }
    
    initialize() {
        this.hour = DefaultTime._hour;
        this.minutes = DefaultTime._minutes;
        this.meridian = DefaultTime._meridian;
        this.value = DefaultTime._value;
    }

  }