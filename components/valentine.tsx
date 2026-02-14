'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'

export function Valentine() {
  const [noClickCount, setNoClickCount] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; top: number; duration: number }>>([])
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Generate heart positions only on client after hydration
  useEffect(() => {
    const generatedHearts = [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
    }))
    setHearts(generatedHearts)
  }, [])

  const moveNoButton = () => {
    const randomX = Math.random() * (window.innerWidth - 150)
    const randomY = Math.random() * (window.innerHeight - 60)
    setNoPosition({ x: randomX, y: randomY })
    setNoClickCount(prev => prev + 1)
  }

  const handleYesClick = () => {
    setYesClicked(true)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-red-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center z-10">
        {/* Main Question */}
        <h1 className="text-6xl md:text-7xl font-bold text-red-600 mb-12 select-none">
          Will you be my valentine? 💝
        </h1>

        {/* Messages based on click count */}
        {noClickCount >= 3 && noClickCount < 6 && !yesClicked && (
          <p className="text-2xl md:text-3xl text-red-500 font-semibold mb-8 animate-pulse">
            the no button is now broken from too many clicks...try the other button
          </p>
        )}

        {noClickCount >= 6 && !yesClicked && (
          <p className="text-2xl md:text-3xl text-red-600 font-bold mb-8">
            ... just say yes god damn it 😤
          </p>
        )}

        {yesClicked && (
          <div className="mb-8 animate-in fade-in zoom-in">
            <p className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
              finallyyyy haha ❤️❤️
            </p>
          </div>
        )}

        {/* Buttons Container */}
        <div className="flex gap-6 justify-center items-center min-h-16">
          {/* Yes Button - Fixed */}
          <Button
            onClick={handleYesClick}
            disabled={yesClicked}
            className={`px-12 py-8 text-2xl font-bold rounded-full transition-all transform hover:scale-110 ${
              yesClicked
                ? 'bg-green-600 hover:bg-green-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            ✓
          </Button>

          {/* No Button - Elusive */}
          <button
            ref={noButtonRef}
            onClick={moveNoButton}
            style={
              noClickCount > 0
                ? {
                    position: 'fixed',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                  }
                : {}
            }
            className="px-12 py-8 text-2xl font-bold rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-110 cursor-pointer z-50"
          >
            ✗
          </button>
        </div>

        {/* Click counter (fun element) */}
        {noClickCount > 0 && !yesClicked && (
          <p className="mt-8 text-gray-600 text-lg">
            You've tried to escape {noClickCount} time{noClickCount !== 1 ? 's' : ''}! 😏
          </p>
        )}
      </div>

      {/* Decorative hearts floating */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-4xl animate-pulse"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              opacity: 0.3,
              animation: `float ${heart.duration}s ease-in-out infinite`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  )
}

// Mobile Version - Optimized for smaller screens
export function ValentineMobile() {
  const [noClickCount, setNoClickCount] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; top: number; duration: number }>>([])
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Generate heart positions only on client after hydration
  useEffect(() => {
    const generatedHearts = [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
    }))
    setHearts(generatedHearts)
  }, [])

  const moveNoButton = () => {
    const randomX = Math.random() * (window.innerWidth - 120)
    const randomY = Math.random() * (window.innerHeight - 50)
    setNoPosition({ x: randomX, y: randomY })
    setNoClickCount(prev => prev + 1)
  }

  const handleYesClick = () => {
    setYesClicked(true)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-red-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center z-10 w-full max-w-md">
        {/* Main Question - Mobile Optimized */}
        <h1 className="text-4xl font-bold text-red-600 mb-8 select-none">
          Will you be my valentine? 💝
        </h1>

        {/* Messages based on click count */}
        {noClickCount >= 2 && noClickCount < 4 && !yesClicked && (
          <p className="text-xl text-red-500 font-semibold mb-6 animate-pulse">
            the no button is now broken from too many clicks...try the other button
          </p>
        )}

        {noClickCount >= 4 && !yesClicked && (
          <p className="text-xl text-red-600 font-bold mb-6">
            😤 just say YES already!
          </p>
        )}

        {yesClicked && (
          <div className="mb-6 animate-in fade-in zoom-in">
            <p className="text-3xl font-bold text-green-600 mb-2">
              you made the right choice ❤️
            </p>
          </div>
        )}

        {/* Buttons Container - Mobile Optimized */}
        <div className="flex flex-col gap-4 justify-center items-center">
          {/* Yes Button - Big and Prominent */}
          <Button
            onClick={handleYesClick}
            disabled={yesClicked}
            className={`w-full max-w-xs px-8 py-6 text-xl font-bold rounded-full transition-all transform hover:scale-105 ${
              yesClicked
                ? 'bg-green-600 hover:bg-green-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            ✓
          </Button>

          {/* No Button - Elusive on mobile too */}
          <button
            ref={noButtonRef}
            onClick={moveNoButton}
            style={
              noClickCount > 0
                ? {
                    position: 'fixed',
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                    width: '100px',
                  }
                : { width: '100%', maxWidth: '280px' }
            }
            className="px-8 py-6 text-xl font-bold rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-105 cursor-pointer z-50"
          >
            ✗
          </button>
        </div>

        {/* Click counter - Mobile Optimized */}
        {noClickCount > 0 && !yesClicked && (
          <p className="mt-6 text-sm text-gray-600">
            You've tried to escape {noClickCount} time{noClickCount !== 1 ? 's' : ''}! 😏
          </p>
        )}
      </div>

      {/* Decorative hearts floating - Mobile Optimized */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-pulse"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              opacity: 0.2,
              animation: `float ${heart.duration}s ease-in-out infinite`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(8px); }
        }
      `}</style>
    </div>
  )
}

// Also export as default if needed
export default Valentine