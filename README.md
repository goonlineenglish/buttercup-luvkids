# Buttercup Partnership Discovery Form Integration & Deployment Guide

This guide provides instructions to connect the Buttercup Partnership Discovery Form to Google Sheets and deploy it under the domain `buttercup.edu.vn/luvkids` using GitHub and Cloudflare Pages.

---

## 1. Setup Google Sheets Integration

We use a Google Apps Script Web App to capture form submissions and append them directly to your Google Sheet with ID `1x1we6Kdpq1NNbQS1Z2Qpn56dMeVlLSRggqCb78uuMeA`.

1. Open your target Google Sheet: [Google Sheet Link](https://docs.google.com/spreadsheets/d/1x1we6Kdpq1NNbQS1Z2Qpn56dMeVlLSRggqCb78uuMeA)
2. In the top menu, go to **Extensions** -> **Apps Script**.
3. Delete any default code template in the script editor.
4. Open the file [google-apps-script.js](google-apps-script.js) in this directory, copy its entire contents, and paste it into the script editor.
5. Save the project (click the disk icon or press `Ctrl + S`).
6. Click the **Deploy** button in the top right and select **New deployment**.
7. Click the gear icon next to "Select type" and select **Web app**.
8. Configure the deployment:
   - **Description**: `Buttercup Form Web App`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
9. Click **Deploy**.
10. Authorize access if prompted by Google.
11. Once deployed, copy the generated **Web app URL** (it ends with `/exec`).

---

## 2. Configure index.html

1. Open [index.html](index.html) in a text editor.
2. Locate the configuration variable `GOOGLE_SCRIPT_URL` near the start of the `<script>` tag (around line 1208):
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_PASTED_WEB_APP_URL_HERE";
   ```
3. Replace the empty string with the copied Web App URL.
4. Save the file.

---

## 3. Deploy to GitHub

To host your site on Cloudflare Pages, your code must be in a GitHub repository. We have created a helper script to automate this.

1. Open a PowerShell terminal in this directory.
2. Run the deployment script:
   ```powershell
   .\deploy.ps1
   ```
3. The script will:
   - Check if Git is installed. If missing, it will automatically install Git for your user profile via Windows Package Manager (`winget`).
   - Prompt you for your GitHub repository URL (e.g., `https://github.com/username/repository-name.git`).
   - Initialize a local Git repository, commit the files, and push them to your GitHub.

---

## 4. Host on Cloudflare Pages

### Step A: Deploy the Repository
1. Log in to your Cloudflare Dashboard.
2. Go to **Workers & Pages** -> **Pages** -> **Create a project** -> **Connect to Git**.
3. Select your GitHub account and the repository containing the form code.
4. Keep the default build settings:
   - **Framework preset**: `None`
   - **Build command**: (Leave empty)
   - **Build output directory**: (Leave empty or set to `/` or `.`)
5. Click **Save and Deploy**. Your landing page will be built and hosted at a subdomain like `luvkids-xxxx.pages.dev`.

### Step B: Configure Custom Domain Subpath (buttercup.edu.vn/luvkids)
Cloudflare Pages custom domains typically support whole domains or subdomains (e.g., `luvkids.buttercup.edu.vn`). To host on a subpath (e.g., `buttercup.edu.vn/luvkids`), use a **Cloudflare Worker** to route the traffic:

1. In the Cloudflare Dashboard, go to **Workers & Pages** -> **Workers** -> **Create application** -> **Create Worker**.
2. Name the Worker (e.g., `luvkids-subpath-router`) and click **Deploy**.
3. Click **Quick Edit** in the Worker details and paste the following code:
   ```javascript
   export default {
     async fetch(request, env) {
       const url = new URL(request.url);
       if (url.pathname.startsWith("/luvkids")) {
         // Rewrite path to your Pages project URL
         const pagesUrl = "https://luvkids-xxxx.pages.dev"; // Replace with your Pages project URL
         const targetPath = url.pathname.replace("/luvkids", "");
         
         const newUrl = new URL(targetPath + url.search, pagesUrl);
         return fetch(newUrl, request);
       }
       // Pass through normal requests to the main site
       return fetch(request);
     }
   }
   ```
4. Save and Deploy the Worker.
5. In the Worker details, go to **Triggers** -> **Routes** -> **Add Route**.
6. Set the Route to: `buttercup.edu.vn/luvkids*` and select the zone `buttercup.edu.vn`.
7. Click **Save**. Traffic visiting `buttercup.edu.vn/luvkids` will now load the landing page form seamlessly!
