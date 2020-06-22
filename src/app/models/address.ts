export class Address {
    constructor(
        private userId: string,
        private name: string,
        private phone: string,
        private street: string,
        private country: string,
        private state: string,
        private city: string,
        private zipcode: string
    ) { }
}