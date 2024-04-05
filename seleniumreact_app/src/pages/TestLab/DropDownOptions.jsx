// const userActionsOptions = [
//   "click",
//   "hover",
//   'visit',
//   "type",
//   "press"
//   // "drag and drop",
//   // "SendKeys",
//   // "keyPress",
//   // "Assign",
//   // "Capture Screenshot",
//   // "Execute Javascript",
//   // "Pause (Time in ms)",
//   // "ExitTest",
//   // "Go To URL",
//   // "goBack",
//   // "refresh",
//   // // "openNewTab",
//   // // "closeTab",
//   // "Element is present",
//   // "Element is not Present",
//   // "Element is visible",
//   // "Element is not visible",
//   // "Element text equal",
//   // "Element text does not equal",
//   // "element_text_contains",
//   // "Element text does not contains",
//   // "JavaScript returns true",
//   // "Check accessibility",
//   // "Set variable",
//   // "Extract from element",
//   // "Extract from javaScript",
//   // "Import steps from test",
// ].map((action) => ({ label: action, value: action }));

const surenderList = [
  'visit', 'click', 'type', 'press', 'wait', 'scroll', 'hover', 'select', 'check', 'uncheck', 'dblclick',
  'rightclick', 'clear_text', 'drag_and_drop', 'checkbox', 'uncheck_checkbox', 'submit_form', 'select_option',
  'upload_file', 'scroll_into_view', 'scroll_to_window', 'go_to_url', 'go_back', 'go_forward', 'refresh_page',
  'element_text_contains', 'element_exist', 'element_not_exist', 'element_is_visible', 'element_is_not_visible',
  'element_is_enabled', 'element_is_disabled', 'element_has_value', 'element_has_attribute_with_value',
  'element_has_css_property_with_value', 'invoke_value', 'validate_page_title', 'validate_current_url',
  'number_of_element_found', 'blur_element', 'fixture', 'focus', 'force_click', 'select_first_element',
  'select_last_element', 'location', 'next_element', 'next_all_element', 'not', 'title', 'should_not_equal',
  'should_include', 'should_be_null', 'should_be_empty', 'should_equal', 'should_be_greater_than',
  'should_be_less_than', 'have_attribute', 'have_prop', 'have_css_value', 'contain_text', 'enter',
  'should_be_hidden', 'should_be_selected', 'should_be_checked', 'assert',
  //assertions 
  "exist",
    "equal",
    "contain",
    "have.class",
    "not.exist",
    "have.length"
].map((key) => ({ label: key, value: key }))

const keyList = [
  "Enter",
  "Tab",
  "Spacebar",
  "Backspace",
  "End",
  "Escape",
  "Home",
  "Shift",
  "Ctrl",
  "Alt",
  "Meta",
  "CapsLock",
  "NumLock",
  "ScrollLock",
  "PrintScreen",
  "Pause",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
].map((key) => ({ label: key, value: key }));

const accessibilityList = [
  "Fail if critical issues are found",
  "Fail if serious or critical issues are found",
  "Fail if moderate, serious, or critical issues are found",
  "Fail if any issues are found, including minor issues",
].map((item) => ({ label: item, value: item }));
const selectorTypeList = ["Xpath", "ID", "Class", "Css", "Name"].map(
  (item) => ({ label: item, value: item })
);

const testCases = [
  "Test Case 1",
  "Test Case 2",
  "Test Case 3",
  "Test Case 4",
  "Test Case 5",
].map((item) => ({ label: item, value: item }));

export {
  userActionsOptions,
  keyList,
  accessibilityList,
  testCases,
  selectorTypeList,
};

const cypressActions = [
  "left click",
  "double click",
  "Right click",
  "Mouse over",
  "Clear text",
  "SendKeys",
  "Drag and Drop",
  "Check checkboxes",
  "UnCheck checkboxes",
  "Submit Form",
  "Select Option from dropdown",
  "Upload file",
  "ScrollIntoView",
  "Scroll to window",
  "Go To URL",
  "Go back",
  "Go forward",
  "Refresh Page",
  //assertion
  "Element text contains",
  "Element exist",
  "Element does not exist",
  "Element is visible",
  "Element is not visible",
  "Element is enabled",
  "Element is disabled",
  "Element have value",
  "Element have attibute with value",
  "Element has CSS property with value",
  "Invoke value",
  "Validate Page Title",
  "Validate Current URL",
  "Number of Element found",
  "Blur Element",
  "fixture",
  "focus",
  "force click",
  "Select first element",
  "select last element",
  "location",
  "Next Element",
  "Next All Element",
  "Not",
  "Title",
  "Should not equal",
  "should include",
  "should be null",
  "should be empty",
  "should equal",
  "should be greater than",
  "should less than",
  "have attribute",
  "Have prop",
  "Have css value",
  "contain text",
  "Enter",
  "should be hidden",
  "should be selected",
  "should be checked",
];


