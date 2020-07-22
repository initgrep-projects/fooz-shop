export class Brand{
    constructor(
        private name:string,
        private logo: string,
        private country: string,

    ){}

    get Name(){return this.name;}
    set Name(n:string){this.name = n;}
    get Logo(){return this.logo;}
    set Logo(l: string){this.logo = l;}
    get Country(){ return this.country;}
    set Country(c:string){this.country = c;}
    
}