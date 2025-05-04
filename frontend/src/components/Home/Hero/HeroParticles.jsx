import React, { useEffect, useRef, useState } from "react";

const HeroParticles = ({ activeSlide }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Configuración personalizada por slide
  const themeBySlide = [
    {
      // Dune - Partículas doradas/arena
      count: 80,
      colors: ["#FFD700", "#FFC107", "#FFB300", "#FFA000"],
      size: { min: 1, max: 3 },
      speed: { min: 0.3, max: 0.8 },
      opacity: { min: 0.1, max: 0.7 },
      wave: true,
    },
    {
      // 3 Body Problem - Partículas azules/tecnológicas
      count: 120,
      colors: ["#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5"],
      size: { min: 1, max: 2 },
      speed: { min: 0.5, max: 1.2 },
      opacity: { min: 0.1, max: 0.9 },
      wave: false,
      connectParticles: true,
    },
    {
      // Oppenheimer - Partículas rojas/naranjas como chispas
      count: 60,
      colors: ["#FF5722", "#F4511E", "#E64A19", "#D84315"],
      size: { min: 1, max: 4 },
      speed: { min: 0.2, max: 0.9 },
      opacity: { min: 0.3, max: 0.8 },
      wave: false,
      pulse: true,
    },
  ];

  // Inicialización de las partículas
  const initParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { width, height } = dimensions;
    const theme = themeBySlide[activeSlide] || themeBySlide[0];

    particlesRef.current = [];

    for (let i = 0; i < theme.count; i++) {
      const size =
        Math.random() * (theme.size.max - theme.size.min) + theme.size.min;
      const color =
        theme.colors[Math.floor(Math.random() * theme.colors.length)];
      const opacity =
        Math.random() * (theme.opacity.max - theme.opacity.min) +
        theme.opacity.min;
      const speed =
        Math.random() * (theme.speed.max - theme.speed.min) + theme.speed.min;

      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        opacity,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        initialSize: size,
        pulse: theme.pulse || false,
        pulseDirection: 1,
        waveOffset: Math.random() * 100,
        connectDistance: width * 0.07,
      });
    }
  };

  // Maneja la animación de las partículas
  const animate = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = dimensions;
    const theme = themeBySlide[activeSlide] || themeBySlide[0];

    ctx.clearRect(0, 0, width, height);

    // Animación de las partículas
    particlesRef.current.forEach((particle, index) => {
      // Actualizar posición
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Rebote en los bordes
      if (particle.x > width || particle.x < 0) {
        particle.speedX = -particle.speedX;
      }

      if (particle.y > height || particle.y < 0) {
        particle.speedY = -particle.speedY;
      }

      // Efecto de ondulación
      if (theme.wave) {
        const now = Date.now() / 1000;
        particle.y += Math.sin(now + particle.waveOffset) * 0.5;
      }

      // Efecto de pulso
      if (particle.pulse) {
        if (particle.size > particle.initialSize * 1.8) {
          particle.pulseDirection = -1;
        } else if (particle.size < particle.initialSize * 0.6) {
          particle.pulseDirection = 1;
        }

        particle.size += particle.pulseDirection * 0.03;
      }

      // Dibujar partículas
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.fill();

      // Conectar partículas cercanas
      if (theme.connectParticles) {
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particle.connectDistance) {
            const opacity = 1 - distance / particle.connectDistance;
            ctx.beginPath();
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 20)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  // Actualiza el tamaño del canvas cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const { offsetWidth, offsetHeight } =
        canvas.parentElement || document.body;

      // Ajustar para dispositivos de alta densidad de píxeles (HiDPI/Retina)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = offsetWidth * dpr;
      canvas.height = offsetHeight * dpr;
      canvas.style.width = `${offsetWidth}px`;
      canvas.style.height = `${offsetHeight}px`;

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    };

    // Llamar al resize inicial
    if (canvasRef.current) {
      setTimeout(handleResize, 100);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inicializa partículas cuando cambian las dimensiones o el slide activo
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Limpiar animación anterior y reinicializar
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    // Inicializar partículas con nuevo tema
    initParticles();

    // Iniciar animación
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions, activeSlide]);

  return <canvas ref={canvasRef} className="hero-particles" />;
};

export default HeroParticles;
