import { Observable } from 'rxjs';

export interface hasEquals {
  equals(a: hasEquals): boolean;
}
//https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
export function isIdentical(a: hasEquals[], b: hasEquals[]) {
  let i = a.length;
  if (i != b.length) return false;
  while (i--) {
    if (!a[i].equals(b[i])) return false;
  }
  return true;
};

export function generateGuid() {
  var result, i, j;
  result = '';
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}

export function isEmpty<T>(ts: T[]): boolean {
  return ts.length === 0;
}

export function isNull<T>(ob: T): boolean {
  return ob === undefined || ob === null;
}

/**
 * 
 * @param state 
 * @param t 
 */
export function isMatched(element: string, searchTerm: string) {
  const c = element.toLowerCase();
  const term = searchTerm.toLowerCase();
  return (c.indexOf(term) !== -1);
}


/**
*  template function to convert a promise<void> to promise<boolean>
* @param promisefn promise<void> type
*/
export function toObservable(promisefn: Promise<void>): Observable<boolean> {
  return new Observable<boolean>(observer => {
    promisefn
      .then(() => {
        observer.next(true);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
}


export function toObservableFromPromise<T>(promisefn: () => Promise<T>): Observable<T> {
  return new Observable<T>(observer => {
    promisefn()
      .then((a) => {
        console.log('toObservableFromPromise then ', a);
        observer.next(a);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
}
