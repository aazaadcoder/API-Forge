"use server"

import { auth } from "@/lib/auth"
import db from "@/lib/db"
import { headers } from "next/headers"

export const currentUser = async () =>{
    try {
        const session = await auth.api.getSession({
            headers : await headers()
        })

        if(!session?.user?.id) return null;

        const userData = await db.user.findUnique({
            where :{
                id : session.user.id
            },
            select :{
                id : true,
                email : true,
                name : true,
                image : true, 
                createdAt : true, 
                updatedAt : true,
            }
        })

        return userData;
    } catch (error) {
        console.log("Error fetching user data: ", error);
        return null;
    }
}