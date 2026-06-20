// クイズの正解数（ベストスコア）を localStorage に保存・読み出しする共通処理。
// 全ページ（index / dekiru / hee / maniac）から読み込んで使う。

const SCRATCH_QUIZ_SCORE_KEY = "scratchQuizBestScores";

// 各クイズの id と全問数。新しいクイズを足したらここに追加する。
const QUIZZES = [
  { id: "dekiru", total: 10 },
  { id: "hee", total: 10 },
  { id: "maniac", total: 10 }
];

function loadBestScores() {
  try {
    return JSON.parse(localStorage.getItem(SCRATCH_QUIZ_SCORE_KEY)) || {};
  } catch {
    // localStorage が使えない／壊れている環境では空とみなす
    return {};
  }
}

function getBestScore(quizId) {
  const score = loadBestScores()[quizId];
  return typeof score === "number" ? score : null;
}

function getQuizTotal(quizId) {
  const quiz = QUIZZES.find((entry) => entry.id === quizId);
  return quiz ? quiz.total : null;
}

// 今回の正解数を保存する。これまでのベストを上回ったときだけ更新し、更新したら true を返す。
function saveBestScore(quizId, score) {
  const scores = loadBestScores();
  const previousBest = typeof scores[quizId] === "number" ? scores[quizId] : -1;
  if (score <= previousBest) {
    return false;
  }
  scores[quizId] = score;
  try {
    localStorage.setItem(SCRATCH_QUIZ_SCORE_KEY, JSON.stringify(scores));
  } catch {
    // localStorage に書けない環境では保存をあきらめる（ページの動作は続ける）
  }
  return true;
}
