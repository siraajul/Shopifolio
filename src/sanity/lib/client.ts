import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Every Sanity-reading page sets `revalidate`, so ISR already shields the
  // API from load. Leaving the CDN on would stack a second cache on top and
  // let a regeneration fetch data up to 60s stale.
  useCdn: false,
})
