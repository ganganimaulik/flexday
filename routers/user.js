import { Router } from "express";
import { userRepository } from "../db/user.js";
import { body, validationResult, oneOf } from "express-validator";
export const router = Router();

router.post(
  "/",
  body("name").isString().not().isEmpty(),
  body("email").isEmail().not().isEmpty(),
  body("dob").isDate().not().isEmpty(),
  body("address").isString().not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, dob, address } = req.body;
    const user = await userRepository.createAndSave({
      name,
      email,
      dob,
      address,
    });
    res.send(user);
  }
);

router.get("/", async (req, res) => {
  const users = await userRepository.search().return.all();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await userRepository.fetch(req.params.id);
  res.send(user);
});

router.put(
  "/:id",
  oneOf([body("email").isEmail(), body("email").isEmpty()]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userRepository.fetch(req.params.id);

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.address = req.body.address ?? user.address;
    user.dob = req.body.dob ?? user.dob;

    await userRepository.save(user);

    res.send(user);
  }
);

router.delete("/:id", async (req, res) => {
  await userRepository.remove(req.params.id);
  res.send({ entityId: req.params.id });
});
