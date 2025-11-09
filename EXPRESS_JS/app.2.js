const express = require("express");
const app = express();

app.use(express.json());

// Sample data (in-memory array)
let students = [
  { id: 1, name: "Kannah", course: "CSE" },
  { id: 2, name: "Arun", course: "ECE" }
];

// -------------------------
// ✅ PUT → replace whole object
// -------------------------
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return res.status(404).send("Student Not Found");

  // Replace entire student object
  students[index] = { id, ...req.body };

  res.json(students[index]);
});

// -------------------------
// ✅ PATCH → update only specific fields
// -------------------------
app.patch("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) return res.status(404).send("Student Not Found");

  // Update only the provided fields
  Object.assign(student, req.body);

  res.json(student);
});

// -------------------------
// ✅ DELETE → remove student
// -------------------------
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return res.status(404).send("Student Not Found");

  const deleted = students.splice(index, 1);

  res.json({ message: "Deleted successfully", deleted });
});

// -------------------------
// ✅ Start server
// -------------------------
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
