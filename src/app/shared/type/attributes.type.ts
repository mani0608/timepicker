import { TimeDefaults } from './time-defaults.type';
import { Time } from './time.type';
import { CLOCk_TYPES, CLOCK_VIEWS } from '../constant/app-constants';

export class Attributes {
  private _lineX2: number;
  private _lineY2: number;
  private _bgCX: number;
  private _bgCY: number;
  private _fgCX: number;
  private _fgCY: number;
  private _isMouseDown: boolean;
  private _isMouseMoved: boolean;
  private _toggleView: number;
  private _x0: number;
  private _y0: number;
  private _dx: number;
  private _dy: number;
  private _timeDefaults: TimeDefaults;
  private _clockView: number;
  private _clockType: number;
  private _selectedTime: Time;

  constructor() {
    this._timeDefaults = new TimeDefaults();
    this._selectedTime = new Time();
  }

  /**
   * Getter lineX2
   * @return {number}
   */
  public get lineX2(): number {
    return this._lineX2;
  }

  /**
   * Setter lineX2
   * @param {number} value
   */
  public set lineX2(value: number) {
    this._lineX2 = value;
  }

  /**
   * Getter lineY2
   * @return {number}
   */
  public get lineY2(): number {
    return this._lineY2;
  }

  /**
   * Setter lineY2
   * @param {number} value
   */
  public set lineY2(value: number) {
    this._lineY2 = value;
  }

  /**
   * Getter bgCX
   * @return {number}
   */
  public get bgCX(): number {
    return this._bgCX;
  }

  /**
   * Setter bgCX
   * @param {number} value
   */
  public set bgCX(value: number) {
    this._bgCX = value;
  }

  /**
   * Getter bgCY
   * @return {number}
   */
  public get bgCY(): number {
    return this._bgCY;
  }

  /**
   * Setter bgCY
   * @param {number} value
   */
  public set bgCY(value: number) {
    this._bgCY = value;
  }

  /**
   * Getter fgCX
   * @return {number}
   */
  public get fgCX(): number {
    return this._fgCX;
  }

  /**
   * Setter fgCX
   * @param {number} value
   */
  public set fgCX(value: number) {
    this._fgCX = value;
  }

  /**
   * Getter fgCY
   * @return {number}
   */
  public get fgCY(): number {
    return this._fgCY;
  }

  /**
   * Setter fgCY
   * @param {number} value
   */
  public set fgCY(value: number) {
    this._fgCY = value;
  }

  /**
   * Getter timeDefaults
   * @return {TimeDefaults}
   */
  public get timeDefaults(): TimeDefaults {
    return this._timeDefaults;
  }

  /**
   * Setter timeDefaults
   * @param {TimeDefaults} value
   */
  public set timeDefaults(value: TimeDefaults) {
    this._timeDefaults = value;
  }

  /**
   * Getter clockView
   * @return {number}
   */
  public get clockView(): number {
    return this._clockView;
  }

  /**
   * Setter clockView
   * @param {number} value
   */
  public set clockView(value: number) {
    this._clockView = value;
  }

  /**
   * Getter clockType
   * @return {number}
   */
  public get clockType(): number {
    return this._clockType;
  }

  /**
   * Setter clockType
   * @param {number} value
   */
  public set clockType(value: number) {
    this._clockType = value;
  }

  /**
   * Getter selectedTime
   * @return {Time}
   */
  public get selectedTime(): Time {
    return this._selectedTime;
  }

  /**
   * Setter selectedTime
   * @param {Time} value
   */
  public set selectedTime(value: Time) {
    this._selectedTime = value;
  }

     /**
     * Getter isMouseDown
     * @return {boolean}
     */
	public get isMouseDown(): boolean {
		return this._isMouseDown;
	}

    /**
     * Setter isMouseDown
     * @param {boolean} value
     */
	public set isMouseDown(value: boolean) {
		this._isMouseDown = value;
	}

    /**
     * Getter isMouseMoved
     * @return {boolean}
     */
	public get isMouseMoved(): boolean {
		return this._isMouseMoved;
	}

    /**
     * Setter isMouseMoved
     * @param {boolean} value
     */
	public set isMouseMoved(value: boolean) {
		this._isMouseMoved = value;
	}

    /**
     * Getter toggleView
     * @return {number}
     */
	public get toggleView(): number {
		return this._toggleView;
	}

    /**
     * Setter toggleView
     * @param {number} value
     */
	public set toggleView(value: number) {
		this._toggleView = value;
	}


    /**
     * Getter x0
     * @return {number}
     */
	public get x0(): number {
		return this._x0;
	}

    /**
     * Setter x0
     * @param {number} value
     */
	public set x0(value: number) {
		this._x0 = value;
	}

    /**
     * Getter y0
     * @return {number}
     */
	public get y0(): number {
		return this._y0;
	}

    /**
     * Setter y0
     * @param {number} value
     */
	public set y0(value: number) {
		this._y0 = value;
  }


    /**
     * Getter dx
     * @return {number}
     */
	public get dx(): number {
		return this._dx;
	}

    /**
     * Setter dx
     * @param {number} value
     */
	public set dx(value: number) {
		this._dx = value;
	}

    /**
     * Getter dy
     * @return {number}
     */
	public get dy(): number {
		return this._dy;
	}

    /**
     * Setter dy
     * @param {number} value
     */
	public set dy(value: number) {
		this._dy = value;
	}


  initialize() {
    this.clockView = CLOCK_VIEWS.HOUR;
    this.clockType = CLOCk_TYPES.SIMPLE;
    this.selectedTime.initialize();
    this.lineX2 = 0;
    this.lineY2 = 0;
    this.bgCX = 0;
    this.bgCY = 0;
    this.fgCX = 0;
    this.fgCY = 0;
    this.isMouseDown = false;
    this.isMouseMoved = false;
    this.timeDefaults.initialize();
  }

}