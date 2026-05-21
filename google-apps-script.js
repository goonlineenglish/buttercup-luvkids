const SHEET_ID = '1Mi4IRIE1GHH166e4pW5KDyPSdhPQ5kgbu1h_0JufsZw'; // BẠN PHẢI THAY BẰNG ID THỰC TẾ TRÊN URL

function doPost(e) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        "result": "error",
        "error": "No data received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const timestamp = new Date();

    // Map payload fields to columns
    const rowData = [
      timestamp,
      data.parentName || "",
      data.phone || "",
      data.childAge || ""
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "data": rowData
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
