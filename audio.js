const audioMap = {
  1: "./intro.mp3", // 1페이지: 단면
  2: "./page01.mp3", // 2~3역으로 갈 때 재생
  3: "./page01.mp3", // 2~3
  4: "./page02_.mp3", // 4~5 역으로 갈 때 재생
  5: "./page02_.mp3", // 4~5
  6: "./page04.mp3", // 6~7 역으로 갈 때 재생
  7: "./page04.mp3", // 6~7
  8: "./page05_.mp3", // 8~9 역으로 갈 때 재생
  9: "./page05_.mp3", // 8~9
  10: "./page07.mp3", // 10~11 역으로 갈 때 재생
  11: "./page07.mp3", // 10~11
};

const audioPlayer = document.getElementById("page-audio");

// 책 제목 나오는 부분
document.getElementById("start-btn").addEventListener("click", () => {
  audioPlayer.src = "./intro.mp3";
  audioPlayer.muted = false;
  document.getElementById("start-btn").style.display = "none";
  setTimeout(() => {
    $(".flipbook").turn("next");
  }, 2000); // 약간의 딜레이 주면 부드럽게
  audioPlayer.play().catch((err) => {
    console.warn("오디오 재생 실패:", err);
  });
});

function playAudioForPage(page) {
  const audioSrc = audioMap[page];

  // 스타트 버튼 안누르고 이동했을 때, 스타트 버튼 사라지도록
  if (page == 2) {
    document.getElementById("start-btn").style.display = "none";
  }
  // 오디오 중단 및 초기화
  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  if (audioSrc) {
    // 먼저 src 설정
    audioPlayer.src = audioSrc;
    audioPlayer.muted = false;

    // 기존 리스너 제거 (중복 방지)
    audioPlayer.oncanplaythrough = null;

    // 오디오가 준비됐을 때 재생
    audioPlayer.oncanplaythrough = () => {
      audioPlayer.play().catch((err) => {
        console.warn(`오디오 재생 실패 (페이지 ${page}):`, err);
      });
    };
  } else {
    // 오디오 없으면 중단
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
}

window.addEventListener("load", function () {
  const src = audioMap[1];
  audioPlayer.src = src;
  audioPlayer.muted = true;
  audioPlayer
    .play()
    .then(() => {
      setTimeout(() => {
        audioPlayer.muted = false;
      }, 500);
    })
    .catch((e) => {
      console.warn("첫 페이지 오디오 자동 재생 실패:", e);
    });
});

// turn.js 초기화 (옵션은 수정 가능)
$(".flipbook").turn({
  autoCenter: true,
});

// 페이지 넘길 때마다 오디오 재생
$(".flipbook").bind("turned", function (event, page) {
  console.log("현재 페이지:", page);
  playAudioForPage(page);
});
