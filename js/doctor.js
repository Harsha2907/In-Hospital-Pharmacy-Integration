function submitPrescription() {
  const patient = document.getElementById("patient").value.trim();
  const medicine = document.getElementById("medicine").value.trim();

  if (!patient || !medicine) {
    alert("Please fill in both fields.");
    return;
  }

  const newPrescription = {
    patient,
    medicine,
    status: "Pending",
    timestamp: new Date().toISOString()
  };

  const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  prescriptions.push(newPrescription);
  localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

  alert("Prescription submitted!");
  document.getElementById("patient").value = "";
  document.getElementById("medicine").value = "";
}
