import { Handler } from "express";
import { prisma } from "../database";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { CampaignsRepository } from "../repositories/CampaignsRepository";

export class CampaignsController {
  constructor(private readonly campaignsRepository: CampaignsRepository) { }

  index: Handler = async (req, res, next) => {
    try {
      const campaigns = await this.campaignsRepository.find()
      res.json(campaigns)
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateCampaignRequestSchema.parse(req.body)
      // const newCampaign = await prisma.campaign.create({ data: body })
      const newCampaign = await this.campaignsRepository.create(body)
      res.status(201).json(newCampaign)
    } catch (error) {
      next(error)
    }
  }

  show: Handler = async (req, res, next) => {
    try {
      const campaign = await this.campaignsRepository.findById(+req.params.id)
      // const campaign = await prisma.campaign.findUnique({
      //   where: { id: +req.params.id },
      //   include: {
      //     leads: {
      //       include: {
      //         lead: true // fizemos isso por nós termos feito 
      //       }
      //     }
      //   }
      // })
      if (!campaign) throw new HttpError(404, "Campaign not found!")
      res.json(campaign)
    } catch (error) {
      next(error)
    }
  }

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id
      const body = UpdateCampaignRequestSchema.parse(req.body)

      // const campaignExists = await prisma.campaign.findUnique({ where: { id } })
      const updatedCampaign = await this.campaignsRepository.updateById(id, body)
      
      if (!updatedCampaign) throw new HttpError(404, "Campaign not found!")

      // const updatedCampaign = await prisma.campaign.update({
      //   data: body,
      //   where: { id }
      // })
      res.json(updatedCampaign)
    } catch (error) {
      next(error)
    }
  }

  delete: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id
      
      // const campaignExists = await prisma.campaign.findUnique({ where: { id } })
      const deletedCampaign = await this.campaignsRepository.deleteById(id)

      if (!deletedCampaign) throw new HttpError(404, "Campaign not found!")
      
      // const deletedCampaign = await prisma.campaign.delete({ where: { id } })

      res.json({ deletedCampaign })
    } catch (error) {
      next(error)
    }
  }
}