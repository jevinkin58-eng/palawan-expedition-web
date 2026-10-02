import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Field from '../../Field';

import css from './SectionContainer.module.css';

/**
 * @typedef {Object} FieldComponentConfig
 * @property {ReactNode} component
 * @property {Function} pickValidProps
 */

/**
 * Reveals this section's content with a subtle fade/slide-up animation the
 * first time it scrolls into view, giving the page a more premium, "alive"
 * feel. Content already visible on initial load (e.g. the hero) is never
 * hidden, so there's no flash of invisible content and nothing breaks for
 * users without JavaScript or with reduced-motion preferences.
 */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(true);

  useEffect(() => {
    const node = ref.current;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!node || typeof IntersectionObserver === 'undefined' || prefersReducedMotion) {
      return undefined;
    }

    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      return undefined;
    }

    setIsRevealed(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isRevealed];
};

/**
 * This component can be used to wrap some common styles and features of Section-level components.
 * E.g: const SectionHero = props => (<SectionContainer><H1>Hello World!</H1></SectionContainer>);
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {string?} props.id id of the section
 * @param {string?} props.as tag/element name. Defaults to 'section'.
 * @param {ReactNode} props.children
 * @param {Object} props.appearance
 * @param {Object} props.options extra options for the section component (e.g. custom fieldComponents)
 * @param {Object<string,FieldComponentConfig>?} props.options.fieldComponents custom fields
 * @returns {JSX.Element} containing wrapper that can be used inside Block components.
 */
const SectionContainer = props => {
  const { className, rootClassName, id, as, children, appearance, options, ...otherProps } = props;
  const Tag = as || 'section';
  const classes = classNames(rootClassName || css.root, className);
  const [revealRef, isRevealed] = useScrollReveal();

  return (
    <Tag className={classes} id={id} {...otherProps}>
      {appearance?.fieldType === 'customAppearance' ? (
        <Field
          data={{ alt: `Background image for ${id}`, ...appearance }}
          className={className}
          options={options}
        />
      ) : null}

      <div
        ref={revealRef}
        className={classNames(css.sectionContent, { [css.sectionContentHidden]: !isRevealed })}
      >
        {children}
      </div>
    </Tag>
  );
};

export default SectionContainer;
