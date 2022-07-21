<?php
if (!function_exists('svgIcon')) {
    function svgIcon($name, $title = '', $file = 'images/icons.svg') {
        if ($title !== '') {
            $title = '<title>' . $title . '</title>';
        }
        
        echo '<svg class="icon icon--' . $name . '">
            ' . $title . '<use xlink:href="' . $file . '#' . $name . '"></use>
        </svg>';
    }
}