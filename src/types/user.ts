export default interface User {
id?: number;
firstName: string;
lastName: string;
phone: string;
email: string;
[key: string]: any; // extensibility support
}