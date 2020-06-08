export class User {
    constructor(
        private uid: string,
        private email?: string,
        private name?: string,
        private isEmailVerified?: boolean,
        private phoneNumber?: string,
        private isAnonymous: boolean = true,
        private photoURL?: string,
        private roles: string[] = ['user']
    ) { }

    get UID() { return this.uid; }
    set UID(uid: string) { this.uid = uid; }
    get Name() { return this.name; }
    set Name(name: string) { this.name = name; }
    get Email() { console.log('email = ', this.email); return this.email; }
    set Email(e: string) { this.email = e; }

    get IsEmailVerified() { return this.isEmailVerified; }
    set IsEmailVerified(iev: boolean) { this.isEmailVerified = iev; }
    get PhoneNumber() { return this.phoneNumber; }
    set PhoneNumber(p: string) { this.phoneNumber = p; }
    get IsAnonymous() { return this.isAnonymous; }
    set IsAnonymous(ia: boolean) { this.isAnonymous = ia; }
    get PhotoURL() { return this.photoURL; }
    set PhotoURL(url: string) { this.photoURL = url; }

    get Roles() { return this.roles; };
    set Roles(roles: string[]) { this.roles = roles; }
    addRole(role: string) { this.roles.push(role); }
}