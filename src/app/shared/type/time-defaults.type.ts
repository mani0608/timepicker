export class TimeDefaults {
    private _fromnow: number;
    private _donetext: string;
    private _autoclose: number;
    private _dialRadius: number;
    private _outerRadius: number;
    private _innerRadius: number;
    private _tickRadius: number;
    private _diameter: number;
    private _duration: number;

    /**
     * Getter fromnow
     * @return {number}
     */
    public get fromnow(): number {
        return this._fromnow;
    }

    /**
     * Setter fromnow
     * @param {number} value
     */
    public set fromnow(value: number) {
        this._fromnow = value;
    }

    /**
     * Getter donetext
     * @return {string}
     */
    public get donetext(): string {
        return this._donetext;
    }

    /**
     * Setter donetext
     * @param {string} value
     */
    public set donetext(value: string) {
        this._donetext = value;
    }

    /**
     * Getter autoclose
     * @return {number}
     */
    public get autoclose(): number {
        return this._autoclose;
    }

    /**
     * Setter autoclose
     * @param {number} value
     */
    public set autoclose(value: number) {
        this._autoclose = value;
    }

    /**
     * Getter dialRadius
     * @return {number}
     */
    public get dialRadius(): number {
        return this._dialRadius;
    }

    /**
     * Setter dialRadius
     * @param {number} value
     */
    public set dialRadius(value: number) {
        this._dialRadius = value;
    }

    /**
     * Getter outerRadius
     * @return {number}
     */
    public get outerRadius(): number {
        return this._outerRadius;
    }

    /**
     * Setter outerRadius
     * @param {number} value
     */
    public set outerRadius(value: number) {
        this._outerRadius = value;
    }

    /**
     * Getter innerRadius
     * @return {number}
     */
    public get innerRadius(): number {
        return this._innerRadius;
    }

    /**
     * Setter innerRadius
     * @param {number} value
     */
    public set innerRadius(value: number) {
        this._innerRadius = value;
    }

    /**
     * Getter tickRadius
     * @return {number}
     */
    public get tickRadius(): number {
        return this._tickRadius;
    }

    /**
     * Setter tickRadius
     * @param {number} value
     */
    public set tickRadius(value: number) {
        this._tickRadius = value;
    }

    /**
     * Getter diameter
     * @return {number}
     */
    public get diameter(): number {
        return this._diameter;
    }

    /**
     * Setter diameter
     * @param {number} value
     */
    public set diameter(value: number) {
        this._diameter = value;
    }

    /**
     * Getter duration
     * @return {number}
     */
    public get duration(): number {
        return this._duration;
    }

    /**
     * Setter duration
     * @param {number} value
     */
    public set duration(value: number) {
        this._duration = value;
    }

    initialize() {
        this.fromnow = 0;
        this.donetext = 'Done';
        this.autoclose = 0;
        this.dialRadius = 100;
        this.outerRadius = 80;
        this.innerRadius = 54;
        this.tickRadius = 13;
        this.diameter = this.dialRadius * 2;
        this.duration = 1;
    }

}