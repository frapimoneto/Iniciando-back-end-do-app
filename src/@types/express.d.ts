// Adicionando a uma tipagem do expresss já existente

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        }
    }
}