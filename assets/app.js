// assets/app.js
async function api(payload){
  const r = await fetch(window.API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return await r.json();
}

function qs(k){ return new URLSearchParams(location.search).get(k); }

function setSession(s){ localStorage.setItem("edu_session", JSON.stringify(s)); }
function getSession(){ try{return JSON.parse(localStorage.getItem("edu_session")||"{}");}catch(e){return {};} }
function clearSession(){ localStorage.removeItem("edu_session"); }

function esc(s){ return String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function renderSheetTable(containerId, res) {
  const box = document.getElementById(containerId);
  if (!box) return;

  if (!res || !res.ok) {
    box.innerHTML = `<div class="alert">خطأ في جلب البيانات</div>`;
    return;
  }

  if (!res.rows || res.rows.length === 0) {
    box.innerHTML = `<div class="alert">لا توجد بيانات</div>`;
    return;
  }

  const headers = res.headers;
  const rows = res.rows;

  box.innerHTML = `
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>${r.map(c => `<td>${c ?? ""}</td>`).join("")}</tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

