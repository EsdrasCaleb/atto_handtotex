<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto editor plugin - HandToTex
 *
 * @package   atto_handtotex
 * @copyright 2025 Caleb
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Include the necessary functions for the atto plugin.
 */

/**
 * Initialize the HandToTex button in the Atto editor.
 *
 * @param string $elementid
 */
function atto_handtotex_params_for_js($elementid, $options, $fpoptions) {
    global $PAGE;
    $PAGE->requires->js_call_amd('atto_handtotex/editor', 'init', array($elementid));
}

/**
 * Return the list of strings used in the plugin.
 */
function atto_handtotex_strings_for_js() {
    return ['draw_equation', 'convert_to_tex'];
}

/**
 * Define the button in the Atto editor.
 */
function atto_handtotex_before_editor($params) {
    global $PAGE;
    $PAGE->requires->js_call_amd('atto_handtotex/editor', 'init', array($params['elementid']));
}
