import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useClassNames, useUpdateEffect } from '../utils';
import { getRanges } from './utils';

/**
 * Toolbar for DatePicker and DateRangePicker
 */
var Toolbar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
      Component = _props$as === void 0 ? 'div' : _props$as,
      className = props.className,
      _props$classPrefix = props.classPrefix,
      classPrefix = _props$classPrefix === void 0 ? 'picker-toolbar' : _props$classPrefix,
      disabledOkBtn = props.disabledOkBtn,
      hideOkBtn = props.hideOkBtn,
      onOk = props.onOk,
      calendarDate = props.calendarDate,
      rangesProp = props.ranges,
      rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "disabledOkBtn", "hideOkBtn", "onOk", "calendarDate", "ranges"]);

  var _useState = useState(getRanges(props)),
      ranges = _useState[0],
      setRanges = _useState[1];

  var _useClassNames = useClassNames(classPrefix),
      merge = _useClassNames.merge,
      prefix = _useClassNames.prefix,
      withClassPrefix = _useClassNames.withClassPrefix;

  useUpdateEffect(function () {
    setRanges(getRanges({
      ranges: rangesProp,
      calendarDate: calendarDate
    }));
  }, [calendarDate, rangesProp]);
  var renderOkButton = useCallback(function () {
    if (hideOkBtn) {
      return null;
    }

    var disabled = disabledOkBtn === null || disabledOkBtn === void 0 ? void 0 : disabledOkBtn(calendarDate);
    return /*#__PURE__*/React.createElement("div", {
      className: prefix('right')
    }, /*#__PURE__*/React.createElement(Button, {
      appearance: "primary",
      size: "sm",
      disabled: disabled,
      onClick: disabled ? undefined : onOk
    }, "Apply"));
  }, [disabledOkBtn, hideOkBtn, onOk, calendarDate, prefix]);

  if (hideOkBtn && ranges.length === 0) {
    return null;
  }

  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('ranges')
  }, /*#__PURE__*/React.createElement(Button, {
    appearance: "default",
    size: "sm"
  }, "Cancel")), renderOkButton());
});
Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  calendarDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.arrayOf(PropTypes.instanceOf(Date))]),
  onClickShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledShortcut: PropTypes.func,
  disabledOkBtn: PropTypes.func,
  hideOkButton: PropTypes.bool
};
export default Toolbar;