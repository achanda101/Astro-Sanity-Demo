import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './src/schemaTypes'
import { DemoLogo } from './components/DemoLogo'
import { structure } from './src/structure'
import { vercelDeployTool } from './tools/vercelDeploy'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Demo',
  icon: DemoLogo,
  projectId,
  dataset,
  plugins: [ structureTool({ structure }), visionTool(), media(), vercelDeployTool() ],
  schema: {
    types: schemaTypes,
  },
})
