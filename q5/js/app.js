$(document).ready(function () {
  // マウスがメニュー項目に入ったときにドロップダウンメニューを表示
  $('.dropdwn > li').mouseenter(function () {
    $(this).find('.dropdwn_menu').stop(true, true).slideDown('slow');
  });

  // マウスがメニュー項目から離れたときにドロップダウンメニューを非表示
  $('.dropdwn > li').mouseleave(function () {
    $(this).find('.dropdwn_menu').stop(true, true).slideUp('slow');
  });
});
