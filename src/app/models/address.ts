import { add, isNull } from 'lodash';

export class Address {
    constructor(
        private id: string,
        private userId: string,
        private name: string,
        private phone: string,
        private street: string,
        private country: string,
        private state: string,
        private city: string,
        private zipcode: string,
        private createdDate?: number
    ) {
        console.log('createdData for address = ', this.createdDate);
        if (!this.createdDate) {
            this.createdDate = new Date().getTime();
        }
    }


    get Id() { return this.id; }
    set Id(id: string) { this.id = id; }

    get UserId() { return this.userId; }
    set UserId(id: string) { this.userId = id; }

    get Name() { return this.name; }
    set Name(n: string) { this.name = n; }

    get Phone() { return this.phone; }
    set Phone(ph: string) { this.phone = ph; }

    get Street() { return this.street; }
    set Street(st: string) { this.street = st; }

    get Country() { return this.country; }
    set Country(cnt: string) { this.country = cnt; }

    get City() { return this.city; }
    set City(ct: string) { this.city = ct; }

    get State() { return this.state; }
    set State(st: string) { this.state = st; }

    get ZipCode() { return this.zipcode; }
    set ZipCode(zip: string) { this.zipcode = zip; }

    get CreatedDate() { return this.createdDate; }
    set CreatedDate(t: number) { this.createdDate = t; }

    equals(ad: Address) {
        if (isNull(ad) || isNull(this)) {
            return false;
        }
        return this.Id === ad.Id
            && this.UserId === ad.UserId
            && this.Name === ad.Name
            && this.Phone === ad.Phone
            && this.Street === ad.Street
            && this.Country === ad.Country
            && this.State === ad.State
            && this.City === ad.City
            && this.ZipCode === ad.ZipCode;

    }
}