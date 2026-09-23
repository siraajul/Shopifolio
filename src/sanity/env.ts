export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Public identifiers that ship in the client bundle regardless, so they carry
// literal fallbacks. This keeps CI builds working without any env var setup.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nl13gjir'

export const useCdn = false
