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
