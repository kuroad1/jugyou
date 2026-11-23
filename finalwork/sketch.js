let cx;
let cy;
const straight = 84.39 * 5;//直線の長さ
const innerR = 36.5 * 5;//曲走路内側の半径
const laneW = 1.22 * 5;//レーンの幅
const lane = 8;//レーン数
const laneTW = laneW * lane;//8レーンの幅
const outerR = innerR + laneTW;//曲走路外側の半径

function setup() {
  createCanvas(950, 520);
  cx = width / 2;
  cy = height / 2;
}

function draw() {
  background(30, 35, 50);
  noStroke();

  //トラックをえんじ色で
  fill(180, 70, 50);
  rect(cx - straight / 2, cy - outerR, straight, outerR * 2);
  ellipse(cx - straight / 2, cy, outerR * 2);
  ellipse(cx + straight / 2, cy, outerR * 2);


  //真ん中の芝生を
  fill(50, 130, 70);
  rect(cx - straight / 2, cy - innerR, straight, innerR * 2);
  ellipse(cx - straight / 2, cy, innerR * 2);
  ellipse(cx + straight / 2, cy, innerR * 2);

  //曲走路の白線を引く
  noFill();
  stroke(255);
  strokeWeight(1);
  for (let i = 0; i <= lane; i++) {
    ellipse(cx - straight / 2, cy, innerR * 2 + i * laneW * 2);
    ellipse(cx + straight / 2, cy, innerR * 2 + i * laneW * 2);
  }
  //直線部分を塗りつぶして、円を隠す
  noStroke();
  fill(180, 70, 50);
  rect(cx - straight / 2, cy - outerR, straight, outerR * 2);
  fill(50, 130, 70);
  rect(cx - straight / 2, cy - innerR, straight, innerR * 2);

  //上下の白線
  stroke(255);
  for (let i = 0; i <= lane; i++) {
    line(cx - straight / 2, cy - innerR - i * laneW, cx + straight / 2, cy - innerR - i * laneW);
    line(cx - straight / 2, cy + innerR + i * laneW, cx + straight / 2, cy + innerR + i * laneW);
  }
  ｝