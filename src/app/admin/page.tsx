'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // @ts-ignore
    window.CMS_MANUAL_INIT = true
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
    script.onload = () => {
      // @ts-ignore
      window.CMS.init()
    }
    document.body.appendChild(script)
  }, [])
  
  return <div id="nc-root" style={{minHeight: '100vh'}} />
}
