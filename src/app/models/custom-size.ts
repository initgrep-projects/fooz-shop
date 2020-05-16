export class CustomSize {

    constructor(
        private width: number = 0,
        private length: number = 0,
        private bust: number = 0,
        private arm: number = 0,
        private hip: number = 0) { }

    get Width() { return this.width; }
    set Width(w: number) { this.width = w; }
    get Length() { return this.length; }
    set Length(l: number) { this.length = l; }
    get Bust() { return this.bust; }
    set Bust(b: number) { this.bust = b; }
    get Arm() { return this.arm; }
    set Arm(a: number) { this.arm = a; }
    get Hip() { return this.hip; }
    set Hip(h: number) { this.hip = h; }


}

export class CustomSizeInput {
    constructor(
        private width: number[],
        private length: number[],
        private bust: number[],
        private arm: number[],
        private hip: number[]) { }

    get Width() { return this.width; }

    get Length() { return this.length; }

    get Bust() { return this.bust; }

    get Arm() { return this.arm; }

    get Hip() { return this.hip; }
}
