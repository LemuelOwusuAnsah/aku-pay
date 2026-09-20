import { useEffect, useRef } from 'react';

export default function Carousel({ slides, height = 420 }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current) return;
    if (typeof window === 'undefined') return;

    const init = async () => {
      const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      new bootstrap.Carousel(carouselRef.current, {
        interval: 4500,
        ride: 'carousel',
        pause: 'hover',
        wrap: true,
      });
    };

    init();
  }, []);

  return (
    <div
      ref={carouselRef}
      className="carousel slide"
      data-bs-ride="carousel"
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        height,
      }}
    >
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-current={i === 0}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--aku-yellow)',
              border: 'none',
              opacity: i === 0 ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      <div className="carousel-inner" style={{ height: '100%' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-item ${i === 0 ? 'active' : ''}`}
            style={{ height: '100%' }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="img-cover"
              loading="lazy"
            />
            <div className="hero-overlay" />
            <div className="carousel-caption-custom">
              <div className="aku-container">
                <span
                  style={{
                    background: 'var(--aku-yellow)',
                    color: '#0B132B',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                  }}
                >
                  {slide.tag || 'Aku Pay'}
                </span>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: 30,
                    marginTop: 12,
                    color: 'white',
                    maxWidth: 620,
                  }}
                >
                  {slide.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 16,
                    marginTop: 8,
                    maxWidth: 560,
                  }}
                >
                  {slide.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
