// ═══════════════════════════════════════════════════════════
// Google Apps Script — Project Dashboard API
// ═══════════════════════════════════════════════════════════
//
// วิธีติดตั้ง:
// 1. เปิด Google Sheet ที่มีข้อมูลโครงการ
// 2. ไปที่ Extensions > Apps Script
// 3. ลบ code เดิมทั้งหมด แล้ววาง code นี้ลงไป
// 4. กด Save (Ctrl+S)
// 5. กด Deploy > New deployment
// 6. เลือก Type: Web app
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. กด Deploy > คัดลอก URL ที่ได้
// 10. วาง URL ใน Dashboard
//
// ═══════════════════════════════════════════════════════════

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var result = {};
    var sheets = ss.getSheets();
    
    for (var s = 0; s < sheets.length; s++) {
      var sheet = sheets[s];
      var name = sheet.getName();
      var data = sheet.getDataRange().getDisplayValues();
      
      // จับคู่ชื่อ tab
      var key = null;
      if (/ข้อมูลโครงการ|project|config/i.test(name)) key = 'info';
      else if (/ความก้าวหน้า|progress/i.test(name)) key = 'progress';
      else if (/s.?curve/i.test(name)) key = 'scurve';
      else if (/รายการงาน|task|gantt/i.test(name)) key = 'tasks';
      else if (/milestone|เหตุการณ์/i.test(name)) key = 'milestones';
      else if (/evm|earned/i.test(name)) key = 'evm';
      else if (/ทรัพยากร|resource|team/i.test(name)) key = 'resources';
      else if (/ความเสี่ยง|risk/i.test(name)) key = 'risks';
      
      if (key) {
        result[key] = data;
      }
    }
    
    var output = ContentService.createTextOutput(JSON.stringify(result));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
    
  } catch (err) {
    var output = ContentService.createTextOutput(JSON.stringify({error: err.message}));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}
