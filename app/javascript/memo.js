const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  // formっていうid属性をとって、formっていう定数に定義してる
  form.addEventListener("submit", (e) => {
    // 送信ボタンの読み込み
    e.preventDefault();
    // 無駄な処理をなくす、読み込みが多くならないように
    const formData = new FormData(form);
    // 新規のデータを読み込む
    const XHR = new XMLHttpRequest();
    // 新規のHTTPメソッドを読み込む
    XHR.open("POST", "/posts", true);
    // （）内のデータを指定して読み込む
    XHR.responseType = "json";
    // レスポンスをJSONとして送る情報をもつ
    XHR.send(formData);
    // 送信のデータを送る
    XHR.onload = () => {
      // onloadはリクエストの送信が成功した時に動く
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      // 条件分岐、結果が２００なら実施、それ以外なら以下のコードを実施せずに元に戻す
      const list = document.getElementById("list");
      // listのidを取得してlistに定義する
      const formText = document.getElementById("content");
      // contentのidを取得してformtextに定義する
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // listの後にbuildHTMLを行い挿入する
      formText.value = "";
      // valueを空白にする
    };
  });
};

window.addEventListener('turbo:load', post);
