# Portfolio Hosting Guide (100% Free)

Follow these steps to host your portfolio project live. Since your project has both `client` and `server` folders in one repository, we will deploy them separately using their respective subfolders.

---

## 1. MongoDB Atlas (Database)
1. Sign up/Login to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **Free Shared Cluster**.
3. Create a **Database User** (Keep the username and password).
4. In **Network Access**, add `0.0.0.0/0` (Allow access from anywhere).
5. Get your **Connection String** (Should look like `mongodb+srv://<user>:<password>@cluster.mongodb.net/myDatabase`).

---

## 2. GitHub (Code Repository)
1. Push your entire project (containing both `client` and `server` folders) to a single GitHub repository.

---

## 3. Option A: Koyeb (Backend Hosting - Server Folder)
1. Sign up/Login to [Koyeb](https://www.koyeb.com/).
2. Click **Create Service**.
3. Select **GitHub** as the deployment method and select your repository.
4. **Instance Selection (CRITICAL):**
   - Look for the **"Free"** instance type (NOT Nano).
   - **Region:** You MUST select either **Washington, D.C. (US)** or **Frankfurt (Germany)**. Other regions don't have the free tier.
5. **Configure Service:**
   - **Service Name:** `portfolio-backend`
   - **Environment Variables:**
     - `MONGO_URI`: (Your MongoDB Atlas string)
     - `PORT`: `8000`
     - `CLIENT_URL`: (Your Vercel URL)
6. **Builder Settings (CRITICAL for Monorepo):**
   - Click the **"Override"** switch for **Work directory** and enter: `server`
   - Click the **"Override"** switch for **Build command** and enter: `npm install`
   - Click the **"Override"** switch for **Run command** and enter: `node index.js`
7. Save and Deploy.
8. Copy the **Public URL** (e.g., `https://your-app.koyeb.app`).

---

## 3. Option B: Render (Backend Hosting - Alternative)
If you prefer Render:
1. Sign up/Login to [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. **Configure Web Service:**
   - **Name:** `portfolio-backend`
   - **Region:** Any (e.g., Oregon)
   - **Branch:** `main`
   - **Root Directory:** `server` (This makes Render look only at the server folder)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. **Instance Type:** Select **Free**.
6. **Environment Variables:** Click **Advanced** -> **Add Environment Variable**:
   - `MONGO_URI`: (Your MongoDB Atlas string)
   - `CLIENT_URL`: (Your Vercel URL)
7. Click **Create Web Service**.
8. Copy the **Onrender URL** (e.g., `https://portfolio-backend.onrender.com`).

---

## 4. Vercel (Frontend Hosting - Client Folder)
1. Sign up/Login to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. **Project Settings (CRITICAL for Monorepo):**
   - **Root Directory:** Click "Edit" and select the `client` folder.
   - **Framework Preset:** Create React App (detected automatically inside `client`).
5. **Environment Variables:**
   - `NODE_ENV`: `production`
6. Click **Deploy**.
7. Copy your Production URL (e.g., `https://your-portfolio.vercel.app`).

---

## 5. Final Connection
1. Go back to your `client/src/api.js`.
2. Replace `https://your-koyeb-app.koyeb.app/api` with your actual Koyeb URL.
3. Push the change to GitHub. Vercel and Koyeb will auto-redeploy.
4. Go to Koyeb -> Environment Variables.
5. Set `CLIENT_URL` to your Vercel URL.
6. Redeploy Koyeb.
---

## 6. Troubleshooting Common Issues

### CORS Error (Access-Control-Allow-Origin)
If you see a "CORS policy" error in the console when trying to send a message:
1. **Remove Trailing Slash**: Go to Koyeb -> Environment Variables. Ensure `CLIENT_URL` does **NOT** have a `/` at the end (e.g., use `https://my-app.vercel.app` NOT `https://my-app.vercel.app/`).
2. **Use Production URL**: Do not use the Vercel URL that has random letters (like `rbwwlk574`). Use your main Vercel project URL (e.g., `https://portfolio-name.vercel.app`).
3. **Commit & Push**: After changing `server/index.js`, make sure to push it to GitHub so Koyeb redeploys with the fix.

### Vercel Build "Errors" (Warnings)
If you see a lot of `npm warn deprecated` messages and the build fails, don't worry! These are just warnings. Vercel often stops the build if it sees any warnings or peer dependency conflicts (especially with React 19).
**Fix:**
1. Go to your **Vercel Project Settings** -> **Environment Variables**.
2. Add a new variable:
   - **Key:** `CI`
   - **Value:** `false` (This tells Vercel to ignore warnings during build)
3. Add another variable for React 19 compatibility:
   - **Key:** `NPM_FLAGS`
   - **Value:** `--legacy-peer-deps`
4. **Redeploy** the project.

### Koyeb Backend Not Starting
If Koyeb says "Healthy check failed":
1. Make sure your `MONGO_URI` is correct and has the password.
2. Ensure you set the `PORT` to `8000` in Koyeb environment variables.
3. Check the **Runtime Logs** in Koyeb to see the exact error message.

---

**Congratulations! Your portfolio is now LIVE!**
