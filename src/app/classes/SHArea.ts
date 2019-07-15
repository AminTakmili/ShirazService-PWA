export class SHArea {
	private _areaId: number;
	public get areaId(): number {
		return this._areaId;
	}
	public set areaId(value: number) {
		this._areaId = value;
	}
	private _areaTitle: string;
	public get areaTitle(): string {
		return this._areaTitle;
	}
	public set areaTitle(value: string) {
		this._areaTitle = value;
	}
	private _areaRatio: number;
	public get areaRatio(): number {
		return this._areaRatio;
	}
	public set areaRatio(value: number) {
		this._areaRatio = value;
	}
}
