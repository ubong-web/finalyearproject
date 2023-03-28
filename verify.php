<?php

$paystack_secret_key = "pk_test_4ae65dcf1c45c17dc0cd3e2c38691e97286eb856"; // Replace with your Paystack secret key
$payment_reference = $_POST['reference'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.paystack.co/transaction/verify/" . $payment_reference);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Bearer " . $paystack_secret_key));

$response = curl_exec($ch);
curl_close($ch);

if ($response) {
  $json = json_decode($response);

  if ($json->status == "success") {
    // Payment was successful
    // Update your database or perform other actions here
    echo "success";
  } else {
    // Payment failed or was not successful
    // Handle the error here
    echo "failure";
  }
} else {
  // Error occurred while attempting to verify payment
  // Handle the error here
  echo "error";
}

?>
