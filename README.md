# Expense Tracker

## Deployment Instructions

### Netlify Deployment

1. Create a new Netlify site:
   - Go to https://app.netlify.com/sites/new
   - Connect your GitHub repository
   - Select your repository

2. Configure Build Settings:
   - Build command: `npm run netlify-build`
   - Publish directory: `frontend/expense-tracker/build`

3. Environment Variables:
   - Add your backend URL as `VITE_API_URL` in Netlify's environment variables

4. Deploy:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your application

### Local Development

1. Install dependencies:
   ```bash
   npm install
   cd frontend/expense-tracker
   npm install
   cd ../backend
   npm install
   ```

2. Start the development servers:
   ```bash
   npm run dev  # Starts frontend in development mode
   cd backend
   npm start    # Starts backend server
   ```
