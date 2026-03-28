declare global {
    namespace App {
        interface Locals {
            user: {
                _id: string;
                name: string;
                email: string;
                createdAt: string;
            } | null;
        }
    }
}

export { }; D