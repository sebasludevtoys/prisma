
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/prisma"


  export default async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {

        const tasks = await prisma.task.findMany({
            include:{todos:{
                select:{
                    completed:true,
                    title:true,
                    createdAt:true
                }
            }}
        })
        res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
    }
  }
  