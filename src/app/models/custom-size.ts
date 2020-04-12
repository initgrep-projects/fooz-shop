export class CustomSize {

    constructor(
        private width: number = 0,
        private length: number = 0,
        private bust: number = 0,
        private arm: number = 0,
        private hip: number = 0) { }

    getWidth() { return this.width; }
    setWidth(w: number) { this.width = w; }
    getLength() { return this.length; }
    setLength(l: number) { this.length = l; }
    getBust() { return this.bust; }
    setBust(b: number) { this.bust = b; }
    getArm() { return this.arm; }
    setArm(a: number) { this.arm = a; }
    getHip() { return this.hip; }
    setHip(h: number) { this.hip = h; }


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
