// ===============================
// TABLE RENDER (Attendance & Grades)
// ===============================
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
          <tr>
            ${headers.map(h => `<th>${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              ${r.map(c => `<td>${c ?? ""}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}
// ====== Session Helpers (إنقاذ سريع) ======
window.getSession = function(){
  try { return JSON.parse(localStorage.getItem("edu_session")||"null"); }
  catch(e){ return null; }
};

window.requireSession = function(){
  const s = window.getSession();
  if(!s || !s.traineeId){
    localStorage.removeItem("edu_session");
    location.replace("index.html");
    return null;
  }
  return s;
};

window.logout = function(){
  localStorage.removeItem("edu_session");
  location.replace("index.html");
};

// نداء API موحد
window.apiCall = async function(payload){
  const r = await fetch(window.API_URL,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(payload)
  });
  return await r.json();
};
