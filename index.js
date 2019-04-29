const pageHead = $(".page-header"),
      pageContent = $(".page-content"),
      popup = $(".calculate-price .popup");

pageHead.find(".title").on("click", function () {
    pageContent.slideDown();
});

pageHead.find(".hide-content").on("click", function () {
    pageContent.slideUp();
});

popup.on("click", function (event) {
   event.preventDefault();
   setFormDefaultState();

   $(".modal-window").modal({
       fadeDuration: 300
   });
});

const setFormDefaultState = () => {
    $(".modal-window .specify-info").css("display", "");
    $(".modal-window .check-email").css("display", "");
};



