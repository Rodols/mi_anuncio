import { Pipe, PipeTransform } from '@angular/core';
import { Ad } from '../Models/ad.interface';

@Pipe({
  name: 'filterAds',
})
export class FilterAdsPipe implements PipeTransform {
  transform(value: Ad[], args: string): Ad[] {
    const resultAd = [];
    let title: string = '';

    for (const ad of value) {
      if (args.length > 2) {
        title = ad.title.toUpperCase();
        if (title.indexOf(args.toUpperCase()) > -1) {
          resultAd.push(ad);
        }
      } else {
        return;
      }
    }
    return resultAd;
  }
}
