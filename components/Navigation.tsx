'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LiquidGlass from 'liquid-glass-react'
import { createClient } from '@/lib/supabase/client'

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/blobs', label: 'Experiences' },
    { path: '/generate', label: 'Generate Resume' },
  ]

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <nav ref={containerRef} className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <LiquidGlass
          mouseContainer={containerRef}
          elasticity={0.25}
          displacementScale={50}
          blurAmount={0.08}
          saturation={120}
          className="px-6 py-3"
        >
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-gradient">
              ResumeForge
            </Link>

            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors ${
                    pathname === item.path
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </nav>
  )
}
