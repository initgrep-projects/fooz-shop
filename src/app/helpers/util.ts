export interface hasEquals {
    equals(a: hasEquals): boolean;
}
//https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
export function isIdentical(a: hasEquals[], b: hasEquals[]) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (!a[i].equals(b[i])) return false;
    }
    return true;
};  


export function generateGuid() {
    var result, i, j;
    result = '';
    for(j=0; j<32; j++) {
      if( j == 8 || j == 12 || j == 16 || j == 20) 
        result = result + '-';
      i = Math.floor(Math.random()*16).toString(16).toUpperCase();
      result = result + i;
    }
    return result;
  }

  export function isEmpty<T>(ts: T[]): boolean {
    return ts.length === 0;
  }

  export function isNull<T>(ob: T): boolean{
    return ob === undefined || ob === null;
  }