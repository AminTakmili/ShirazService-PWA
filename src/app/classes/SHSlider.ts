export class SHSlider {
	private _serviceId: number;
	public get serviceId(): number {
		return this._serviceId;
	}
	public set serviceId(value: number) {
		this._serviceId = value;
	}
	private _desc: string;
	public get desc(): string {
		return this._desc;
	}
	public set desc(value: string) {
		this._desc = value;
	}
	private _picAddress: string;
	public get picAddress(): string {
		return this._picAddress;
	}
	public set picAddress(value: string) {
		this._picAddress = value;
	}
}
