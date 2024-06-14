export class Message {
    constructor (
        public id: string, //represents the id of the message
        public subject: string,
        public msgText: string,
        public sender: string

    ) {}
}