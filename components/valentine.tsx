'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'

export function Valentine() {
  const [noClickCount, setNoClickCount] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; top: number; duration: number }>>([])
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; duration: number; delay: number }>>([])
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

  // Generate celebration particles when yes is clicked
  useEffect(() => {
    if (yesClicked) {
      const generatedParticles = [...Array(30)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 1 + Math.random() * 2,
        delay: Math.random() * 0.5,
      }))
      setParticles(generatedParticles)
    }
  }, [yesClicked])

  const moveNoButton = () => {
    if (noClickCount < 9) { // Only move until the 9th click (10th click will hide it)
      const randomX = Math.random() * (window.innerWidth - 150)
      const randomY = Math.random() * (window.innerHeight - 60)
      setNoPosition({ x: randomX, y: randomY })
    }
    setNoClickCount(prev => prev + 1)
  }

  const handleYesClick = () => {
    setYesClicked(true)
  }

  // Different phrases based on click count
  const getMessage = () => {
    if (yesClicked) return null
    
    const messages = [
      "Are you sure? ", // 1 click
      "Think again! 💭", // 2 clicks
      "well well well ", // 3 clicks
      "Seriously? Stop clicking no! 😠", // 4 clicks
      "what are you doingg! ", // 5 clicks
      "I'm not giving up that easily! 💪", // 6 clicks
      "just say yes already! 😤", // 7 clicks
      "This is your last chance! ⚠️", // 8 clicks
      "The button is about to break! 🔨", // 9 clicks
    ]

    if (noClickCount <= 9) {
      return messages[noClickCount - 1] || null
    }
    return null
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-red-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center z-10">
        {/* Main Question */}
        <h1 className="text-6xl md:text-7xl font-bold text-red-600 mb-12 select-none">
          Will you be my valentine? 💝
        </h1>

        {/* Messages based on click count */}
        {!yesClicked && getMessage() && (
          <p className="text-2xl md:text-3xl text-red-500 font-semibold mb-8 animate-pulse">
            {getMessage()}
          </p>
        )}

        {/* Broken button message */}
        {noClickCount >= 10 && !yesClicked && (
          <div className="mb-8">
            <p className="text-3xl md:text-4xl text-red-600 font-bold mb-4 animate-bounce">
              💥 BUTTON BROKEN! 💥
            </p>
            <p className="text-2xl text-red-500">
              The no button exploded from too many clicks! 
              You have no choice now... 😈
            </p>
          </div>
        )}

        {yesClicked && (
          <div className="mb-8 animate-in fade-in zoom-in">
            <p className="text-5xl md:text-6xl font-bold text-green-600 mb-4">
              YAYYY! 🎉❤️
            </p>
            <p className="text-3xl text-pink-600">
              khsara too far for a gift
            </p>
          </div>
        )}

        {/* Buttons Container */}
        <div className="flex gap-6 justify-center items-center min-h-16">
          {/* Yes Button - Fixed (same size as no button) */}
          <button
            onClick={handleYesClick}
            disabled={yesClicked}
            className={`px-12 py-8 text-2xl font-bold rounded-full transition-all transform hover:scale-110 ${
              yesClicked
                ? 'bg-green-600 hover:bg-green-600 text-white cursor-not-allowed opacity-75'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            YES! ✓
          </button>

          {/* No Button - Elusive (hidden after 10 clicks) */}
          {noClickCount < 10 && !yesClicked && (
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
              className={`px-12 py-8 text-2xl font-bold rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-110 cursor-pointer z-50 ${
                noClickCount >= 8 ? 'animate-shake' : ''
              }`}
            >
              NO ✗
            </button>
          )}
        </div>

        {/* Click counter (fun element) */}
        {noClickCount > 0 && noClickCount < 10 && !yesClicked && (
          <p className="mt-8 text-gray-600 text-lg">
            You've tried to escape {noClickCount} time{noClickCount !== 1 ? 's' : ''}! 😏
            {noClickCount >= 8 && " (It's about to break!)"}
          </p>
        )}
      </div>

      {/* Celebration Particles */}
      {yesClicked && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute text-2xl animate-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `particle ${particle.duration}s ease-out forwards`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              {['❤️', '💖', '💕', '💗', '💓', '🎉', '🎊', '✨'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

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

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s infinite;
        }
        
        @keyframes particle {
          0% {
            transform: scale(1) translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-particle {
          animation: particle var(--duration) ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Valentine