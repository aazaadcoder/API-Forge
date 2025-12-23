import { PrismaClient } from './../generated/prisma/client';
import {PrismaPg} from '@prisma/adapter-pg'

declare global{
    var prisma  : PrismaClient | undefined;
    var prismaPgAdapter : PrismaPg | undefined;

}

const connectionString = `${process.env.DATABASE_URL}`

const adapter = globalThis.prismaPgAdapter || new PrismaPg({connectionString});
const db = globalThis.prisma || new PrismaClient({adapter});

if(process.env.NODE_ENV === 'development'){
    globalThis.prismaPgAdapter = adapter;
    globalThis.prisma = db;
}

export default db;