import { definePlugin } from 'sanity'
import { LaunchIcon } from '@sanity/icons'
import VercelDeployTool from '../components/VercelDeployTool'

export const vercelDeployTool = definePlugin({
  name: 'vercel-deploy',
  tools: [
    {
      name: 'vercel-deploy',
      title: 'Deploy',
      icon: LaunchIcon,
      component: VercelDeployTool,
    },
  ],
})