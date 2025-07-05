# ARAWALI GROUP - Premium Industrial Minerals

A modern, responsive website for ARAWALI GROUP showcasing premium industrial minerals and services.

## HTTPS Setup Guide

This guide will help you enable HTTPS for your domain `arawaliminerals.com`.

### Prerequisites

1. **Domain Ownership**: You must own the domain `arawaliminerals.com`
2. **DNS Access**: You need access to your domain's DNS settings
3. **Hosting Platform**: Choose one of the supported hosting platforms below

### Option 1: GitHub Pages (Recommended for Static Sites)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add HTTPS configuration"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose your main branch
   - Save

3. **Configure Custom Domain**:
   - In the same Pages section, enter `arawaliminerals.com` in the custom domain field
   - Check "Enforce HTTPS" (this will be available after DNS is configured)
   - Save

4. **Configure DNS**:
   Add these records to your domain's DNS settings:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

### Option 2: Netlify

1. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Build command: (leave empty for static site)
   - Publish directory: `.`

2. **Configure Custom Domain**:
   - Go to Site settings > Domain management
   - Add custom domain: `arawaliminerals.com`
   - Netlify will automatically provision SSL certificate

3. **Configure DNS**:
   Add these records to your domain's DNS settings:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   ```

### Option 3: Vercel

1. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect it's a static site

2. **Configure Custom Domain**:
   - Go to Project settings > Domains
   - Add domain: `arawaliminerals.com`
   - Vercel will automatically provision SSL certificate

3. **Configure DNS**:
   Add these records to your domain's DNS settings:
   ```
   Type: A
   Name: @
   Value: 76.76.19.34
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Option 4: Cloudflare (Free SSL)

1. **Add Domain to Cloudflare**:
   - Sign up for Cloudflare
   - Add your domain `arawaliminerals.com`
   - Update your domain's nameservers to Cloudflare's

2. **Configure SSL/TLS**:
   - Go to SSL/TLS settings
   - Set encryption mode to "Full" or "Full (strict)"
   - Enable "Always Use HTTPS"

3. **Configure DNS**:
   Add these records in Cloudflare DNS:
   ```
   Type: A
   Name: @
   Value: [Your hosting provider's IP]
   
   Type: CNAME
   Name: www
   Value: arawaliminerals.com
   ```

### Option 5: Traditional Web Hosting

If you're using traditional web hosting (cPanel, etc.):

1. **Contact Your Hosting Provider**:
   - Request SSL certificate installation
   - Many providers offer free Let's Encrypt certificates

2. **Configure .htaccess** (Apache):
   Create a `.htaccess` file in your root directory:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   # Security Headers
   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
   Header always set X-Content-Type-Options nosniff
   Header always set X-Frame-Options DENY
   Header always set X-XSS-Protection "1; mode=block"
   ```

3. **Configure web.config** (IIS):
   Create a `web.config` file in your root directory:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <configuration>
     <system.webServer>
       <rewrite>
         <rules>
           <rule name="HTTP to HTTPS redirect" stopProcessing="true">
             <match url="(.*)" />
             <conditions>
               <add input="{HTTPS}" pattern="off" ignoreCase="true" />
             </conditions>
             <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
           </rule>
         </rules>
       </rewrite>
       <httpProtocol>
         <customHeaders>
           <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains; preload" />
           <add name="X-Content-Type-Options" value="nosniff" />
           <add name="X-Frame-Options" value="DENY" />
           <add name="X-XSS-Protection" value="1; mode=block" />
         </customHeaders>
       </httpProtocol>
     </system.webServer>
   </configuration>
   ```

## Troubleshooting

### Common Issues

1. **"HTTPS Unavailable" Error**:
   - Ensure your domain is properly configured in your hosting platform
   - Wait 24-48 hours for DNS propagation
   - Check that your hosting provider supports HTTPS

2. **Mixed Content Warnings**:
   - Ensure all resources (images, scripts, stylesheets) use HTTPS URLs
   - Update any hardcoded HTTP URLs in your code

3. **SSL Certificate Issues**:
   - Verify your domain ownership
   - Check DNS configuration
   - Contact your hosting provider for certificate installation

4. **Redirect Loops**:
   - Check your redirect rules
   - Ensure you're not redirecting HTTPS to HTTPS

### Testing HTTPS

After setup, test your HTTPS configuration:

1. **Visit your site**: `https://arawaliminerals.com`
2. **Check SSL certificate**: Click the lock icon in your browser
3. **Test redirects**: Try accessing `http://arawaliminerals.com` - it should redirect to HTTPS
4. **Use SSL testing tools**:
   - [SSL Labs](https://www.ssllabs.com/ssltest/)
   - [Why No Padlock](https://www.whynopadlock.com/)

### Security Best Practices

1. **Use HTTPS Everywhere**: All pages should be served over HTTPS
2. **Security Headers**: The configuration files include important security headers
3. **HSTS**: Strict Transport Security is configured for maximum security
4. **Regular Updates**: Keep your SSL certificates up to date

## Support

If you continue to have issues with HTTPS setup:

1. **Check your hosting provider's documentation**
2. **Contact your hosting provider's support**
3. **Verify your domain registrar's DNS settings**
4. **Use online DNS checking tools to verify propagation**

## Files Added for HTTPS Support

- `CNAME` - For GitHub Pages custom domain
- `netlify.toml` - Netlify configuration with HTTPS redirects
- `vercel.json` - Vercel configuration with security headers
- `README.md` - This comprehensive setup guide

The `index.html` file has been updated with security meta tags for additional protection. 