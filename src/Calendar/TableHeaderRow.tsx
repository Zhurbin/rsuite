import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useCalendarContext } from './CalendarContext';

export type TableHeaderRowProps = WithAsProps;

const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const TableHeaderRow: RsRefForwardingComponent<'div', TableHeaderRowProps> = React.forwardRef(
  (props: TableHeaderRowProps, ref) => {
    const { as: Component = 'div', className, classPrefix = 'calendar-table', ...rest } = props;
    const { locale, showWeekNumbers, isoWeek } = useCalendarContext();
    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('row', 'header-row'));
    let items = weekKeys;

    if (isoWeek) {
      items = weekKeys.filter(v => v !== 'sunday');
      items.push('sunday');
    }

    return (
      <div className='rs-calendar-table-header-row-wrapper'>
        <div className='rs-calendar-table-header-row-container'>
          <Component role="row" {...rest} ref={ref} className={classes}>
            {showWeekNumbers && <div className={prefix('cell')} role="columnheader" />}
            {items.map(key => (
              <div key={key} className={prefix('cell')} role="columnheader">
                <span className={prefix('cell-content')}>{locale?.[key]}</span>
              </div>
            ))}
          </Component>
        </div>
      </div>
    );
  }
);

TableHeaderRow.displayName = 'TableHeaderRow';
TableHeaderRow.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default TableHeaderRow;