const userActionsOptions = [
  // { label: "Visit", value: "visit" },
  { label: "Left click", value: "click" },
  { label: "Double click", value: "dblclick" },
  { label: "Right click", value: "rightclick" },
  { label: "Mouse over", value: "hover" },
  { label: "Clear text", value: "clear_text" },
  { label: "SendKeys", value: "type" },
  { label: "Drag and Drop", value: "drag_and_drop" },
  { label: "Check checkboxes", value: "checkbox" },
  { label: "UnCheck checkboxes", value: "uncheckbox" },
  { label: "Submit Form", value: "submit_form" },
  { label: "Select Option from dropdown", value: "select_option" },
  { label: "Upload file", value: "upload_file" },
  { label: "ScrollIntoView", value: "scroll_into_view" },
  { label: "Scroll to window", value: "scroll_to_window" },
  { label: "Go To URL", value: "go_to_url" },
  { label: "Go back", value: "go_back" },
  { label: "Go forward", value: "go_forward" },
  { label: "Refresh Page", value: "refresh_page" },
  { label: "Element text contains", value: "element_text_contains" },
  { label: "Element exist", value: "element_exist" },
  { label: "Element does not exist", value: "element_not_exist" },
  { label: "Element is visible", value: "element_is_visible" },
  { label: "Element is not visible", value: "element_is_not_visible" },
  { label: "Element is enabled", value: "element_is_enabled" },
  { label: "Element is disabled", value: "element_is_disabled" },
  { label: "Element have value", value: "element_has_value" },
  { label: "Element have attibute with value", value: "element_has_attribute_with_value" },
  { label: "Element has CSS property with value", value: "element_has_css_property_with_value" },
  { label: "Invoke value", value: "invoke_value" },
  { label: "Validate Page Title", value: "validate_page_title" },
  { label: "Validate Current URL", value: "validate_current_url" },
  { label: "Number of Element found", value: "number_of_element_found" },
  { label: "Blur Element", value: "blur_element" },
  { label: "Fixture", value: "fixture" },
  { label: "Focus", value: "focus" },
  { label: "Force click", value: "force_click" },
  { label: "Select first element", value: "select_first_element" },
  { label: "Select last element", value: "select_last_element" },
  { label: "Location", value: "location" },
  { label: "Next Element", value: "next_element" },
  { label: "Next All Element", value: "next_all_element" },
  { label: "Not", value: "not" },
  { label: "Title", value: "title" },
  { label: "Should not equal", value: "should_not_equal" },
  { label: "Should include", value: "should_include" },
  { label: "should be null", value: "should_be_null" },
  { label: "Should be empty", value: "should_be_empty" },
  { label: "Should equal", value: "should_equal" },
  { label: "Should be greater than", value: "should_be_greater_than" },
  { label: "Should less than", value: "should_be_less_than" },
  { label: "Have attribute", value: "have_attribute" },
  { label: "Have prop", value: "have_prop" },
  { label: "Have css value", value: "have_css_value" },
  { label: "contain text", value: "contain_text" },
  { label: "Enter", value: "enter" },
  { label: "Should be hidden", value: "should_be_hidden" },
  { label: "Should be selected", value: "should_be_selected" },
  { label: "Should be checked", value: "should_be_checked" },
  // { label: "Exist", value: "exist" },
  // { label: "Equal", value: "equal" },
  // { label: "Contain", value: "contain" },
  // { label: "Have.class", value: "have.class" },
  // { label: "Not exist", value: "not.exist" },
  // { label: "Have length", value: "have.length" },
  // { label: "Click element using text", value: "click element using text" }
];

export const users = [
  'user-1',
  'user-2',
  'user-3',
  'user-4',
  'user-5',
  'user-6',
].map((item) => ({ label: item, value: item }));