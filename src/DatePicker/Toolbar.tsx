import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useClassNames, useUpdateEffect } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { getRanges } from './utils';
import { InnerRange, RangeType, ToolbarValue } from './types';
import { CalendarLocale } from '../locales';

export type { RangeType } from './types';

export interface ToolbarProps extends WithAsProps {
  hideOkBtn?: boolean;
  locale?: CalendarLocale;
  calendarDate?: ToolbarValue;
  ranges: RangeType[];
  disabledOkBtn?: (value?: ToolbarValue) => boolean;
  disabledShortcut?: (value?: ToolbarValue) => boolean;
  onOk?: (event: React.MouseEvent) => void;
  onClickShortcut?: (value: ToolbarValue, closeOverlay?: boolean, event?: React.MouseEvent) => void;
}

/**
 * Toolbar for DatePicker and DateRangePicker
 */
const Toolbar: RsRefForwardingComponent<'div', ToolbarProps> = React.forwardRef(
  (props: ToolbarProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'picker-toolbar',
      disabledOkBtn,
      hideOkBtn,
      onOk,
      calendarDate,
      ranges: rangesProp,
      ...rest
    } = props;
    const [ranges, setRanges] = useState<InnerRange[]>(getRanges(props));
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

    useUpdateEffect(() => {
      setRanges(getRanges({ ranges: rangesProp, calendarDate }));
    }, [calendarDate, rangesProp]);

    const renderOkButton = useCallback(() => {
      if (hideOkBtn) {
        return null;
      }

      const disabled = disabledOkBtn?.(calendarDate);

      return (
        <div className={prefix('right')}>
          <Button
            appearance="primary"
            size="sm"
            disabled={disabled}
            onClick={disabled ? undefined : onOk}
          >
            Apply
          </Button>
        </div>
      );
    }, [disabledOkBtn, hideOkBtn, onOk, calendarDate, prefix]);

    if (hideOkBtn && ranges.length === 0) {
      return null;
    }

    const classes = merge(className, withClassPrefix());
    return (
      <Component {...rest} ref={ref} className={classes}>
        <div className={prefix('ranges')}>
          <Button
            appearance="default"
            size="sm"
          >
            Cancel
          </Button>
        </div>
        {renderOkButton()}
      </Component>
    );
  }
);

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  calendarDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date))
  ]),
  onClickShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledShortcut: PropTypes.func,
  disabledOkBtn: PropTypes.func,
  hideOkButton: PropTypes.bool
};

export default Toolbar;
