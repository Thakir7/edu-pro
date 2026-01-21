// ===============================
// EDU-PRO app.js (إنقاذ واستقرار)
// ===============================

// ✅ Session
window.getSession = function () {
  try { return JSON.parse(localStorage.getItem("edu_session") || "null"); }
  catch (e) { return null; }
};

window.requireSession = function () {
  const s = window.getSession();
  if (!s || !s.traineeId) {
    localStorage.removeItem("edu_session");
    location.replace("index.html");
    return null;
  }
  return s;
};

window.logout = function () {
  localStorage.removeItem("edu_session");
  location.replace("index.html");
};

// ✅ API call
window.apiCall = async function (payload) {
  if (!window.API_URL) {
    return { ok: false, message: "API_URL غير معرف في assets/config.js" };
  }
  const r = await fetch(window.API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return await r.json();
};

// ✅ util: get group from URL or session
window.getGroup = function () {
  const params = new URLSearchParams(location.search);
  let g = params.get("group");
  if (g) return g;

  const s = window.getSession();
  return (s && s.group) ? s.group : "";
};
