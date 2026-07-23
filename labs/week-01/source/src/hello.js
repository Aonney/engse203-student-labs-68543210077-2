const student = {
  name: "นายสันติ ปัญญาหน้อย",
  studentId: "68543210077-2",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));