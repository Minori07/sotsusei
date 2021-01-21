var count = 0;
var random = false;
var random_count = 2;
var sound = new Audio("./curcuit.mp3");
var call_tm = 0;
var calling = true;

$(function () {
  $("a").click(function () {
    location.href = $(this).attr("href");
    return false;
  });
  setSlide("#icon");
  setSwipe("#call_cont");
  setTouch(".nocall-icon-wrap");
  setTouchOther(".other-icon-wrap");
}); //ホーム追加でsafari起動させない

function call_timer(){
    if(!random){
        randomCount();
    }
    count++;
    if (count > random_count) {
      sound.repeat = true;
      sound.addEventListener("ended", function () {
        if (!!this.repeat) {
          this.play();
        }
      });
      calling = true;
      sound.play();
      $("#call_cont").css({top: "10px"});
      $("#call_cont").css({opacity: 1});
      timeCount();
      return;
    }
    setTimeout("call_timer()", 1000);
}

function timeCount() {
  if (calling) {
    call_tm += 1;
    setTimeout("timeCount()", 10);
  }
}

function randomCount(){
    // random_count = Math.round(Math.random() * 20) + 40; //* 幅 )+ 最小
    random = true;
    console.log(random_count);
}

function stopSound(n) {
  sound.repeat = false;
  sound.pause();
  calling = false;
  if (n == "0") {
    console.log("拒否");
    reset();
  } else if (n == "1") {
    console.log("応答"); 
    $("#call_cont").css({
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        "border-radius": 0
    });
    $("#call_cont").addClass("reply");
    $(".hide-icons").removeClass("none");
  } else {
    console.log("その他"); 
    reset();
  }
}

function reset() {
  count = 0;
  random = false;
  call_tm = 0;
  sound.currentTime = 0;
  $("#call_cont").css({
        top: "-130px",
        left: "2.5vw",
        width: "95vw",
        height: "130px",
        "border-radius": "20px",
        opacity: 0
    });
    $("#call_cont").removeClass("reply");
    $(".hide-icons").addClass("none");
    $("#icon").css({left: "calc(23% + 4px)"});
//   call_timer();
}

//上下
function setSwipe(elem) {
  let t = document.querySelector(elem);
  let startX; // タッチ開始 x座標
  let startY; // タッチ開始 y座標
  let moveX; // スワイプ中の x座標
  let moveY; // スワイプ中の y座標
  let dist = 30; // スワイプを感知する最低距離（ピクセル単位）

  // タッチ開始時： xy座標を取得
  t.addEventListener("touchstart", function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function (e) {
    if (startY > moveY && startY > moveY + dist) {
      // 下から上にスワイプ
      document.getElementById("call_cont").style.top = "-100px";
      document.getElementById("call_cont").style.opacity = 0;
      stopSound(2);
    } else if (startY < moveY && startY + dist < moveY) {
      // 上から下にスワイプ
      document.getElementById("call_cont").style.height = "190px";
      $(".hide-icons").removeClass("none");
      $(".hide-icons").css({opacity:1});
    }
  });
}

//左右
function setSlide(elem) {
  let t = document.querySelector(elem);
  let startX; // タッチ開始 x座標
  let startY; // タッチ開始 y座標
  let moveX; // スワイプ中の x座標
  let moveY; // スワイプ中の y座標
  let dist = 50; // スワイプを感知する最低距離（ピクセル単位）

  // タッチ開始時： xy座標を取得
  t.addEventListener("touchstart", function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
    // console.log(moveX);
    if (moveX < 281 && moveX > 130) {
      document.getElementById("icon").style.left = moveX - 35 + "px";
    }
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function (e) {
    if (startX < moveX && startX + 70 < moveX) {
      // 左から右にスワイプ
      stopSound(1);
    }else{
      document.getElementById("icon").style.left = window.innerWidth * 0.23  + "px";  
    }
  });
}

function setTouch(elem){
  let t = document.querySelector(elem);
  t.addEventListener("touchstart", function (e) {
  });
  t.addEventListener("touchmove", function (e) {
  });
  t.addEventListener("touchend", function (e) {
      stopSound(0);
  });
}

function setTouchOther(elem){
  let t = document.querySelector(elem);
  t.addEventListener("touchstart", function (e) {
  });
  t.addEventListener("touchmove", function (e) {
  });
  t.addEventListener("touchend", function (e) {
    stopSound(2);
  });
}

function soundCheck(){
    sound.repeat = true;
    sound.addEventListener("ended", function () {
        if (!!this.repeat) {
          this.play();
        }
    });
    sound.play();
}