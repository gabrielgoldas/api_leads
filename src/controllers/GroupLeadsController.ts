import { Handler } from "express";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { AddLeadRequestSchema } from "./schemas/GroupsRequestSchemas";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class GroupLeadsController {
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly leadsRepository: LeadsRepository
  ) { }

  getLeads: Handler = async (req, res, next) => {
    try {
      const groupId = +req.params.groupId
      const query = GetLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

      const limit = +pageSize
      const offset = (+(page) - 1) * limit

      const where: LeadWhereParams = { groupId }

      if (name) where.name = { like: name, mode: "insensitive" }
      if (status) where.status = status

      const leads = await this.leadsRepository.find({ 
        where, 
        sortBy, 
        order, 
        limit, 
        offset,
        include: { groups: true }
      })

      const total = await this.leadsRepository.count(where)

      res.json({
        leads,
        meta: {
          page: +page,
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      next(error)
    }
  }
  
  addLeadInGroup: Handler = async (req, res, next) => {
    try {
      const groupId = +req.params.groupId
      const { leadId } = AddLeadRequestSchema.parse(req.body)
      const updatedGroup = await this.groupsRepository.addLead(groupId, leadId)
      res.status(201).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  }

  removeLeadFromGroup: Handler = async (req, res, next) => {
    try {
      const groupId = +req.params.groupId
      const leadId = +req.params.leadId
      const updatedGroup = await this.groupsRepository.removeLead(groupId, leadId)
      res.json(updatedGroup)
    } catch (error) {
      next(error)
    }
  }
}