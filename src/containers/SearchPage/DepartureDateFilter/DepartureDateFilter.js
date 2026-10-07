import React, { Component } from 'react';

import { injectIntl, intlShape } from '../../../util/reactIntl';
import {
  parseDateFromISO8601,
  stringifyDateToISO8601,
  getStartOf,
  addTime,
} from '../../../util/dates';

import { FieldSingleDatePicker } from '../../../components';

import FilterPlain from '../FilterPlain/FilterPlain';
import FilterPopup from '../FilterPopup/FilterPopup';

import FilterPopupForSidebar from '../BookingDateRangeFilter/FilterPopupForSidebar';
import css from '../BookingDateRangeFilter/BookingDateRangeFilter.module.css';

const getDatesQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames)
    ? queryParamNames[0]
    : typeof queryParamNames === 'string'
    ? queryParamNames
    : 'dates';
};

// Parse query parameter, which should look like "2020-05-28,2020-05-31"
// For departure date filter, we only care about the start date
const parseValue = value => {
  const rawValuesFromParams = value ? value.split(',') : [];
  const startDate = rawValuesFromParams[0]
    ? parseDateFromISO8601(rawValuesFromParams[0])
    : null;
  return startDate ? { date: { date: startDate } } : { date: null };
};

// Format a single departure date as a range query:
// startDate → startDate + 365 days
// This shows all listings available from that date onward
const formatValue = (dateValue, queryParamName) => {
  const hasDate = dateValue && dateValue.date && dateValue.date.date;
  if (!hasDate) {
    return { [queryParamName]: null };
  }
  const startDate = dateValue.date.date;
  const start = stringifyDateToISO8601(startDate);
  const endDate = addTime(startDate, 365, 'days');
  const end = stringifyDateToISO8601(endDate);
  return { [queryParamName]: `${start},${end}` };
};

/**
 * DepartureDateFilter - a single departure date picker for Tours.
 * Selecting a date shows all tours from that date onward.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.rootClassName]
 * @param {string} props.id
 * @param {React.Node} [props.label]
 * @param {boolean} [props.showAsPopup]
 * @param {boolean} [props.liveEdit]
 * @param {Array<string>} [props.queryParamNames]
 * @param {Function} props.onSubmit
 * @param {Object} [props.initialValues]
 * @param {number} [props.contentPlacementOffset]
 * @param {intlShape} props.intl
 * @returns {JSX.Element}
 */
export class DepartureDateFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  toggleIsOpen() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      className,
      rootClassName,
      showAsPopup = true,
      isDesktop = false,
      initialValues,
      id,
      contentPlacementOffset = 0,
      onSubmit,
      queryParamNames,
      label,
      intl,
      getAriaLabel = () => {},
      ...rest
    } = this.props;

    const datesQueryParamName = getDatesQueryParamName(queryParamNames);
    const initialDates =
      initialValues && initialValues[datesQueryParamName]
        ? parseValue(initialValues[datesQueryParamName])
        : { date: null };

    const isSelected = !!initialDates.date;
    const selectedDate = isSelected ? initialDates.date.date : null;

    const format = {
      month: 'short',
      day: 'numeric',
    };

    const formattedDate = isSelected ? intl.formatDate(selectedDate, format) : null;

    const labelForPlain = isSelected
      ? intl.formatMessage(
          { id: 'DepartureDateFilter.labelSelectedPlain' },
          { date: formattedDate }
        )
      : label
      ? label
      : intl.formatMessage({ id: 'DepartureDateFilter.labelPlain' });

    const labelForPopup = isSelected
      ? intl.formatMessage(
          { id: 'DepartureDateFilter.labelSelectedPopup' },
          { date: formattedDate }
        )
      : label
      ? label
      : intl.formatMessage({ id: 'DepartureDateFilter.labelPopup' });

    const labelSelection = isSelected
      ? intl.formatMessage(
          { id: 'DepartureDateFilter.labelSelectedPopup' },
          { date: formattedDate }
        )
      : null;

    const handleSubmit = values => {
      onSubmit(formatValue(values, datesQueryParamName));
    };

    // Only allow selecting today or future dates
    const isOutsideRange = day => {
      const today = getStartOf(new Date(), 'day');
      return day < today;
    };

    const singleDatePicker = (
      <FieldSingleDatePicker
        name="date"
        id={`${id}.date`}
        isOutsideRange={isOutsideRange}
        placeholderText={intl.formatMessage({ id: 'DepartureDateFilter.placeholder' })}
      />
    );

    return showAsPopup ? (
      <FilterPopup
        className={className}
        rootClassName={rootClassName}
        popupClassName={css.popupSize}
        label={labelForPopup}
        isSelected={isSelected}
        id={`${id}.popup`}
        showAsPopup
        contentPlacementOffset={contentPlacementOffset}
        onSubmit={handleSubmit}
        initialValues={initialDates}
        ariaLabel={getAriaLabel(label, labelForPopup)}
        {...rest}
      >
        {singleDatePicker}
      </FilterPopup>
    ) : isDesktop ? (
      <FilterPopupForSidebar
        className={className}
        rootClassName={rootClassName}
        popupClassName={css.popupSize}
        label={label}
        labelSelection={labelSelection}
        isSelected={isSelected}
        id={`${id}.popup`}
        showAsPopup
        contentPlacementOffset={contentPlacementOffset}
        onSubmit={handleSubmit}
        ariaLabel={getAriaLabel(label, labelForPopup)}
        initialValues={initialDates}
        {...rest}
      >
        {singleDatePicker}
      </FilterPopupForSidebar>
    ) : (
      <FilterPlain
        className={className}
        rootClassName={rootClassName}
        label={label}
        labelSelection={labelSelection}
        labelSelectionSeparator=":"
        isSelected={isSelected}
        id={`${id}.plain`}
        liveEdit
        onSubmit={handleSubmit}
        initialValues={initialDates}
        ariaLabel={getAriaLabel(label, labelForPopup)}
        {...rest}
      >
        {singleDatePicker}
      </FilterPlain>
    );
  }
}

const DepartureDateFilter = injectIntl(DepartureDateFilterComponent);

export default DepartureDateFilter;
