window.onload = function () {
  renderPrescriptions();
};

function renderPrescriptions() {
  const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  const list = document.getElementById("prescriptionList");
  list.innerHTML = "";

  prescriptions.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div><strong>Patient:</strong> ${p.patient}</div>
      <div><strong>Medicine:</strong> ${p.medicine}</div>
      <div><strong>Status:</strong> <em>${p.status}</em></div>
      ${
        p.status !== "Checked"
          ? `<button class="checked-btn" onclick="markChecked(${index})">✔ Checked</button>`
          : `<span style="color: green; font-weight: bold;">✅ Already Checked</span>`
      }
      <button class="delete-btn" onclick="deletePrescription(${index})">🗑 Delete</button>
    `;
    list.appendChild(li);
  });
}

function deletePrescription(index) {
  const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  prescriptions.splice(index, 1);
  localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
  renderPrescriptions();
}

function markChecked(index) {
  const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  prescriptions[index].status = "Checked";
  localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
  renderPrescriptions();
}

function downloadBackup() {
  const prescriptions = localStorage.getItem("prescriptions") || "[]";
  const blob = new Blob([prescriptions], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prescriptions.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("importFile").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        localStorage.setItem("prescriptions", JSON.stringify(data));
        alert("Backup imported successfully!");
        renderPrescriptions();
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Error reading file.");
    }
  };
  reader.readAsText(file);
});
