import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'nl2br',
})
export class Nl2brPipe implements PipeTransform {
	transform(value: string): string {
		const breakTag = '<br>';
		return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}
}
