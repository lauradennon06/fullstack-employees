import express from "express";
const router = express.Router();
export default router;

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees.js";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id)) return res.status(400).send("Invalid employee ID");

  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found");

  req.employee = employee;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.employee);
});

router.delete("/:id", async (req, res) => {
  await deleteEmployee(req.employee.id);
  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing");

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  const employee = await updateEmployee(req.employee.id, {
    name,
    birthday,
    salary,
  });
  res.send(employee);
});
