import { currentUser } from '@/module/authentication/actions';
"use server"
import db  from '@/lib/db';
import { includes, success } from 'zod';

enum MEMBER_ROLE {
    ADMIN,
    EDITOR,
    VIEWER
}


// initializwe workspace when user vists the home page for the first time 
export const initializeWorkspace = async () => {
    const user = currentUser();

    if (!user) {
        return {
            success: false,
            error: "User not found"
        }
    }

    try {
        const workspace = await db.workspace.upsert({
            where: {
                name_ownerId: {
                    ownerId: user.id,
                    name: "Personal Workspace"
                }
            },
            update: {},
            create: {
                name: "Personl Workspace",
                description: "Default workspace for personal use",
                ownerId: user.id,
                members: {
                    create: {
                        userId: user.id,
                        role: MEMBER_ROLE.ADMIN
                    }
                }
            },
            includes:{
                members : true
            }
        })

        return {
            success : true,
            data : workspace,
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Failed to initialize workspace"
        }
    }
}

export async function getWorkspaces(){
    const user = currentUser();

    if(!user) throw Error("Unauthorized Access");

    const workspaces = await db.workspace.findMany({
        where:{
            OR:[
                {ownerId : user.id},
                {members: {some:{userId : user.id}}}
            ]
        },
        orderBy:{createdAt: "asc"}
    });

    return workspaces;
}