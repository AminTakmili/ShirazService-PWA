import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidationErrors, FormControl } from '@angular/forms';

@Component({
	selector: 'app-validator',
	templateUrl: './validator.component.html',
	styleUrls: ['./validator.component.scss'],
})
export class ValidatorComponent implements OnInit {
	@Input()
	controlName: string;

	@Input()
	control: FormControl;

	config = {};

	get errorText() {
		return this.chkError(this.control.errors);
	}

	constructor() { }

	ngOnInit() {
		this.config = {
			required: `${this.controlName} ضروری است.`,
			email: `${this.controlName} معتبر نیست.`,
		};
	}

	chkError(errors: ValidationErrors) {
		if (this.control.touched || this.control.dirty) {
			if (errors !== null) {
				for (const error in errors) {
					if (this.config[error] !== undefined) {
						return this.config[error];
					} else {
						return '';
					}
				}
			} else {
				return '';
			}
		}
	}
}
