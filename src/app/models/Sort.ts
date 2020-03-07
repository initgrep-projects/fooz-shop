export class Sort {
    private type: string;
    private label: string;
    private icon: string;

    constructor(type: string, label: string, icon: string){
        this.type = type;
        this.label = label;
        this.icon = icon;
    }

    getType(){
        return this.type;
    }

    getLabel(){
        return this.label;
    }

    getIcon(){
        return this.icon;
    }
}