export class SHPersonComment {
	private _comment: string;
	public get comment(): string {
		return this._comment;
	}
	public set comment(value: string) {
		this._comment = value;
	}
	private _id: number;
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}
	private _insrtTime: number;
	public get insrtTime(): number {
		return this._insrtTime;
	}
	public set insrtTime(value: number) {
		this._insrtTime = value;
	}
	private _insrtTimePersian: string;
	public get insrtTimePersian(): string {
		return this._insrtTimePersian;
	}
	public set insrtTimePersian(value: string) {
		this._insrtTimePersian = value;
	}
	private _requestId: number;
	public get requestId(): number {
		return this._requestId;
	}
	public set requestId(value: number) {
		this._requestId = value;
	}
	private _serviceTitle: string;
	public get serviceTitle(): string {
		return this._serviceTitle;
	}
	public set serviceTitle(value: string) {
		this._serviceTitle = value;
	}
	private _workmanId: number;
	public get workmanId(): number {
		return this._workmanId;
	}
	public set workmanId(value: number) {
		this._workmanId = value;
	}
	private _workmanName: string;
	public get workmanName(): string {
		return this._workmanName;
	}
	public set workmanName(value: string) {
		this._workmanName = value;
	}
}
