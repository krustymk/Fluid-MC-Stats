<?php
/**
 * File: index.php
 * User: zacharydubois
 * Date: 2016-03-31
 * Time: 17:33
 * Project: Fluid-MC-Stats
 */

// Enable debug.
define('DEBUG', false);

/////////////////////////////////////////////////////////////////////////
// Do not edit any of the following unless you know what you're doing. //
/////////////////////////////////////////////////////////////////////////

// Set version.
define('VERSION', 'v0.3.0');

// Shortcut directory separators.
define('DS', DIRECTORY_SEPARATOR);

// Define base path.
define('PATH', __DIR__ . DS);

// Define app path.
define('APP', PATH . DS . 'fmcs' . DS);

// Define config.
define('CONFIG', PATH . DS . 'storage' . DS . 'config.json');

// Define temporary directory.
define('TMP', PATH . DS . 'temporary' . DS);


// Load the stuffs!
require APP . 'inc' . DS . 'Run.php';
