<?php
require_once __DIR__ . '/../bootstrap.php';
$isHTTPS = isset($_POST['isHTTPS']) && $_POST['isHTTPS'] === 'true';
if ($isHTTPS) {
  // Show content for HTTPS
  $_SESSION['http'] = false;
} else {
  // Show content for non-HTTPS
  $_SESSION['http'] = true;
}
?>