/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

// Falls back to literals so `sanity deploy` works without --env-file.
// These are public identifiers, not secrets.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'nl13gjir'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  // Hostname for the hosted Studio: https://shopifolio.sanity.studio
  studioHost: 'shopifolio',
  deployment: {
    // Pinned so `sanity deploy` does not prompt for the application id.
    appId: 'cnv8rd2us8ohb9xpe8zi9yu3',
  },
})
