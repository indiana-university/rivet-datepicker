## Rivet Datepicker
A datepicker component for Rivet powered by [Pikaday](https://github.com/Pikaday/Pikaday).

[View the demo](https://indiana-university.github.io/rivet-datepicker/)

## Getting started
Before you can start using the Rivet datepicker, you'll need to include the datepicker CSS and JavaScript in your project.

### Using downloaded CSS and JavaScript
You can [download the Rivet datepicker CSS and JavaScript](https://github.com/indiana-university/rivet-datepicker/archive/master.zip) and include it in your project the same way you'd include any other CSS and JavaScript files:

```html
<link rel="stylesheet" href="dist/css/rivet-datepicker.min.css">
<script src="dist/js/rivet-datepicker.min.js"></script>
```

Make sure you include the Rivet datepicker CSS and JavaScript *after* the Rivet core CSS and JavaScript.

### Using NPM and Sass
If you are using NPM and [Rivet's Sass](https://rivet.iu.edu/getting-started/sass/), you can use the datepicker styles by importing them from your `node_modules` folder:

```css
@import "/node_modules/rivet-shell/sass/rivet-datepicker.scss";
```

## Basic date input
Using three inputs is the quickest and most reliable way for users to enter dates into forms.

If you are only asking a user to enter one or two dates, especially memorable ones like birthdays, use this pattern.

The basic date input uses the HTML5 `<input type="number">` element along with the `min` and `max` attributes to constrain the numbers a user is able to enter.

```html
<fieldset aria-describedby="grad-date-hint">
  <legend class="rvt-ts-18 rvt-text-bold">When will you graduate?</legend>
  <span class="rvt-ts-14" id="grad-date-hint">For example: 05 21 2019</span>
  <div class="rvt-date-input rvt-m-top-md">
    <div class="rvt-date-input__item">
      <label for="month">Month</label>
      <input type="number" min="1" max="12" id="month">
    </div>
    <div class="rvt-date-input__item">
      <label for="day">Day</label>
      <input type="number" min="1" max="31" id="day">
    </div>
    <div class="rvt-date-input__item rvt-date-input__item--year">
      <label for="year">Year</label>
      <input type="number" min="2019" id="year">
    </div>
  </div>
</fieldset>
```

[Basic date input demo](https://indiana-university.github.io/rivet-datepicker/#basic-date-input)

## Calendar datepicker
In applications where users are required to frequently enter multiple dates or dates that are in the near future or past, use a datepicker calendar.

The Rivet datepicker uses the `aria-describedby` attribute to associate date formatting instructions with datepicker fields.

> Make sure you provide instructions letting users know the format in which they should type the date manually if they're unable to use the calendar datepicker.

```html
<div class="rvt-datepicker rvt-width-sm rvt-m-bottom-sm">
  <label for="hs-date">Graduation date</label>
  <span class="rvt-ts-14" id="grad-date-hint">Type date in the format: mm-dd-yyyy</span>
  <div class="rvt-datepicker__input" aria-hidden="true">
    <input autocomplete="off" type="text" id="grad-date" aria-describedby="grad-date-hint">
    <div class="rvt-datepicker__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M12.29,2H12V1a1,1,0,0,0-2,0V2H6V1A1,1,0,0,0,4,1V2H3.71A2.78,2.78,0,0,0,1,4.83v7.33A2.78,2.78,0,0,0,3.71,15h8.57A2.78,2.78,0,0,0,15,12.17V4.83A2.78,2.78,0,0,0,12.29,2ZM3.71,4H4V5H6V4h4V5h2V4h.29a.78.78,0,0,1,.71.83V7H3V4.83A.78.78,0,0,1,3.71,4Zm8.57,9H3.71A.78.78,0,0,1,3,12.17V9H13v3.17A.78.78,0,0,1,12.29,13Z"/>
      </svg>
    </div>
  </div>
</div>
```

[Calendar datepicker demo](https://indiana-university.github.io/rivet-datepicker/#calendar-datepicker)

### Initializing a calendar datepicker
You'll need to create a new instance of `RivetDatepicker` for each calendar datepicker input field that appears on your page.

For example, if your page contains the following input:

```html
<div class="rvt-datepicker">
  <label for="start">Start date</label>
  <div class="rvt-datepicker__input">
    <input type="text" id="start-date" aria-describedby="start-format">
    <div class="rvt-datepicker__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M12.29,2H12V1a1,1,0,0,0-2,0V2H6V1A1,1,0,0,0,4,1V2H3.71A2.78,2.78,0,0,0,1,4.83v7.33A2.78,2.78,0,0,0,3.71,15h8.57A2.78,2.78,0,0,0,15,12.17V4.83A2.78,2.78,0,0,0,12.29,2ZM3.71,4H4V5H6V4h4V5h2V4h.29a.78.78,0,0,1,.71.83V7H3V4.83A.78.78,0,0,1,3.71,4Zm8.57,9H3.71A.78.78,0,0,1,3,12.17V9H13v3.17A.78.78,0,0,1,12.29,13Z"/>
      </svg>
    </div>
  </div>
</div>
```

You would initialize the calendar datepicker by passing the `id` of the text input to the `RivetDatepicker` constructor as an option called `field`:

```js
const startDate = new RivetDatepicker({
  field: document.getElementById('start-date'),
});
```

### Default calendar datepicker options
The Rivet calendar datepicker is built on top of [Pikaday](https://github.com/Pikaday/Pikaday), a lightweight JavaScript calendar widget with [several configuration options](https://github.com/Pikaday/Pikaday#configuration).

The `RivetDatepicker` constructor acts as a wrapper around Pikaday that includes the Rivet CSS theme for the calendar widget and a few other default options.

The [Pikaday options](https://github.com/Pikaday/Pikaday#configuration) that the Rivet datepicker sets by default are:

* `theme` - A CSS namespace for the Rivet datepicker theme
* `blurFieldOnSelect` - Set to `false` so that focus stays on the input field after the user selects a date
* `ariaLabel` - Sets the text for an `aria-label` attribute for each datepicker. This option helps to give screen reader users some additional instructions on how to use the datepicker.

> While it's possible to override these defaults when you create a new datepicker instance, doing so will cause UX and accessibility issues. **Please do not override these default configuration options.**

## Advanced options
You can pass any of the other [available Pikaday options](https://github.com/Pikaday/Pikaday#configuration) to the `RivetDatepicker` constructor.

```js
const startDate = new RivetDatepicker({
  field: document.getElementById('start-date'),
  disableWeekends: true
});
```

In addition, all [Pikaday methods](https://github.com/Pikaday/Pikaday#methods) are available on the `RivetDatepicker.picker` property:

```js
const startDate = new RivetDatepicker(options);

// Destroys the "startDate" instance and removes all event listeners
startDate.picker.destroy();
```

## Date formatting options
Pikaday has a number of options you can use to format dates. The Pikaday `toString` option can be passed a function that accepts a `Date` object and returns a string in the format you'd like.

```js
function formatRivetDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return month + '-' + day + '-' + year;
}

const startDate = new RivetDatepicker({
  field: document.getElementById('start-date'),
  toString: function(date) {
    return formatRivetDate(date);
  }
});
```

### Using Moment.js
The Rivet datepicker supports the [Moment.js](http://momentjs.com/) date formatting library. You can learn more about [using Moment to format dates](https://github.com/Pikaday/Pikaday#formatting) in the [Pikaday documentation](https://github.com/Pikaday/Pikaday#formatting).

> While Moment.js is a powerful library, it can add significant overhead to your application. If you are only using Moment.js to format dates with the Rivet datepicker, consider writing your own formatting function (like `formatRivetDate` above) instead of importing Moment.js.

## Time input
The Rivet calendar datepicker does not currently support a time picker option.

If you are asking users to input date and time, we recommend using separate inputs to capture the time value and concatenating the date and time on the client or server.

[View the date and time input demo](https://indiana-university.github.io/rivet-datepicker/#date-time-input)