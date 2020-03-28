export class CustomSize {

    constructor(
        private width: number,
        private length: number,
        private bust: number,
        private arm: number,
        private hip: number) { }
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
