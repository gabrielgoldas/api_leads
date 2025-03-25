import { Campaign } from "@prisma/client";
import { AddLeadCampaignAttributes, CampaignsRepository, CreateCampaignAttributes } from "../CampaignsRepository";
import { prisma } from "../../database";

export class PrismaCampaignRepository implements CampaignsRepository {
  async find(): Promise<Campaign[]> {
    return prisma.campaign.findMany()
  }

  async findById(id: number): Promise<Campaign | null> {
    return prisma.campaign.findUnique({
      where: { id },
      include: { leads: { include: { lead: true } } }
    })
  }

  async create(attributes: CreateCampaignAttributes): Promise<Campaign> {
    return prisma.campaign.create({ data: attributes })
  }

  async updateById(id: number, attributes: Partial<CreateCampaignAttributes>): Promise<Campaign | null> {
    const campaignExists = await prisma.campaign.findUnique({ where: { id } })
    if (!campaignExists) return null
    return prisma.campaign.update({
      data: attributes,
      where: { id }
    })
  }

  async deleteById(id: number): Promise<Campaign | null> {
    const campaignExists = await prisma.campaign.findUnique({ where: { id } })
    if (!campaignExists) return null
    return prisma.campaign.delete({ where: { id } })
  }

  async addLead(attributes: AddLeadCampaignAttributes): Promise<void> {
    await prisma.leadCampaign.create({ data: attributes })
  }

  async updateLeadStatus(attributes: AddLeadCampaignAttributes): Promise<void> {
    await prisma.leadCampaign.update({
      data: { status: attributes.status },
      where: {
        leadId_campaignId: {
          campaignId: attributes.campaignId,
          leadId: attributes.leadId
        }
      }
    })
  }

  async removeLead(campaignId: number, leadId: number): Promise<void> {
    await prisma.leadCampaign.delete({
      where: {
        leadId_campaignId: { campaignId, leadId }
      }
    })
  }
}