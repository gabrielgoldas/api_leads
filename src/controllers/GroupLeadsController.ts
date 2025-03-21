import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema, GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { Prisma } from "@prisma/client";
import { AddLeadRequestSchema } from "./schemas/GroupsRequestSchemas";

export class GroupLeadsController {
  getLeads: Handler = async (req, res, next) => {
    try {
      const groupId = +req.params.groupId
      const query = GetLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

      const pageNumber = +page
      const pageSizeNumber = +pageSize

      const where: Prisma.LeadWhereInput = {
        groups: {
          some: { id: groupId }
        }
      }

      if (name) where.name = { contains: name, mode: "insensitive" }
      if (status) where.status = status

      const leads = await prisma.lead.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        include: {
          groups: true
        }
      })

      const total = await prisma.lead.count({ where })

      res.json({
        leads,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total,
          totalPages: Math.ceil(total / pageSizeNumber)
        }
      })
    } catch (error) {
      next(error)
    }
  }
  
  addLeadInGroup: Handler = async (req, res, next) => {
    try {
      const body = AddLeadRequestSchema.parse(req.body)
      const updatedGroup = await prisma.group.update({
        where: { id: +req.params.groupId },
        data: {
          leads: {
            connect: { id: +body.leadId }
          }
        },
        include: { leads: true }
      })
      res.status(201).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  }

  removeLeadFromGroup: Handler = async (req, res, next) => {
    try {
      const updatedGroup = await prisma.group.update({
        where: { id: +req.params.groupId },
        data: {
          leads: {
            disconnect: { id: +req.params.leadId }
          }
        },
        include: { leads: true }
      })
      res.json(updatedGroup)
    } catch (error) {
      next(error)
    }
  }
}