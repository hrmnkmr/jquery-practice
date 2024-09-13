$(document).ready(function () {
  let searchWord = '';
  let pageCount = 1;

  // 検索ボタンのクリックイベント
  $('.search-btn').click(function () {
    const newSearchWord = $('#search-input').val().trim();

    // ページ数の管理
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
    $('#search-input').val('');
    clearResults();
  });

  // API呼び出し用の関数
  function fetchData(searchWord, pageCount) {
    const settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    };

    $.ajax(settings).done(function (response) {
      // レスポンスの内容を確認
      console.log('APIレスポンス:', response);

      if (response && response['@graph']) {
        const result = response['@graph'];
        console.log('取得した@graph:', result);

        // @graphの内容に応じてアクセス方法を修正する
        if (result.length > 0 && result[0].items) {
          // itemsが存在する場合はこの構造で処理
          displayResult(result[0].items);
        } else {
          // 直接@graphを利用する場合
          displayResult(result);
        }
      } else {
        console.error('レスポンスに@graphが見つかりません');
        displayError({ message: '無効なAPIレスポンス' });
      }
    }).fail(function (err) {
      displayError(err);
    });
  }

  // 検索結果の表示
function displayResult(results) {
  const $lists = $('.lists');
  $lists.empty(); // 前の検索結果をクリア

  // デバッグ出力で結果の内容を確認
  console.log('検索結果:', results);

  if (results && results.length > 0) {
    results.forEach(item => {
      const title = item.title || 'タイトル不明';
      const author = item['dc:creator'] ? (Array.isArray(item['dc:creator']) ? item['dc:creator'].join(', ') : item['dc:creator']) : '著者不明';
      const publisher = item['dc:publisher'] ? (Array.isArray(item['dc:publisher']) ? item['dc:publisher'][0] : item['dc:publisher']) : '出版社不明';
      const pubDate = item['dc:date'] || '出版年不明';

      // ボックス形式で書籍情報を追加
      $lists.append(`
        <li class="lists-item">
          <strong>タイトル:</strong> ${title}<br>
          <strong>著者:</strong> ${author}<br>
          <strong>出版社:</strong> ${publisher}<br>
          <strong>出版年:</strong> ${pubDate}
        </li>
      `);
    });
  } else {
    $lists.append('<li class="lists-item">検索結果が見つかりませんでした。</li>');
  }
}


  // エラーメッセージの表示
  function displayError(err) {
    console.error('APIエラー: ', err);
    alert('データの取得中にエラーが発生しました。');
  }

  // 検索結果をクリアする関数
  function clearResults() {
    $('.lists').empty();
  }
});
