# Portfolio Hosting Guide (100% Free)

Follow these steps to host your portfolio project live.

---

## 1. MongoDB Atlas (Database)
1. Sign up/Login to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **Free Shared Cluster**.
3. Create a **Database User** (Keep the username and password).
4. In **Network Access**, add `0.0.0.0/0` (Allow access from anywhere).
5. Get your **Connection String** (Should look like `mongodb+srv://<user>:<password>@cluster.mongodb.net/myDatabase`).

---

## 2. GitHub (Code Repository)
1. Initialize a git repository if you haven't:
   ```powershell
   git init
   git add .
   git commit -m "Prepare for hosting"
   ```
2. Create a new repository on GitHub and push your code.

---

## 3. Koyeb (Backend Hosting)
1. Sign up/Login to [Koyeb](https://www.koyeb.com/).
2. Click **Create Service**.
3. Select **GitHub** as the deployment method.
4. Select your repository.
5. **Configure Service:**
   - **Service Name:** e.g., `portfolio-backend`
   - **Environment Variables:** Click "Add Secret" or "Add variable":
     - `MONGO_URI`: (Your MongoDB Atlas string)
     - `PORT`: `8000`
     - `CLIENT_URL`: (Your Vercel/Netlify URL - update this after step 4)
6. Go to **Builder** settings:
   - **Build command:** `npm install`
   - **Run command:** `node server/index.js` (Ensure this path is correct based on your repo structure)
7. Save and Deploy.
8. Copy the **Public URL** (e.g., `https://your-app.koyeb.app`).

---

## 4. Vercel/Netlify (Frontend Hosting)
1. Sign up/Login to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. **Project Settings:**
   - **Framework Preset:** Create React App (detected automatically).
   - **Root Directory:** `client`
5. **Environment Variables:**
   - `NODE_ENV`: `production`
6. Click **Deploy**.
7. Once deployed, copy your Production URL.

---

## 5. Final Connection
1. Go back to your `client/src/api.js`.
2. Replace `https://your-koyeb-app.koyeb.app/api` with your actual Koyeb URL.
3. Push the change to GitHub. Vercel will auto-redeploy.
4. Go to Koyeb -> Environment Variables.
5. Set `CLIENT_URL` to your Vercel URL.
6. Redeploy Koyeb.

**Congratulations! Your portfolio is now LIVE!**
