// ===============================
// EDU-PRO app.js (Stabilized)
// ===============================

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

// ✅ fetch with timeout (حتى لا يعلق)
async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

window.apiCall = async function (payload) {
  if (!window.API_URL) {
    return { ok: false, message: "API_URL غير معرف في assets/config.js" };
  }

  try {
    const r = await fetchWithTimeout(window.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload || {})
    }, 12000);

    // قد يرجع HTML خطأ أحياناً
    const text = await r.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return { ok: false, message: "استجابة غير JSON من الخادم", raw: text.slice(0, 200) };
    }

  } catch (e) {
    // AbortError = timeout
    if (String(e).includes("AbortError")) {
      return { ok: false, message: "انتهت مهلة الاتصال (Timeout). تحقق من API_URL والنشر." };
    }
    return { ok: false, message: "فشل الاتصال بالخادم: " + String(e) };
  }
};

window.getGroup = function () {
  const params = new URLSearchParams(location.search);
  let g = params.get("group");
  if (g) return g;
  const s = window.getSession();
  return (s && s.group) ? s.group : "";
};
