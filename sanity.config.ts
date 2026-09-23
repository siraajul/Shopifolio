'use client'

/**
 * Configuration for the standalone Sanity Studio hosted at *.sanity.studio.
 * The Studio is no longer mounted inside the Next.js app, so there is no
 * basePath: it is served from the root of its own domain.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schema } from './src/sanity/schema'
import { structure } from './src/sanity/structure'

// The Studio is built by the Sanity CLI (Vite), which only inlines env vars
// prefixed with SANITY_STUDIO_ into the browser bundle. It cannot read the
// NEXT_PUBLIC_* vars that src/sanity/env.ts asserts on, so this config reads
// its own vars and falls back to literals. These are public identifiers that
// ship in the client bundle either way, not secrets.
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'nl13gjir'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-01-01'

export default defineConfig({
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
