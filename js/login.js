
function login() {
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value.trim();

  // Simple email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (role === "doctor") {
    window.location.href = "doctor.html";
  } else if (role === "pharmacist") {
    window.location.href = "pharmacist.html";
  } else {
    alert("Please select a role to continue.");
  }
}
