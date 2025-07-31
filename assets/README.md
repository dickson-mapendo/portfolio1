# Assets Directory

This directory contains all static assets for the portfolio website.

## Structure

- `images/` - All image files (photos, icons, backgrounds)
- `icons/` - Icon files and favicon
- `fonts/` - Custom font files (if any)
- `documents/` - PDF files, resume, etc.

## Image Guidelines

- Use high-quality images from Unsplash or Pexels
- Optimize images for web (WebP format preferred)
- Include alt text for accessibility
- Use appropriate image sizes for different screen resolutions

## Favicon

**IMPORTANT**: The favicon.ico file is currently missing and needs to be created.
You can generate favicons using online tools like:
- https://favicon.io/
- https://realfavicongenerator.net/

Place the generated favicon.ico file in the root assets directory.

## Font Awesome Icons

We're using Font Awesome 6.4.0 CDN for icons throughout the site.
No local icon files are needed as we're loading from CDN.

## Performance Notes

- All images should be optimized for web
- Consider using lazy loading for images below the fold
- Use appropriate image formats (WebP, AVIF for modern browsers)
- Implement responsive images with srcset when needed
