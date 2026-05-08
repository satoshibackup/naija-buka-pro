'use client'
import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    document.title = 'Content Manager'
    // Hide site header/footer on admin page
    document.body.style.background = '#fff'
    
    // @ts-ignore
    window.CMS_MANUAL_INIT = true
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
    script.onload = () => {
      // @ts-ignore
      window.CMS.init({
        config: {
          load_config_file: false,
          backend: {
            name: 'test-repo',
            local_backend: true
          },
          local_backend: true,
          media_folder: "public/uploads",
          public_folder: "/uploads",
          collections: [
            {
              name: "settings",
              label: "Site Settings",
              files: [
                {
                  file: "data/site.json",
                  label: "Site Settings",
                  name: "settings",
                  fields: [
                    {label: "Business Name", name: "businessName", widget: "string"},
                    {label: "Brand Name", name: "brandName", widget: "string"},
                    {label: "Logo", name: "logo", widget: "image", required: false},
                    {label: "WhatsApp Number", name: "whatsappNumber", widget: "string"},
                    {label: "Phone", name: "phone", widget: "string"},
                    {label: "Paystack Public Key", name: "paystackPublicKey", widget: "string"},
                    {label: "Formspree Endpoint", name: "formspreeEndpoint", widget: "string"},
                    {label: "Hero Title", name: "heroTitle", widget: "string"},
                    {label: "Hero Subtitle", name: "heroSubtitle", widget: "text"},
                    {label: "Show Catering Section", name: "cateringEnabled", widget: "boolean", default: true},
                    {label: "Catering Title", name: "cateringTitle", widget: "string"},
                    {label: "Catering Text", name: "cateringText", widget: "text"},
                    {label: "Catering Image", name: "cateringImage", widget: "image"},
                    {label: "Catering Button Text", name: "cateringButtonText", widget: "string"},
                    {label: "Catering Button Link", name: "cateringButtonLink", widget: "string"},
                    {
                      label: "Delivery Zones",
                      name: "deliveryZones",
                      widget: "list",
                      fields: [
                        {label: "Area Name", name: "name", widget: "string"},
                        {label: "Fee", name: "fee", widget: "number"}
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "menu",
              label: "Menu Items",
              folder: "data/menu",
              extension: "json",
              create: true,
              slug: "{{fields.name}}",
              fields: [
                {label: "Food Name", name: "name", widget: "string"},
                {label: "Price", name: "price", widget: "number"},
                {label: "Category", name: "category", widget: "select", options: ["Rice", "Swallow", "Soups", "Grills", "Drinks", "Small Chops"]},
                {label: "In Stock", name: "inStock", widget: "boolean", default: true},
                {label: "Food Image", name: "image", widget: "image"},
                {label: "Description", name: "description", widget: "text", required: false}
              ]
            }
          ]
        }
      })
    }
    document.body.appendChild(script)
  }, [])
  
  return <div id="nc-root" />
}
