export class Brand {
    constructor(
        private name: string,
        private logo: string,
        private country: string,
        private phones: string[] = [],
        private emails: string[] = [],
        private instagram?: string,
        private facebook?: string,
        private twitter?: string,
        private pinterest?: string

    ) { }

    get Name() { return this.name; }
    set Name(n: string) { this.name = n; }
    get Logo() { return this.logo; }
    set Logo(l: string) { this.logo = l; }
    get Country() { return this.country; }
    set Country(c: string) { this.country = c; }
    get Phones() { return this.phones; }
    set Phones(p: string[]) { this.phones = [...p]; }
    set Phone(p: string) { this.phones.push(p); }
    get Emails() { return this.emails; }
    set Emails(e: string[]) { this.emails = [...e]; }
    set Email(e: string) { this.emails.push(e); }

    get Instagram() { return this.instagram; }
    set Instagram(i: string) { this.instagram = i; }
    get Facebook() { return this.facebook; }
    set Facebook(f: string) { this.facebook = f; }
    get Twitter() { return this.twitter; }
    set Twitter(t: string) { this.twitter = t; }
    get Pinterest() { return this.pinterest; }
    set Pinterest(pt: string) { this.pinterest = pt; }

}