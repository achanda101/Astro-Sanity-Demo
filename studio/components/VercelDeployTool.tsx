import React, { useState } from 'react'
import { Button, Card, Flex, Stack, Text, useToast } from '@sanity/ui'
import { LaunchIcon } from '@sanity/icons'

interface DeployResponse {
  success: boolean
  message: string
  deploymentUrl?: string
}

export default function VercelDeployTool() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [lastDeployment, setLastDeployment] = useState<DeployResponse | null>(null)
  const toast = useToast()
  
  // Check if environment variable is available
  const deployHook = process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK
  const isConfigured = !!deployHook

  const triggerDeploy = async () => {
    setIsDeploying(true)
    
    try {
      const deployHook = process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK
      
      // Debug: Log all environment variables that start with SANITY_STUDIO_
      console.log('Debug: Environment variables:')
      Object.keys(process.env).forEach(key => {
        if (key.startsWith('SANITY_STUDIO_')) {
          console.log(`${key}:`, process.env[key])
        }
      })
      
      if (!deployHook) {
        throw new Error('SANITY_STUDIO_VERCEL_DEPLOY_HOOK environment variable is not set. Please restart your studio after adding the environment variable.')
      }

      const response = await fetch(deployHook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main', // or your default branch
          timestamp: new Date().toISOString(),
          source: 'sanity-studio'
        })
      })

      if (response.ok) {
        const result = await response.json()
        const deployResponse: DeployResponse = {
          success: true,
          message: 'Deployment triggered successfully!',
          deploymentUrl: result.job?.url
        }
        
        setLastDeployment(deployResponse)
        toast.push({
          status: 'success',
          title: 'Deploy Triggered',
          description: 'Your Astro app is being deployed to Vercel',
        })
      } else {
        throw new Error(`Deploy hook failed with status ${response.status}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      const deployResponse: DeployResponse = {
        success: false,
        message: errorMessage
      }
      
      setLastDeployment(deployResponse)
      toast.push({
        status: 'error',
        title: 'Deploy Failed',
        description: errorMessage,
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Text size={3} weight="semibold">
          Deploy to Vercel
        </Text>
        
        <Text size={2} muted>
          Trigger a deployment of your Astro app with the latest content from Sanity.
        </Text>

        <Flex justify="flex-start">
          <Button
            icon={LaunchIcon}
            text={isDeploying ? 'Deploying...' : 'Deploy Now'}
            tone="primary"
            loading={isDeploying}
            onClick={triggerDeploy}
            disabled={isDeploying}
          />
        </Flex>

        {lastDeployment && (
          <Card 
            padding={3} 
            radius={2} 
            tone={lastDeployment.success ? 'positive' : 'critical'}
            border
          >
            <Stack space={2}>
              <Text size={2} weight="medium">
                {lastDeployment.success ? '✅ Success' : '❌ Error'}
              </Text>
              <Text size={1}>
                {lastDeployment.message}
              </Text>
              {lastDeployment.deploymentUrl && (
                <Text size={1}>
                  <a 
                    href={lastDeployment.deploymentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    View deployment
                  </a>
                </Text>
              )}
            </Stack>
          </Card>
        )}

        <Card padding={3} radius={2} tone={isConfigured ? 'positive' : 'caution'} border>
          <Stack space={2}>
            <Text size={2} weight="medium">
              {isConfigured ? '✅ Configuration Status' : '⚠️ Setup Required'}
            </Text>
            <Text size={1}>
              {isConfigured ? (
                `Deploy hook is configured: ${deployHook?.substring(0, 50)}...`
              ) : (
                'Make sure to set your SANITY_STUDIO_VERCEL_DEPLOY_HOOK environment variable in your .env.local file and restart the studio.'
              )}
            </Text>
            <Text size={1}>
              <strong>Debug info:</strong> Environment variables starting with SANITY_STUDIO_:
              {Object.keys(process.env).filter(key => key.startsWith('SANITY_STUDIO_')).map(key => (
                <div key={key}>{key}: {process.env[key] ? '✅ Set' : '❌ Not set'}</div>
              ))}
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}