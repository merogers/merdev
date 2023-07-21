import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

export default function ParticlesEffect() {
  // Here we initialize the tsParticle engine
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const color = '#ccc';

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="flex h-full w-full absolute top-0 -z-10"
        options={{
          fullScreen: false,
          background: {},
          backgroundMask: {
            cover: {
              color: {
                value: color,
              },
              opacity: 1,
            },
            enable: false,
          },
          detectRetina: true,
          fpsLimit: 30,
          infection: {
            cure: false,
            delay: 0,
            enable: false,
            infections: 0,
            stages: [],
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onClick: {
                enable: false,
                mode: [],
              },
              onDiv: {
                ids: [],
                enable: false,
                mode: [],
                type: 'circle',
              },
              onHover: {
                enable: false,
                mode: [],
                parallax: {
                  enable: false,
                  force: 2,
                  smooth: 10,
                },
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 200,
                duration: 0.4,
              },
              connect: {
                distance: 80,
                links: {
                  opacity: 1,
                },
                radius: 60,
              },
              grab: {
                distance: 100,
                links: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
                speed: 1,
              },
              slow: {
                factor: 3,
                radius: 200,
              },
            },
          },
          particles: {
            collisions: {
              enable: false,
              mode: 'bounce',
            },
            color: {
              value: color,
              animation: {
                enable: false,
                speed: 1,
                sync: true,
              },
            },
            links: {
              blink: false,
              color: {
                value: color,
              },
              consent: false,
              distance: 100,
              enable: true,
              opacity: 0.8,
              shadow: {
                blur: 5,
                color: {
                  value: 'lime',
                },
                enable: false,
              },
              triangles: {
                enable: false,
              },
              width: 1,
              warp: false,
            },
            move: {
              direction: 'none',
              enable: true,
              noise: {
                delay: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 0,
                },
                enable: false,
              },
              outMode: 'out',
              random: false,
              speed: 0.5,
              straight: false,
              trail: {
                enable: false,
                length: 15,
                fillColor: {
                  value: '#000000',
                },
              },
              vibrate: false,
              warp: false,
            },
            number: {
              density: {
                enable: false,
                area: 800,
                factor: 1000,
              },
              limit: 0,
              value: 100,
            },
            opacity: {
              animation: {
                enable: false,
                minimumValue: 0,
                speed: 2,
                sync: false,
              },
              random: {
                enable: false,
                minimumValue: 1,
              },
              value: 1,
            },
            rotate: {
              animation: {
                enable: false,
                speed: 0,
                sync: false,
              },
              direction: 'clockwise',
              random: false,
              value: 0,
            },
            shadow: {
              blur: 0,
              color: {
                value: '#fff',
              },
              enable: false,
              offset: {
                x: 0,
                y: 0,
              },
            },
            shape: {
              options: {},
              type: 'circle',
            },
            size: {
              animation: {
                destroy: 'none',
                enable: false,
                minimumValue: 0,
                speed: 5,
                startValue: 'max',
                sync: false,
              },
              random: {
                enable: false,
                minimumValue: 1,
              },
              value: 2,
            },
            stroke: {
              color: {
                value: '#ccc',
              },
              width: 0,
              opacity: 0.5,
            },
            twinkle: {
              lines: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
              },
              particles: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
              },
            },
          },
          pauseOnBlur: true,
        }}
      />
    </div>
  );
}
