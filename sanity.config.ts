import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Custom Logo Component
const Logo = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900}}>
      <img 
        src="/tagit-3d-logo.png" 
        alt="TAGit" 
        style={{height: '28px', width: 'auto'}} 
      />
      <span style={{color: '#FACC15'}}>TAGit</span>
      <span style={{fontSize: '10px', background: '#16A34A', color: 'white', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px'}}>STUDIO</span>
    </div>
  )
}

export default defineConfig({
  name: 'tag-it-studio',
  title: 'TAGit Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  icon: Logo,

  plugins: [
    structureTool({
      title: 'Content'
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: Logo,
    }
  },

  // Branding - yellow/green theme to match TAGit
  theme: {
    // optional custom theme colors
  }
})
