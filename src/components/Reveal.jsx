import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  group = false,
  direction = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = group ? 'aku-reveal-group' : 'aku-reveal';
  const dirClass =
    direction === 'left'
      ? 'aku-reveal-left'
      : direction === 'right'
      ? 'aku-reveal-right'
      : direction === 'scale'
      ? 'aku-reveal-scale'
      : '';

  const classes = [base, dirClass, visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
