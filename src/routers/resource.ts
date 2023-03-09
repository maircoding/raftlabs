import express, { Router, Response } from "express";
import { IRequest } from "../interfaces/user";
import { auth } from "../middleware/auth";
import { Resource } from "../models/resource";

const router: Router = express.Router();
export const resourceRouter: Router = router;

// Create a Resource
router.post("/resource", auth, async (req: IRequest, res: Response) => {
  const userId = req.user._id.toString();
  const resource = new Resource(req.body);

  try {
    resource.userId = userId;
    await resource.save();
    res.status(201).send({ resource });
  } catch (e) {
    res.status(400).send({ Error: e });
  }
});

// Get a Resource
router.get("/resource/:id", auth, async (req: IRequest, res: Response) => {
  const resourceId = req.params.id;
  const userId = req.user._id.toString();

  try {
    const resource = await Resource.find({
      _id: resourceId,
      userId,
    });

    res.status(200).send(resource)
  } catch (error) {
    res.status(400).send({'Error': error})
  }
});

// Get All Associated Resources
router.get("/resource", auth, async (req: IRequest, res) => {
  const sort = {};

  if (req.query.sortBy) {
    const sortBy = req.query.sortBy.toString();
    const sorted = req.query.sort;
    sort[sortBy] = sorted === "desc" ? -1 : 1;
  }

  const resources = await Resource.find({ userId: req.user._id.toString() })
    .skip(Number(req.query.skip) || 0)
    .limit(Number(req.query.limit) || 0)
    .sort(sort);

  res.status(200).send(resources);
});

// Update a Resource
router.patch("/resource/:id", auth, async (req: IRequest, res: Response) => {
  const resourceId = req.params.id;
  const userId = req.user._id.toString();

  const resource = await Resource.findOne({
    _id: resourceId,
    userId,
  });

  try {
    const update = Object.keys(req.body);
    update.forEach((ele) => {
      resource[ele] = req.body[ele];
    });

    await resource.save();
    res.send(resource);
  } catch (e) {
    res.status(400).send({ Error: "Update Failed" });
  }
});

// Delete a Resource
router.delete("/resource/:id", auth, async (req: IRequest, res: Response) => {
  const resourceId = req.params.id;
  const userId = req.user._id.toString();

  try {
    const resource = await Resource.findOneAndDelete({
      _id: resourceId,
      userId
    });

    res.status(200).send(resource);
  } catch (e) {
    res.status(400).send({ e: "Delete Failed" });
  }
});
