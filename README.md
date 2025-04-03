# Ketaring.bg Landing Page

A simple, responsive landing page for the ketaring.bg domain. This landing page serves as a placeholder while the full web application is in development.

## Features

- Responsive design that works on all devices
- Modern, clean UI with professional aesthetics
- Contact form for restaurant partnerships
- SEO optimized

## Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling for the landing page
- `script.js` - Form validation and minor UI effects

## Deployment Instructions

### Option 1: GitHub Pages

1. Push this repository to GitHub
2. Enable GitHub Pages in the repository settings
3. Point your domain (ketaring.bg) to GitHub Pages by updating your DNS settings:
   - Add an A record pointing to GitHub Pages IP addresses
   - Add a CNAME record with www pointing to your username.github.io
4. Add a CNAME file to the repository with your domain name

### Option 2: Netlify

1. Sign up for a [Netlify](https://www.netlify.com/) account
2. Create a new site from Git and select your repository
3. Configure your build settings (not required for this simple site)
4. Add your custom domain (ketaring.bg) in the site settings
5. Update your DNS settings according to Netlify's instructions

### Option 3: Traditional Hosting

1. Upload all files to your web hosting provider via FTP
2. Ensure your domain (ketaring.bg) is configured correctly in your hosting panel

## Customization

### Changing Images

- To change the hero background, modify the URL in `styles.css` under the `#hero` selector
- For additional images, add them to an `images` folder and reference them in the CSS

### Modifying Colors

- Edit the color variables at the top of `styles.css` to change the color scheme:
  ```css
  :root {
      --primary-color: #e67e22;
      --secondary-color: #2c3e50;
      /* other color variables */
  }
  ```

### Form Handling

The current implementation shows a success message but doesn't send data anywhere. To enable form submission:

1. Create a server endpoint to receive form data or use a form service like Formspree
2. Uncomment and modify the `submitFormToServer` function in `script.js`

## Browser Compatibility

This landing page is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Development

- Once the full web application is ready, this landing page can be replaced or integrated into the main application
- Consider adding analytics (e.g., Google Analytics) to track visitor engagement

## Contact

For any questions or issues, please contact info@ketaring.bg 