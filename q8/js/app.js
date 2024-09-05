let searchWord = '';
let pageCount = 1;

// 検索ボタンのクリックイベント
$('.search-btn').click(function () {
  const newSearchWord = $('#search-input').val().trim(); // 入力フィールドから値を取得

  // 同じ検索ワードかをチェックし、ページ数を更新
  if (newSearchWord === searchWord) {
    pageCount++;
  } else {
    searchWord = newSearchWord;
    pageCount = 1;
  }

  if (searchWord) {
    fetchData(searchWord, pageCount);
  } else {
    alert('検索ワードを入力してください');
  }
});

// リセットボタンのクリックイベント
$('.reset-btn').click(function () {
  searchWord = '';
  pageCount = 1;
  $('#search-input').val(''); // 入力フィールドをクリア
  clearResults(); // 検索結果のクリア処理
});

// API呼び出し用の関数
function fetchData(searchWord, pageCount) {
  const settings = {
    url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
    method: "GET",
  };

  $.ajax(settings)
    .done(function (response) {
      handleSuccess(response);
    })
    .fail(function (err) {
      handleError(err);
    });
}

// 成功時の処理
function handleSuccess(response) {
  const result = response['@graph'];

  if (result && result.length > 0) {
    displayResult(result);
  } else {
    alert('検索結果が見つかりませんでした。');
  }
}

// エラー時の処理
function handleError(err) {
  if (err.status === 0) {
    alert('ネットワークエラーが発生しました。');
  } else if (err.status >= 400 && err.status < 500) {
    alert('リクエストエラーが発生しました。ステータスコード: ' + err.status);
  } else if (err.status >= 500) {
    alert('サーバーエラーが発生しました。ステータスコード: ' + err.status);
  } else {
    alert('不明なエラーが発生しました。');
  }
}

// 検索結果の表示
function displayResult(result) {
  const $lists = $('.lists');
  $lists.empty(); // 前の検索結果をクリア
  result.forEach(item => {
    const title = item['title'] || 'タイトル不明';
    $lists.append(`<li>${title}</li>`);
  });
}

// 検索結果をクリアする関数
function clearResults() {
  $('.lists').empty(); // 検索結果をクリア
}
