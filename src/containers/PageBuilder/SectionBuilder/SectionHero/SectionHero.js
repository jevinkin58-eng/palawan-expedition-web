import React from 'react';
import classNames from 'classnames';

import { pickFieldOptions } from '../../PageBuilder.helpers';

import Field, { hasDataInFields } from '../../Field';

import SectionContainer from '../SectionContainer';
import css from './SectionHero.module.css';

/**
 * @typedef {Object} FieldComponentConfig
 * @property {ReactNode} component
 * @property {Function} pickValidProps
 */

/**
 * A small decorative airplane that drifts across the hero banner. Purely
 * visual (aria-hidden), so it never affects screen readers or keyboard
 * navigation, and it's pure CSS animation - no window/document access -
 * so it's safe during server-side rendering.
 */
const FlyingPlane = () => (
  <svg
    className={css.planeIcon}
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M58.8 29.6 38.4 24l-9-15.6c-.6-1-1.9-1.4-2.9-.8-.8.5-1.2 1.4-1 2.3l3.6 15.3-13.4 3.6-5-4.2c-.6-.5-1.5-.6-2.2-.2-.9.5-1.2 1.6-.7 2.5l4.3 7.5-4.3 7.5c-.5.9-.2 2 .7 2.5.7.4 1.6.3 2.2-.2l5-4.2 13.4 3.6-3.6 15.3c-.2.9.2 1.8 1 2.3 1 .6 2.3.2 2.9-.8l9-15.6 20.4-5.6c1.1-.3 1.8-1.3 1.8-2.4s-.7-2.1-1.8-2.4Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * A gently drifting boat silhouette near the waterline of the hero image.
 * Also purely decorative and SSR-safe.
 */
const DriftingBoat = () => (
  <svg
    className={css.boatIcon}
    viewBox="0 0 80 40"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 28h64l-7 8a6 6 0 0 1-4.6 2.1H19.6A6 6 0 0 1 15 36l-7-8Z"
      fill="currentColor"
    />
    <rect x="37" y="6" width="2.4" height="20" fill="currentColor" />
    <path d="M39.4 8 54 22H39.4V8Z" fill="currentColor" opacity="0.85" />
    <path d="M37 10 26 22h11V10Z" fill="currentColor" opacity="0.6" />
  </svg>
);

/**
 * Section component for a website's hero section
 * The Section Hero doesn't have any Blocks by default, all the configurations are made in the Section Hero settings
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {Object} props.defaultClasses
 * @param {string} props.defaultClasses.sectionDetails
 * @param {string} props.defaultClasses.title
 * @param {string} props.defaultClasses.description
 * @param {string} props.defaultClasses.ctaButton
 * @param {string} props.sectionId id of the section
 * @param {'hero'} props.sectionType
 * @param {Object?} props.title
 * @param {Object?} props.description
 * @param {Object?} props.appearance
 * @param {Object?} props.callToAction
 * @param {Object} props.options extra options for the section component (e.g. custom fieldComponents)
 * @param {Object<string,FieldComponentConfig>?} props.options.fieldComponents custom fields
 * @returns {JSX.Element} Section for article content
 */
const SectionHero = props => {
  const {
    sectionId,
    className,
    rootClassName,
    defaultClasses,
    title,
    description,
    appearance,
    callToAction,
    options,
  } = props;

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldOptions = pickFieldOptions(options);

  const hasHeaderFields = hasDataInFields([title, description, callToAction], fieldOptions);

  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={classNames(rootClassName || css.root)}
      appearance={appearance}
      options={fieldOptions}
    >
      {/* Decorative motion layer: a plane drifting across the sky and a boat
          drifting near the waterline. Purely visual, aria-hidden, and built
          with CSS keyframes only - nothing here depends on JS running, so
          it degrades gracefully and respects prefers-reduced-motion. */}
      <div className={css.motionLayer} aria-hidden="true">
        <FlyingPlane />
        <DriftingBoat />
      </div>

      {hasHeaderFields ? (
        <header className={classNames(defaultClasses.sectionDetails, css.heroDetails)}>
          <Field
            data={title}
            className={classNames(defaultClasses.title, css.heroTitle)}
            options={fieldOptions}
          />
          <Field
            data={description}
            className={classNames(defaultClasses.description, css.heroDescription)}
            options={fieldOptions}
          />
          <Field
            data={callToAction}
            className={classNames(defaultClasses.ctaButton, css.heroCta)}
            options={fieldOptions}
          />
        </header>
      ) : null}
    </SectionContainer>
  );
};

export default SectionHero;
