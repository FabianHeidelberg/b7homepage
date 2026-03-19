const registrationContact = document.querySelector("[data-register-contact]");

if (registrationContact) {
  const userA = registrationContact.dataset.userA || "";
  const userB = registrationContact.dataset.userB || "";
  const domain = registrationContact.dataset.domain || "";
  const tld = registrationContact.dataset.tld || "";
  const subject = registrationContact.dataset.subject || "B7 Registration";

  const user = `${userA}${userB}`;
  const host = tld ? `${domain}.${tld}` : domain;
  const email = `${user}@${host}`;

  registrationContact.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  registrationContact.textContent = email;
  registrationContact.setAttribute("aria-label", `Email ${email}`);
}
