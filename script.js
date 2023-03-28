"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

//////////////////////////////////////////////

/// MODAL WINDOW

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////
////// PAYSTACK API
let paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: "pk_test_4ae65dcf1c45c17dc0cd3e2c38691e97286eb856",
    email: document.getElementById("email_address").value,
    amount: document.getElementById("amt").value * 100,
    currency: "NGN",
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

    callback: function (response) {
      //this happens after the payment is completed successfull
      $.post(
        "verify.php",
        { reference: response.reference },
        function (status) {
          if (status == "sucess")
            //sucessfull transaction
            alert("Transaction was successfull:" + reference);
          //transaction failed
          else alert(response);
        }
      );
    },
    onClose: function () {
      alert("Transaction was not completed, window closed.");
    },
  });
  handler.openIframe();
}
