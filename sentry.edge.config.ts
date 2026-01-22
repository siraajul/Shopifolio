import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://d41e569bdd07349731b99085d3eb0a2d@o4510738392809472.ingest.us.sentry.io/4510738394447872",

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});
