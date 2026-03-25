const registrationForm = document.querySelector("[data-registration-form]");

if (registrationForm) {
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const coachName = String(formData.get("coachName") || "").trim();
    const nafNick = String(formData.get("nafNick") || "").trim();
    const nafNumber = String(formData.get("nafNumber") || "").trim();
    const teamName = String(formData.get("teamName") || "").trim();
    const userA = registrationForm.dataset.userA || "";
    const userB = registrationForm.dataset.userB || "";
    const domain = registrationForm.dataset.domain || "";
    const tld = registrationForm.dataset.tld || "";
    const subject = registrationForm.dataset.subject || "B7 Registration";
    const user = `${userA}${userB}`;
    const host = tld ? `${domain}.${tld}` : domain;
    const email = `${user}@${host}`;
    const lines = [
      "Hello B7 crew,",
      "",
      "I would like to register for Blitz Seven.",
      "",
      `Coach Name: ${coachName || "-"}`,
      `NAF Nick: ${nafNick || "-"}`,
      `NAF Number: ${nafNumber || "-"}`,
      `Team Name: ${teamName || "-"}`,
    ];

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
}
