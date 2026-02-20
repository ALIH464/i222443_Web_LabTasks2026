function cleanUsername(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function validateUsername(name) {
  if (name.length < 5 || name.length > 20) return false;
  if (!/[a-z]/.test(name.charAt(0))) return false;
  if (!/^[a-z0-9_]+$/.test(name)) return false;
  return true;
}

// Example
let username = cleanUsername("   AHMAD_kHan123   ");
console.log(username); // ahmad_khan123
console.log(validateUsername(username));
