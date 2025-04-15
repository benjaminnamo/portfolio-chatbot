# Deployment Guide

This guide explains two key tasks:
1. How to upload your chatbot to GitHub (properly securing personal information)
2. How to host the chatbot on bennamo.com

## Part 1: Uploading to GitHub

### Preparing Your Code

1. **Ensure sensitive data is protected**
   - Verify `.env` is in your `.gitignore` file
   - Make sure your personal data is in `src/lib/personal-data.ts` (which is gitignored)
   - Check if any API keys or personal information exists in other files

2. **Initialize Git repository** (if not already done)
   ```bash
   git init
   ```

3. **Create a new GitHub repository**
   - Go to GitHub.com and create a new repository
   - Name suggestion: `portfolio-chatbot`
   - Do not initialize with README, .gitignore, or license (we'll add these ourselves)

4. **Add all files and make initial commit**
   ```bash
   git add .
   git commit -m "Initial commit of portfolio chatbot"
   ```

5. **Add your GitHub repository as remote**
   ```bash
   git remote add origin https://github.com/bennamo/portfolio-chatbot.git
   ```
   (Replace `bennamo` with your GitHub username)

6. **Push to GitHub**
   ```bash
   git push -u origin main
   ```

### Setting Up GitHub Secrets

For GitHub Actions to build your site with your API key:

1. **Add your API key as a secret**
   - Go to your GitHub repository
   - Click on "Settings" → "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `OPENROUTER_API_KEY`
   - Value: Your OpenRouter API key
   - Click "Add secret"

### Testing GitHub Pages Deployment

1. The GitHub Actions workflow we created will automatically deploy to GitHub Pages when you push to the main branch.

2. **Enable GitHub Pages**
   - Go to your GitHub repository
   - Click on "Settings" → "Pages"
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The site will be available at `https://bennamo.github.io/portfolio-chatbot/`

## Part 2: Hosting on bennamo.com

There are several approaches to host your chatbot on your bennamo.com domain:

### Option 1: Direct Deployment to bennamo.com

If bennamo.com is your personal website hosted on a service like Netlify, Vercel, or traditional hosting:

1. **Netlify/Vercel Approach** (Recommended)
   
   a. **Connect your GitHub repository to Netlify/Vercel**
      - Create an account on Netlify or Vercel
      - Click "New Site from Git" or "Import Project"
      - Select your GitHub repository
   
   b. **Configure build settings**
      - Build command: `npm run build`
      - Publish directory: `dist`
   
   c. **Add environment variables**
      - Add `VITE_OPENROUTER_API_KEY` with your OpenRouter API key
   
   d. **Configure custom domain**
      - In Netlify/Vercel, go to "Domain Settings"
      - Add your custom domain (e.g., chat.bennamo.com)
      - Follow DNS instructions to set up the domain
      - You can use the root domain or a subdomain like chat.bennamo.com

2. **Traditional Web Hosting Approach**
   
   a. **Build your project locally**
      ```bash
      VITE_OPENROUTER_API_KEY=your-api-key npm run build
      ```
   
   b. **Upload the `dist` folder contents to your web host**
      - Use FTP, SFTP, or your host's file manager
      - Upload to a subdirectory (e.g., /chatbot/) or the root directory
   
   c. **Configure .htaccess for routing** (if using Apache)
      Create a file in your `dist` folder called `.htaccess` with:
      ```
      <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
      </IfModule>
      ```

### Option 2: Using a Subdomain (chat.bennamo.com)

1. **Create a subdomain in your domain registrar or DNS provider**
   - Add a CNAME record pointing to your GitHub Pages URL or Netlify/Vercel URL
   - For GitHub Pages: `bennamo.github.io`
   - For Netlify: `your-site-name.netlify.app`
   - For Vercel: `your-site-name.vercel.app`

2. **Update base path in vite.config.ts**
   ```typescript
   base: '/', // Empty base path for root domain or subdomain
   ```

3. **Configure your deployment provider to recognize the custom domain**
   - GitHub Pages: Go to repository settings → Pages → Custom domain
   - Netlify/Vercel: Domain settings → Add custom domain

### Option 3: Embedding in an Existing Website

If you want to embed the chatbot into your existing bennamo.com website:

1. **Build the chatbot as a standalone app**
   ```bash
   VITE_OPENROUTER_API_KEY=your-api-key npm run build
   ```

2. **Embed using an iframe**
   Add to your existing website HTML:
   ```html
   <iframe 
     src="https://chat.bennamo.com" 
     style="width:100%; height:600px; border:none;"
     title="Benjamin Namo Portfolio Chatbot">
   </iframe>
   ```

## Important Security Notes

1. **Never expose your API key**
   - Always use environment variables or secrets
   - Verify your `.env` file is in `.gitignore`
   - Check your commits to ensure the key isn't included

2. **Set API key usage limits**
   - In OpenRouter dashboard, set usage limits
   - Monitor API usage to avoid unexpected charges

3. **Enable CORS restrictions**
   - If using OpenRouter directly in production, restrict domains that can access your API

## Troubleshooting

### Deployment Issues
- **API key not working**: Ensure environment variables are properly set in your hosting provider
- **404 errors on refresh**: Make sure routing is properly configured for SPAs
- **CORS errors**: Check API configurations for domain restrictions

### Domain Setup Issues
- **DNS not resolving**: DNS changes can take up to 48 hours to propagate
- **SSL certificate errors**: Make sure HTTPS is properly configured

For any other issues, check hosting provider documentation or GitHub Actions logs. 