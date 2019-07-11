<?php
	$imgdata = $_POST['data'];
	header('Content-Type: image/jpeg');
	header('Content-Disposition: attachment; filename=pic.jpg');
	echo base64_decode($imgdata);
?>