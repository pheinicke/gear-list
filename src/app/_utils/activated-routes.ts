import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { mapNotNull } from './operators';

export function param(route: ActivatedRoute, name: string): Observable<string> {
    return route.paramMap.pipe(mapNotNull((params) => params.get(name)));
}
