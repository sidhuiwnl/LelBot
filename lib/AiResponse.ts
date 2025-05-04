import {z} from "zod";

export const AIResponseSchema = z.discriminatedUnion("type",[
    z.object({
        type : z.literal("text"),
        text : z.string()
    }),
    z.object({
        type : z.literal("tweet"),
        content: z.string(),
    })
])

export const AIMessageSchema = z.object({
    role : z.enum(["user","assisstant"]),
    parts : z.array(AIResponseSchema)
})