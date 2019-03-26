/*!
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Pikaday from 'pikaday';

export default function RivetDatepicker(options) {
  // Default options
  const defaults = {
    theme: 'rivet-theme',
    blurFieldOnSelect: false,
    ariaLabel: 'Use the arrow keys to select a day or press the escape key to close the datepicker'
  };
  
  // Merge defaults with user options if they exist
  const settings = Object.assign({}, defaults, options);

  // Create a new Pikaday instance
  this.picker = new Pikaday(settings);
}