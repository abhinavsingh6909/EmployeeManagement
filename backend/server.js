const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_FILE = path.join(__dirname, "employees.json");

app.use(cors());
app.use(express.json());

async function readEmployees() {
  try {
    const fileData = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
}

async function writeEmployees(employees) {
  await fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), "utf-8");
}

app.get("/employees", async (req, res) => {
  try {
    const employees = await readEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error reading employees:", error);
    res.status(500).json({ message: "Server error while reading employees data." });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const { id, name, dept, email, salary } = req.body;

    if (
      id === undefined ||
      id === null ||
      !name ||
      !dept ||
      !email ||
      salary === undefined ||
      salary === null
    ) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const empId = Number(id);
    if (isNaN(empId) || empId <= 0) {
      return res.status(400).json({ message: "Employee ID must be a positive number." });
    }

    const empSalary = Number(salary);
    if (isNaN(empSalary) || empSalary <= 0) {
      return res.status(400).json({ message: "Salary must be a positive number." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const employees = await readEmployees();

    const idExists = employees.some((emp) => Number(emp.id) === empId);
    if (idExists) {
      return res.status(400).json({ message: "Employee ID already exists." });
    }

    const newEmployee = {
      id: empId,
      name: name.trim(),
      dept: dept.trim(),
      email: email.trim(),
      salary: empSalary,
    };

    employees.push(newEmployee);
    await writeEmployees(employees);

    res.status(201).json({
      message: "Employee added successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server error while adding employee." });
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const targetId = Number(req.params.id);
    const { id, name, dept, email, salary } = req.body;

    if (!name || !dept || !email || salary === undefined || salary === null) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const empSalary = Number(salary);
    if (isNaN(empSalary) || empSalary <= 0) {
      return res.status(400).json({ message: "Salary must be a positive number." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const employees = await readEmployees();

    const empIndex = employees.findIndex((emp) => Number(emp.id) === targetId);
    if (empIndex === -1) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const newId = id ? Number(id) : targetId;
    if (newId !== targetId) {
      const duplicateExists = employees.some((emp) => Number(emp.id) === newId);
      if (duplicateExists) {
        return res.status(400).json({ message: "Cannot update: New Employee ID already exists." });
      }
    }

    employees[empIndex] = {
      id: newId,
      name: name.trim(),
      dept: dept.trim(),
      email: email.trim(),
      salary: empSalary,
    };

    await writeEmployees(employees);

    res.status(200).json({
      message: "Employee updated successfully.",
      employee: employees[empIndex],
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error while updating employee." });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const targetId = Number(req.params.id);

    const employees = await readEmployees();

    const employeeExists = employees.some((emp) => Number(emp.id) === targetId);
    if (!employeeExists) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const updatedEmployees = employees.filter((emp) => Number(emp.id) !== targetId);

    await writeEmployees(updatedEmployees);

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error while deleting employee." });
  }
});

function startServer(portToUse) {
  const server = app.listen(portToUse, () => {
    console.log(`=========================================`);
    console.log(` CDAC Employee Management Backend Server`);
    console.log(` Running on: http://localhost:${portToUse}`);
    console.log(` Data file:  ${DATA_FILE}`);
    console.log(`=========================================`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      if (portToUse === 5000) {
        console.warn(`\n[Notice] Port 5000 is already in use (common on macOS due to AirPlay Receiver).`);
        console.log(`Automatically switching to fallback port 5001...\n`);
        startServer(5001);
      } else {
        console.error(`Port ${portToUse} is also in use. Please free the port or specify PORT=<number> node server.js`);
      }
    } else {
      console.error("Server listen error:", err);
    }
  });
}

startServer(PORT);
