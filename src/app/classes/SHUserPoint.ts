export class SHUserPoint {
	private _id: number;
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}
	private _reasonType: number;
	public get reasonType(): number {
		return this._reasonType;
	}
	public set reasonType(value: number) {
		this._reasonType = value;
	}
	private _reasonTitle: string;
	public get reasonTitle(): string {
		return this._reasonTitle;
	}
	public set reasonTitle(value: string) {
		this._reasonTitle = value;
	}
	private _point: number;
	public get point(): number {
		return this._point;
	}
	public set point(value: number) {
		this._point = value;
	}
	private _sumPoint: number;
	public get sumPoint(): number {
		return this._sumPoint;
	}
	public set sumPoint(value: number) {
		this._sumPoint = value;
	}
	private _insrtTimeFullPersian: string;
	public get insrtTimeFullPersian(): string {
		return this._insrtTimeFullPersian;
	}
	public set insrtTimeFullPersian(value: string) {
		this._insrtTimeFullPersian = value;
	}
	private _insrtTimeSmallPersian: string;
	public get insrtTimeSmallPersian(): string {
		return this._insrtTimeSmallPersian;
	}
	public set insrtTimeSmallPersian(value: string) {
		this._insrtTimeSmallPersian = value;
	}
	private _insrtTime: number;
	public get insrtTime(): number {
		return this._insrtTime;
	}
	public set insrtTime(value: number) {
		this._insrtTime = value;
	}
}
