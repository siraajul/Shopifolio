# Marketing & SEO Setup Guide

Your website is configured for marketing across Google, LinkedIn, Facebook, Instagram, Twitter, and Reddit. Follow these steps to finalize the setup with your specific details.

## 1. Domain Verification

### Google Search Console
1.  Go to [Google Search Console](https://search.google.com/search-console).
2.  Add your domain (`shift2dynamic.com`).
3.  Choose the **HTML Tag** verification method.
4.  Copy the code (it looks like `content="...string..."`).
5.  Open `src/app/layout.tsx`.
6.  Replace `"your-google-verification-code"` with your actual code.

### Bing Webmaster Tools
1.  Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2.  Add your site.
3.  Get your verification code.
4.  Open `src/app/layout.tsx`.
5.  Replace `"your-bing-verification-code"` with your actual code.

## 2. Social Media Links

The website uses "Structured Data" (JSON-LD) to tell Google about your social profiles.

1.  Open `src/app/layout.tsx`.
2.  Find the `sameAs` array around line 100.
3.  Update the URLs to your actual profile links:
    ```json
    "sameAs": [
      "https://www.linkedin.com/company/YOUR_PAGE",
      "https://x.com/YOUR_HANDLE",
      "https://github.com/YOUR_HANDLE",
      "https://www.facebook.com/YOUR_PAGE",
      "https://www.instagram.com/YOUR_HANDLE",
      "https://www.reddit.com/user/YOUR_USER"
    ]
    ```

## 3. SEO Assets

### Open Graph Image
A default social share image has been created at `public/og-image.jpg`.
-   **Preview**: When you share your link on Facebook/LinkedIn/Twitter, this image will show.
-   **Customization**: To change it, simply overwrite `public/og-image.jpg` with your own 1200x630px image.

### Sitemap & Robots
-   **Sitemap**: `https://www.shift2dynamic.com/sitemap.xml` is automatically generated. Submit this URL to Google Search Console.
-   **Robots.txt**: Automatically generated to allow indexing.

## 4. Tracking Pixels (Optional)

If you need to add Facebook Pixel, LinkedIn Insight Tag, or Google Analytics:

-   **Google Analytics**: Already set up via Vercel Analytics. For GA4, add the ID in `src/app/layout.tsx` using a third-party library or `next/third-parties/google`.
-   **Facebook/LinkedIn Pixels**: The best place to add these script tags is in `src/app/layout.tsx` inside the `<body>` or `<head>`, or using `next/script`.
