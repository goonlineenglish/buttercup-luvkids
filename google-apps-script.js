/**
 * Google Apps Script to connect the Buttercup Partnership Discovery Form to Google Sheets.
 * Linked to Google Sheet ID: 1x1we6Kdpq1NNbQS1Z2Qpn56dMeVlLSRggqCb78uuMeA
 * 
 * Instructions:
 * 1. Open the Google Sheet with ID "1x1we6Kdpq1NNbQS1Z2Qpn56dMeVlLSRggqCb78uuMeA".
 * 2. In the top menu, go to Extensions -> Apps Script.
 * 3. Delete any default code in the editor (e.g. myFunction()) and paste this entire code block.
 * 4. Click the "Save" icon (floppy disk) or press Ctrl+S.
 * 5. Click the "Deploy" button in the top right, select "New deployment".
 * 6. Select type "Web app" (click the gear icon next to "Select type").
 * 7. Configure:
 *    - Description: Buttercup Form Web App
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 8. Click "Deploy", then authorize permissions if prompted.
 * 9. Copy the generated "Web app URL" and paste it as the GOOGLE_SCRIPT_URL in index.html.
 */

const TARGET_SHEET_ID = "1x1we6Kdpq1NNbQS1Z2Qpn56dMeVlLSRggqCb78uuMeA";

function doPost(e) {
  try {
    const doc = SpreadsheetApp.openById(TARGET_SHEET_ID);
    const sheet = doc.getActiveSheet();
    
    // Parse incoming JSON body
    const data = JSON.parse(e.postData.contents);
    
    // Define exact headers matching our form data keys
    const headers = [
      "Timestamp",
      "Organization Name (org_name)",
      "Contact Name (contact_name)",
      "Contact Role (contact_role)",
      "Contact Phone (contact_phone)",
      "Contact Email (contact_email)",
      "Contact Web/Fanpage (contact_web)",
      "Organization Models (org_model)",
      "Address (address)",
      "Branch Count (branch_count)",
      "Main Region (main_region)",
      "Total Students (total_students)",
      "Preschool Students (preschool_students)",
      "Teacher Count (teacher_count)",
      "Admin/Ops Count (admin_count)",
      "Room Count (room_count)",
      "Room Capacity (room_capacity)",
      "Expandability (expandability)",
      "Current Program (current_program)",
      "Tuition Range (tuition_range)",
      "History & Experience (history_experience)",
      "Growth Goals (growth_goals)",
      "Single Main Goal (focus_point)",
      "Why Preschool Now (why_preschool)",
      "Buttercup Help Needed (buttercup_help)",
      "Strengths (strengths)",
      "Challenges (challenges)",
      "Hardest Part of Operations (hardest_part)",
      "Biggest Concern (biggest_concern)",
      "Sales Staff (grid_sales)",
      "Marketing Staff (grid_mkt)",
      "Vận Hành Staff (grid_ops)",
      "Academic Staff (grid_acad)",
      "Execution Readiness Scale 1-5 (ready_scale)",
      "Resource Readiness (resource_ready)",
      "Decision Makers (decision_maker)",
      "Agreement & Philosophy (agreement)",
      "Why Partner Now (why_now)",
      "Discussion Focus Areas (discussion_focus)",
      "Implementation Timeline (implementation_timeline)"
    ];
    
    // Write headers if sheet is brand new and empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      // Format header row to look professional
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#F3F3F3")
        .setHorizontalAlignment("center");
    }
    
    // Map the incoming payload to column values
    const row = [
      new Date(), // Timestamp
      data.org_name || "",
      data.contact_name || "",
      data.contact_role || "",
      data.contact_phone || "",
      data.contact_email || "",
      data.contact_web || "",
      data.org_model || "",
      data.address || "",
      data.branch_count || "",
      data.main_region || "",
      data.total_students || "",
      data.preschool_students || "",
      data.teacher_count || "",
      data.admin_count || "",
      data.room_count || "",
      data.room_capacity || "",
      data.expandability || "",
      data.current_program || "",
      data.tuition_range || "",
      data.history_experience || "",
      data.growth_goals || "",
      data.focus_point || "",
      data.why_preschool || "",
      data.buttercup_help || "",
      data.strengths || "",
      data.challenges || "",
      data.hardest_part || "",
      data.biggest_concern || "",
      data.grid_sales || "",
      data.grid_mkt || "",
      data.grid_ops || "",
      data.grid_acad || "",
      data.ready_scale || "",
      data.resource_ready || "",
      data.decision_maker || "",
      data.agreement || "",
      data.why_now || "",
      data.discussion_focus || "",
      data.implementation_timeline || ""
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "row": sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON)
       .setHeader('Access-Control-Allow-Origin', '*');
       
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
       .setHeader('Access-Control-Allow-Origin', '*');
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "online",
    "sheetId": TARGET_SHEET_ID
  })).setMimeType(ContentService.MimeType.JSON)
     .setHeader('Access-Control-Allow-Origin', '*');
}
