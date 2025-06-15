# GSAP Animation Extraction Report

## Overview
This document provides a comprehensive extraction of all GSAP (GreenSock Animation Platform) and React GSAP usage throughout the fitness landing page repository.

## Dependencies
The project includes the following GSAP-related dependencies:

### package.json
```json
{
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "gsap": "^3.12.7"
  }
}
```

**Note**: While `@gsap/react` is installed, it's not actually being used in the codebase. The project uses vanilla GSAP with React hooks.

## Main Animation Files

### 1. src/App.jsx
**Primary animations file** - Contains the main GSAP animation logic.

#### Imports:
```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
```

#### Animation Implementation:
```jsx
const App = () => {
    const cardRefs = useRef([]);
    const headerRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        // Header entrance animation
        gsap.fromTo(
            headerRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        // Hero section entrance animation
        gsap.fromTo(
            heroRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
        );

        // Cards staggered entrance animation with 3D hover effects
        cardRefs.current.forEach((card, index) => {
            // Initial staggered entrance animation
            gsap.fromTo(
                card,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.5 + index * 0.2, ease: "back.out(1.7)" }
            );

            // 3D Rotation hover effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Limited rotation to prevent extreme tilting (-5 to 5 degrees)
                const rotateX = Math.max(-5, Math.min(5, (y - centerY) / 20));
                const rotateY = Math.max(-5, Math.min(5, (centerX - x) / 20));

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    scale: 1.02,
                    duration: 0.5,
                    ease: "power1.out"
                });
            });

            // Reset animation on mouse leave
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                    duration: 0.5,
                    ease: "power1.out"
                });
            });
        });
    }, []);

    // Function to collect card references for animation
    const addToCardRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };
}
```

### 2. legacy/legacy_app.jsx
**Legacy version** - Similar animation structure but with more aggressive rotation effects.

#### Key Differences from Main App:
- More aggressive rotation: `(y - centerY) / 10` and `(centerX - x) / 10` (vs. `/20` in main app)
- No rotation limits (can rotate beyond ±5 degrees)
- Uses `custom-bg` class instead of specific background styles

### 3. legacy/app.jsx
**Incomplete legacy file** - Contains basic structure but incomplete animation implementation.

## Animation Types Used

### 1. Entrance Animations
- **Header**: Slides down from above with fade-in (`y: -50` to `y: 0`)
- **Hero Section**: Slides up from below with fade-in (`y: 50` to `y: 0`)
- **Cards**: Staggered entrance from below with bounce effect (`back.out(1.7)` easing)

### 2. Interactive Animations
- **3D Card Hover**: Mouse-following 3D rotation with perspective
- **Scale on Hover**: Slight scale increase (`scale: 1.02`)
- **Dynamic Shadows**: Shadow changes on hover for depth effect

### 3. GSAP Easing Functions Used
- `power3.out`: Smooth deceleration for entrance animations
- `power1.out`: Gentle easing for hover effects
- `back.out(1.7)`: Bounce-back effect for card entrances

## Component Integration

### Components Using Animation Refs:
All major components receive the `addToCardRefs` function to register elements for animation:

1. **Header** - receives `headerRef`
2. **Hero** - receives `heroRef` and `addToCardRefs`
3. **Features** - receives `addToCardRefs`
4. **SuccessSection** - receives `addToCardRefs`
5. **Pricing** - receives `addToCardRefs`
6. **Trainers** - receives `addToCardRefs`
7. **WorkoutCategories** - receives `addToCardRefs`
8. **Testimonials** - receives `addToCardRefs`
9. **CallToAction** - receives `addToCardRefs`
10. **Footer** - no animation

### Hero Component Special Case:
```jsx
// Hero.jsx has its own refs for individual dashboard cards
const revenueRef = useRef(null);
const membersRef = useRef(null);
const analyticsRef = useRef(null);

useEffect(() => {
    if (revenueRef.current) {
        addToCardRefs(revenueRef.current);
    }
    if (membersRef.current) {
        addToCardRefs(membersRef.current);
    }
    if (analyticsRef.current) {
        addToCardRefs(analyticsRef.current);
    }
}, [addToCardRefs]);
```

## CSS Support for Animations

### Transform GPU Acceleration:
```css
.transform-gpu {
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform;
}
```

### Glass Card Effects:
```css
.glass-card {
    background: rgba(30, 30, 40, 0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    perspective: 1000px;
}

.glass-card:hover {
    background: rgba(40, 40, 50, 0.35);
    box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
}
```

## Performance Considerations

### Optimizations Used:
1. **Transform Perspective**: Set to 1000px for consistent 3D rendering
2. **GPU Acceleration**: Using `translateZ(0)` and `will-change: transform`
3. **Event Management**: Proper event listeners for mousemove and mouseleave
4. **Ref Management**: Avoiding duplicate refs in the array

### Potential Improvements:
1. **Use @gsap/react**: The installed `@gsap/react` package with `useGSAP` hook for better React integration
2. **Cleanup Event Listeners**: Add cleanup in useEffect return function
3. **Throttle Mouse Events**: Consider throttling mousemove events for better performance
4. **ScrollTrigger**: Could add scroll-triggered animations for better UX

## Animation Flow Sequence

1. **Page Load** (0s): Header animation starts (`y: -50` to `y: 0`)
2. **0.3s**: Hero section animation starts (`y: 50` to `y: 0`)
3. **0.5s**: First card animation starts (`y: 100` to `y: 0`)
4. **0.7s, 0.9s, 1.1s...**: Subsequent cards animate in sequence (staggered by 0.2s)
5. **User Interaction**: 3D hover effects trigger on mouse movement over cards

## Files with No GSAP Usage

The following component files do not contain GSAP animations:
- All individual component files (Header, Features, Pricing, etc.)
- index.css (contains only CSS transitions and transforms)
- main.jsx
- All other configuration files

## Recommendations

1. **Migrate to @gsap/react**: Use the installed `@gsap/react` package for better React integration
2. **Add ScrollTrigger**: Implement scroll-triggered animations for sections coming into view
3. **Event Cleanup**: Add proper cleanup for event listeners
4. **Animation States**: Consider adding loading states and reduced motion preferences
5. **Performance Monitoring**: Monitor animation performance on lower-end devices

## Summary

The project uses GSAP effectively for:
- **Page entrance animations** with staggered timing
- **Interactive 3D card effects** with mouse-following rotation
- **Smooth easing** with professional animation curves
- **Cross-browser compatibility** with proper fallbacks

The animation system is centralized in the main App component and distributes animation capabilities to child components through a ref callback system.
