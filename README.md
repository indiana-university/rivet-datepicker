# rivet-datepicker
A datepicker widget for Rivet that uses [Pikaday](https://dbushell.com/Pikaday/).

[Download](https://github.com/indiana-university/rivet-datepicker/archive/master.zip) | [View the demo](https://indiana-university.github.io/rivet-datepicker/)

### Configuring a datepicker
The Rivet calendar datepicker is built on top of [Pikaday](https://github.com/Pikaday/Pikaday), a lightweight JavaScript calendar widget, that has [lots of configuration options](https://github.com/Pikaday/Pikaday#configuration). The `RivetDatepicker` constructor acts as a small wrapper around Pikaday that includes the Rivet CSS theme for the calendar widget and a few other default options.

#### Default options
The [Pikaday options](https://github.com/Pikaday/Pikaday#configuration) that the Rivet datepicker sets by default are:

- `theme` - A CSS namespace for the Rivet datepicker theme
- `blurFieldOnSelect` - Set to false so that focus stays on the input field after the user selects a date
- `ariaLabel` - Sets the text for an `aria-label` attribute for each datepicker. This option helps to give screen reader users some additional instructions on using the datepicker.

Although it is technically possible to overwrite these defaults when you create a new datepicker instance, doing so will create UX and accessibility issues. **Please, do not overwrite these default configurations**.

That said, you can pass any of the [available Pikaday options](https://github.com/Pikaday/Pikaday#configuration) to the `RivetDatepicker` instance. Also, any of the Pikaday's methods are available on the `RivetDatepicker.picker` property like so:

```javascript
const startDate = new RivetDatepicker(options);

// Destroys the "startDate" instance and removes all event listeners
startDate.picker.destroy();
```

We have included a Rivet CSS theme that will style the calendar popup to match the rest of Rivet's styles. To use Pikaday do the following:

1. Include `rivet-datepicker.js` in your page via a script tag or via your build process.
2. Include the `rivet-datepicker.css` file in your app.
3. Create a new instance of `RivetDatepicker` for each input that you want to use it on.

For instance if you take the following input:

```html
<input type="text" id="start-date">
```

You would add the following script to your app for the most basic configuration:

```javascript
const startDate = new RivetDatepicker({
  field: document.getElementById('start-date'),
});
```

```html
<div class="rvt-date-picker">
  <label for="start">Start date</label>
  <div class="rvt-date-picker__input">
    <input type="text" id="start-date" aria-describedby="start-format">
    <div class="rvt-date-picker__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M12.29,2H12V1a1,1,0,0,0-2,0V2H6V1A1,1,0,0,0,4,1V2H3.71A2.78,2.78,0,0,0,1,4.83v7.33A2.78,2.78,0,0,0,3.71,15h8.57A2.78,2.78,0,0,0,15,12.17V4.83A2.78,2.78,0,0,0,12.29,2ZM3.71,4H4V5H6V4h4V5h2V4h.29a.78.78,0,0,1,.71.83V7H3V4.83A.78.78,0,0,1,3.71,4Zm8.57,9H3.71A.78.78,0,0,1,3,12.17V9H13v3.17A.78.78,0,0,1,12.29,13Z"/>
      </svg>
    </div>
  </div>
</div>
```