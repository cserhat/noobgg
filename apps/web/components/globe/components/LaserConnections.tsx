'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CityData } from '../types';

interface LaserConnectionsProps {
  cities: CityData[];
  orbitControlsRef: React.RefObject<any>;
  animationSpeed?: number;
  brightness?: number;
  showAllConnections?: boolean;
}

export const LaserConnections = React.memo(({ 
  cities, 
  orbitControlsRef, 
  animationSpeed = 1.0,
  brightness = 1.0,
  showAllConnections = true 
}: LaserConnectionsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.LineBasicMaterial[]>([]);

  // Apply rotation to match the globe view from OrbitControls - SAME as CityHubs
  useFrame(() => {
    if (groupRef.current && orbitControlsRef.current) {
      groupRef.current.rotation.y = -orbitControlsRef.current.getAzimuthalAngle();
    }
  });  // Generate logical connections between strategic cities
  const connections = useMemo(() => {
    const cityConnections: Array<{ start: THREE.Vector3; end: THREE.Vector3; color: THREE.Color; distance: number; startIndex: number; endIndex: number }> = [];
    
    // Convert cities to 3D positions - EXACT SAME as CityHubs
    const cityPositions = cities.map((city, index) => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lng + 180) * (Math.PI / 180);

      return {
        position: new THREE.Vector3(
          -(5.1 * Math.sin(phi) * Math.cos(theta)),
          5.1 * Math.cos(phi),
          5.1 * Math.sin(phi) * Math.sin(theta)
        ),
        city,
        index
      };
    });    // Define gaming-optimized routes (proximity-based for low ping connections)
    const strategicRoutes = [
      // EUROPE - Regional Gaming Clusters
      ['London', 'Paris'], // Close neighbors, low ping
      ['Paris', 'Berlin'], // Central Europe
      ['Berlin', 'Moscow'], // Eastern Europe
      ['Rome', 'Paris'], // South-Central Europe
      ['Istanbul', 'Rome'], // Mediterranean
      ['Istanbul', 'Moscow'], // Eastern connection
      
      // ASIA - Regional Gaming Hubs
      ['Tokyo', 'Seoul'], // Very close, excellent ping
      ['Tokyo', 'Shanghai'], // East Asia gaming cluster
      ['Seoul', 'Shanghai'], // Triangle connection
      ['Shanghai', 'Mumbai'], // Cross-Asian connection
      ['Mumbai', 'Jakarta'], // South Asia to Southeast Asia
      
      // NORTH AMERICA - Gaming Triangle
      ['New York', 'Toronto'], // Very close, same region
      ['New York', 'Los Angeles'], // Coast to coast
      ['Los Angeles', 'Toronto'], // Complete the triangle
      
      // SOUTH AMERICA - Regional Connection
      ['São Paulo', 'Buenos Aires'], // Close South American hubs
      
      // AFRICA - Regional Hub
      ['Lagos', 'Cairo'], // Major African gaming centers
      
      // MIDDLE EAST BRIDGE
      ['Cairo', 'Istanbul'], // Africa to Europe bridge
      
      // ASIA-OCEANIA CONNECTION
      ['Jakarta', 'Sydney'], // Closest Asian hub to Oceania
      
      // STRATEGIC INTERCONTINENTAL GAMING ROUTES (for global tournaments)
      ['New York', 'London'], // Major esports markets connection
      ['London', 'Istanbul'], // Europe-Middle East gaming hub
      ['Istanbul', 'Mumbai'], // Emerging gaming markets bridge
      ['Los Angeles', 'Tokyo'], // Pacific gaming corridor
      
      // ADDITIONAL PROXIMITY-BASED CONNECTIONS
      ['Berlin', 'Rome'], // Central Europe internal
      ['Mumbai', 'Istanbul'], // Alternative Asia-Europe route
    ];

    // Create connections based on strategic routes
    strategicRoutes.forEach(([cityA, cityB]) => {
      const posA = cityPositions.find(cp => cp.city.name === cityA);
      const posB = cityPositions.find(cp => cp.city.name === cityB);
      
      if (posA && posB) {
        const distance = posA.position.distanceTo(posB.position);        // Color coding based on gaming connectivity and ping quality
        let laserColor = new THREE.Color('#00ccff'); // Default cyan
        
        // Determine regions and proximity for gaming optimization
        const getRegion = (cityName: string) => {
          const europeanCities = ['London', 'Paris', 'Berlin', 'Moscow', 'Rome', 'Istanbul'];
          const asianCities = ['Tokyo', 'Seoul', 'Shanghai', 'Mumbai', 'Jakarta'];
          const americanCities = ['New York', 'Los Angeles', 'Toronto', 'São Paulo', 'Buenos Aires'];
          const africanCities = ['Lagos', 'Cairo'];
          const oceaniaCities = ['Sydney'];
          
          if (europeanCities.includes(cityName)) return 'europe';
          if (asianCities.includes(cityName)) return 'asia';
          if (americanCities.includes(cityName)) return 'america';
          if (africanCities.includes(cityName)) return 'africa';
          if (oceaniaCities.includes(cityName)) return 'oceania';
          return 'other';
        };
        
        // Define very close gaming pairs (excellent ping)
        const closeGamingPairs = [
          ['Tokyo', 'Seoul'], ['New York', 'Toronto'], ['São Paulo', 'Buenos Aires'],
          ['London', 'Paris'], ['Paris', 'Berlin'], ['Seoul', 'Shanghai']
        ];
        
        const regionA = getRegion(cityA);
        const regionB = getRegion(cityB);
        
        // Check if this is a very close gaming pair
        const isCloseGamingPair = closeGamingPairs.some(pair => 
          (pair.includes(cityA) && pair.includes(cityB))
        );
        
        if (isCloseGamingPair) {
          // Excellent ping connections - bright white/gold
          laserColor = new THREE.Color('#ffff80'); // Bright gold for best connections
        } else if (regionA === regionB) {
          // Same region connections - good ping
          switch (regionA) {
            case 'europe':
              laserColor = new THREE.Color('#0080ff'); // Blue for Europe
              break;
            case 'asia':
              laserColor = new THREE.Color('#ff8000'); // Orange for Asia
              break;
            case 'america':
              laserColor = new THREE.Color('#00ff80'); // Green for Americas
              break;
            case 'africa':
              laserColor = new THREE.Color('#ffff00'); // Yellow for Africa
              break;
            case 'oceania':
              laserColor = new THREE.Color('#ff0080'); // Magenta for Oceania
              break;
          }
        } else {
          // Intercontinental gaming routes - cyan for global esports
          laserColor = new THREE.Color('#00ffff'); // Bright cyan for international play
        }
        
        // Adjust intensity based on distance and importance
        const maxDistance = 15.0;
        const distanceIntensity = Math.max(0.4, 1.0 - (distance / maxDistance));
        laserColor.multiplyScalar(distanceIntensity);

        cityConnections.push({
          start: posA.position.clone(),
          end: posB.position.clone(),
          color: laserColor,
          distance,
          startIndex: posA.index,
          endIndex: posB.index
        });
      }
    });

    // Sort by importance (shorter distances and megacity connections first)
    return cityConnections.sort((a, b) => {
      const aImportance = (a.distance < 8.0 ? 1 : 0) + (a.color.r > 0.8 ? 2 : 0);
      const bImportance = (b.distance < 8.0 ? 1 : 0) + (b.color.r > 0.8 ? 2 : 0);
      return bImportance - aImportance;
    });
  }, [cities]);  // Strategic laser firing animation - different speeds for different route types
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    materialsRef.current.forEach((material, index) => {
      if (material && connections[index]) {
        const connection = connections[index];
        
        // Determine route type based on color for different animation speeds
        let fireRate = 2.0; // Default
        let intensity = 0.8;
        
        // Megacity routes (magenta) - fastest and brightest
        if (connection.color.r > 0.8 && connection.color.g < 0.3) {
          fireRate = 4.0;
          intensity = 1.0;
        }
        // Capital routes (green) - moderate speed
        else if (connection.color.g > 0.8 && connection.color.r < 0.3) {
          fireRate = 3.0;
          intensity = 0.9;
        }
        // Mixed routes (yellow) - variable speed
        else if (connection.color.r > 0.8 && connection.color.g > 0.8) {
          fireRate = 3.5;
          intensity = 0.85;
        }
        // Regional routes (blue) - slower
        else {
          fireRate = 2.5;
          intensity = 0.7;
        }
        
        // Add route-specific variations
        const routeVariation = (index % 3) * 0.3;
        fireRate += routeVariation;
        
        const firePhase = (time * fireRate * animationSpeed + index * 2.0) % (Math.PI * 2);
        
        // More strategic firing pattern - bursts with varying intensities
        let firingIntensity = 0.2;
        const burstCycle = (time * fireRate * animationSpeed + index * 2.0) % 4.0;
        
        if (burstCycle < 0.15) {
          // Initial bright burst
          firingIntensity = intensity;
        } else if (burstCycle < 0.4) {
          // Quick fade with pulse
          const fadePos = (burstCycle - 0.15) / 0.25;
          firingIntensity = intensity * (1.0 - fadePos * 0.6) + Math.sin(time * 8.0 + index) * 0.1;
        } else if (burstCycle < 0.8) {
          // Sustain phase with gentle pulse
          firingIntensity = intensity * 0.4 + Math.sin(time * 4.0 + index * 0.5) * 0.15;
        } else {
          // Rest period with minimal activity
          firingIntensity = 0.15 + Math.sin(time * 2.0 + index * 1.2) * 0.05;
        }
        
        // Distance-based intensity (strategic routes maintain strength better)
        const distanceBoost = connection.distance < 8.0 ? 1.2 : 1.0;
        const distanceIntensity = Math.max(0.4, 1.0 - (connection.distance / 12.0)) * distanceBoost;
        
        // Combine all effects with brightness control
        const finalIntensity = firingIntensity * distanceIntensity * brightness;
        material.opacity = Math.max(0.15, Math.min(1.0, finalIntensity));
        
        // Dynamic color - enhanced for strategic routes
        const baseColor = connection.color.clone();
        const whiteCore = new THREE.Color('#ffffff');
        const coreBlend = intensity > 0.9 ? 0.4 : 0.25; // More white for important routes
        const blendedColor = whiteCore.lerp(baseColor, coreBlend);
        
        material.color.copy(blendedColor).multiplyScalar(Math.max(0.3, finalIntensity));
      }
    });
  });return (
    <group ref={groupRef}>      {connections.map((connection, index) => {
        // Create 3D curved laser beam following sphere surface
        const startPos = connection.start.clone();
        const endPos = connection.end.clone();
        
        // Calculate multiple intermediate points for sphere-following curve
        const numPoints = 8;
        const points: THREE.Vector3[] = [];
        
        for (let i = 0; i <= numPoints; i++) {
          const t = i / numPoints;
          
          // Spherical interpolation (slerp) for natural sphere surface curve
          const interpolated = new THREE.Vector3().lerpVectors(startPos, endPos, t);
          
          // Project point onto sphere surface with height variation
          interpolated.normalize();
            // Add dynamic height based on position and curve intensity
          const heightVariation = Math.sin(t * Math.PI) * 0.3; // Reduced arc height
          const baseRadius = 5.1;
          const curveRadius = baseRadius + heightVariation;
          
          interpolated.multiplyScalar(curveRadius);
          points.push(interpolated);
        }
        
        // Create smooth curve through all points
        const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
        const finalPoints = curve.getPoints(32);
        const geometry = new THREE.BufferGeometry().setFromPoints(finalPoints);

        // Create multiple laser layers for Star Wars effect
        return (
          <group key={index}>
            {/* Outer glow - thick beam */}
            <primitive 
              object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: connection.color,
                transparent: true,
                opacity: 0.3,
                linewidth: 8
              }))} 
            />
            
            {/* Middle beam - medium thickness */}
            <primitive 
              object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: connection.color.clone().multiplyScalar(1.5),
                transparent: true,
                opacity: 0.6,
                linewidth: 4
              }))} 
            />            {/* Inner core - bright and thin */}
            <primitive 
              object={(() => {
                const material = new THREE.LineBasicMaterial({
                  color: new THREE.Color('#ffffff'), // Bright white core
                  transparent: true,
                  opacity: 1.0,
                  linewidth: 2
                });
                materialsRef.current[index] = material;
                return new THREE.Line(geometry, material);
              })()} 
            />

            {/* Add point lights at both ends for glow effect */}
            <pointLight
              position={startPos}
              color={connection.color}
              intensity={0.5}
              distance={2}
              decay={2}
            />
            <pointLight
              position={endPos}
              color={connection.color}
              intensity={0.5}
              distance={2}
              decay={2}
            />
          </group>
        );
      })}
    </group>
  );
});

LaserConnections.displayName = 'LaserConnections';
