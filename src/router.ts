import { Router } from "express";
import { campaignsController, campaignsLeadsController, groupsController, groupsLeadsController, leadsController } from "./container";

const router = Router();

// Leads
router.get("/leads", leadsController.index)
router.post("/leads", leadsController.create)
router.get("/leads/:id", leadsController.show)
router.put("/leads/:id", leadsController.update)
router.delete("/leads/:id", leadsController.delete)

// Groups
router.get("/groups", groupsController.index)
router.post("/groups", groupsController.create)
router.get("/groups/:id", groupsController.show)
router.put("/groups/:id", groupsController.update)
router.delete("/groups/:id", groupsController.delete)

// Campaigns
router.get("/campaigns", campaignsController.index)
router.post("/campaigns", campaignsController.create)
router.get("/campaigns/:id", campaignsController.show)
router.put("/campaigns/:id", campaignsController.update)
router.delete("/campaigns/:id", campaignsController.delete)

// CampaignLeads
router.get("/campaigns/:campaignId/leads", campaignsLeadsController.getLeads)
router.post("/campaigns/:campaignId/leads", campaignsLeadsController.addLead)
router.put("/campaigns/:campaignId/leads/:leadId", campaignsLeadsController.updateLeadStatus)
router.delete("/campaigns/:campaignId/leads/:leadId", campaignsLeadsController.removeLead)

// GroupLeads
router.get("/groups/:groupId/leads", groupsLeadsController.getLeads)
router.post("/groups/:groupId/leads", groupsLeadsController.addLeadInGroup)
router.delete("/groups/:groupId/leads/:leadId", groupsLeadsController.removeLeadFromGroup)

router.get("/status", async (req, res, next) => {
  try {
    res.json({ message: "OK" })
  } catch (error) {
    next(error)
  }
})

export { router }