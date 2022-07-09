import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  
  prisma = global.prisma
}
prisma.$use(async (params, next) => {
  // Check incoming query type
  if (params.model == 'member') {
    if (params.action == 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update'
      params.args['data'] = { is_deleted: 1 }
    }
    if (params.action == 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany'
      if (params.args.data != undefined) {
        params.args.data['is_deleted'] = 1
      } else {
        params.args['data'] = { is_deleted: 1 }
      }
    }
  }
  return next(params)
})
export default prisma