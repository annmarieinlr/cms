export class Contact {
    constructor(
        public id: number, 
        public name: NamedCurve, 
        public email: string, 
        public phone: string, 
        public imageUrl: string, 
        public group: []) {}
}