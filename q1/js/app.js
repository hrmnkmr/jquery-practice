  // ボタンがクリックされたときの動作
  $(function () {
      $('#q1').css('color', 'yellow'); // 文字色を黄色に変更
  });

  // ボタンがクリックされたときの動作
  $('#q2').on('click', function() {
    $(this).css("background-color", "pink"); // ボタンの色をピンクへ変更
});

 // ボタンがクリックされたときの動作
 $('#q3').on('click', function() {
  $(this).fadeOut(3000); // フェードアウトに3秒（3000ミリ秒）かける
});

// ボタンがクリックされたときの動作
$('#q4').on('click', function() {
  $(this).css({
    width: "200px",  // 新しい幅
    height: "100px"  // 新しい高さ// ボタンを押した時にサイズ変更
});
});

 // ボタンがクリックされたときの動作
 $('#q5').on('click', function() {
  $("#container").append("<p>新しい段落が追加されました。</p>"); // ボタンを押した時にDOMの挿入
});

// ボタンがクリックされたときの動作
$('#q6').on('click', function() {
  $(this).animate({
    marginTop: "100px",  // 上のマージンを100pxに
    marginLeft: "100px"  // 左のマージンを100pxに
}, 2000);  // 2000ミリ秒（2秒）でアニメーション //ボタンを押した時に移動
});

 // ボタンがクリックされたときの動作
 $('#q7').on('click', function() {
  console.log(this.id);  // ボタンを押した時のIDをコンソールに表示
});

 // ボタンがクリックされたときの動作
 $('#q8').on('click', function() {
   // ホバー時にサイズを変更するCSSを追加
   $(this).hover(
    function() {
        // ホバー時の処理
        $(this).css({
            width: "150px",  // ホバー時の幅
            height: "70px"   // ホバー時の高さ
        });
    }, 
    function() {
        // ホバー解除時の処理
        $(this).css({
            width: "",  // 元の幅に戻す
            height: ""  // 元の高さに戻す// ボタンを押した時のホバー時にサイズ変更
        });
    }
);
});

// ボタンがクリックされたときの動作
$('#q9 li').on('click', function() {
  // クリックされたリスト項目のインデックスを取得して表示
  const index = $(this).index();
  alert("" + index);
});


// ボタンがクリックされたときの動作
$('#q10 li').on('click', function() {
  var index = $(this).index(); // クリックされた<li>のインデックスを取得
  $("#q11 li").eq(index).addClass("large-text"); // 対応するQ11の<li>の文字サイズを大きくする
});

