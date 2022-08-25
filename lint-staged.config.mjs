export default {
  '*.{js,ts,tsx}': ['eslint --fix','prettier --write'],
  '*.(scss|css)': ['stylelint --fix','prettier --write'],
};
