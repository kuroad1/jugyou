let cx;
let cy;
const straight = 84.39 * 5;//直線の長さ
const innerR = 36.5 * 5;//曲走路内側の半径
const laneW = 1.22 * 5;//レーンの幅
const lane = 9;//レーン数
const laneTW = laneW * lane;//9レーンの幅
const outerR = innerR + laneTW;//曲走路外側の半径
const athlete =[
  { lane: 2, name: "RICHARDS",     country: "TTO", r: 206, g: 17,  b: 38,  r2: 0,   g2: 0,   b2: 0,   lap: [10.66, 10.05, 10.96, 12.05], d: 0, time: "43.72" },
  { lane: 3, name: "PATTERSON",    country: "USA", r: 60,  g: 59,  b: 110, r2: 255, g2: 255, b2: 255, lap: [10.64, 9.96,  11.14, 12.96], d: 0, time: "44.70" },
  { lane: 4, name: "EPPIE",        country: "BOT", r: 117, g: 170, b: 219, r2: 0,   g2: 0,   b2: 0,   lap: [10.77, 10.29, 11.08, 12.63], d: 0, time: "44.77" },
  { lane: 5, name: "KEBINATSHIPI", country: "BOT", r: 117, g: 170, b: 219, r2: 0,   g2: 0,   b2: 0,   lap: [10.57, 9.99,  10.77, 12.20], d: 0, time: "43.53" },
  { lane: 6, name: "McDONALD",     country: "JAM", r: 254, g: 209, b: 0,   r2: 0,   g2: 0,   b2: 0,   lap: [10.90, 9.91,  10.84, 12.63], d: 0, time: "44.28" },
  { lane: 7, name: "NENE",         country: "RSA", r: 0,   g: 119, b: 73,  r2: 255, g2: 184, b2: 28,  lap: [10.57, 10.12, 10.90, 12.96], d: 0, time: "44.55" },
  { lane: 8, name: "NDORI",        country: "BOT", r: 117, g: 170, b: 219, r2: 0,   g2: 0,   b2: 0,   lap: [10.84, 10.21, 10.86, 12.29], d: 0, time: "44.20" },
  { lane: 9, name: "NAKAJIMA",     country: "JPN", r: 255, g: 255, b: 255, r2: 188, g2: 0,   b2: 45,  lap: [11.19, 10.49, 10.99, 11.95], d: 0, time: "44.62" }
];//[レーン、名前、国、国旗の色、国旗の色２、100mごとのラップタイム、走った道のり、ゴールタイム];//[レーン、名前、国、国旗の色、国旗の色２、100mごとのラップタイム、走った道のり,タイム

function setup() {
  createCanvas(windowWidth, windowHeight);
  cx = width / 2;
  cy = height / 2;
}

function drawtrack(){
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
}
  // 芝生の上に選手紹介を描く
function drawInfo() {
  noStroke();
  fill(255);

  textSize(22);
  text("東京世界陸上2025", cx - 170, cy - 130);   // タイトル

  textSize(14);
  for (let i = 0; i < athlete.length; i++) {
    const rowY = cy - 65 + i * 26;                  // i人目の行の高さ
    text(athlete[i].lane + "レーン", cx - 170, rowY);   // レーン
    text(athlete[i].name, cx - 90, rowY);              // 名前
    text(athlete[i].time, cx + 100, rowY);             // タイム
  }
}
function draw() {
drawtrack();
  for (let i = 0; i < athlete.length; i++) {
    //進んだ距離から今いる区間を判別して速度を変える
    let k
    if (athlete[i].d < 100) {
      k = 0
    } else if (athlete[i].d < 200) {
      k = 1
    } else if (athlete[i].d < 300) {
      k = 2
    } else if (athlete[i].d <= 400) {
      k = 3
    }
    const speed = 100 / athlete[i].lap[k];
    athlete[i].d += speed / 60;
    if (athlete[i].d > 400) {
      athlete[i].d = 400;    
    }
    const n = athlete[i].lane;//選手のレーン
    const r = innerR + laneW * (n - 0.5);//選手が位置する場所、レーンの真ん中の半径
    const a = straight * 2 + TWO_PI * r - 400 * 5 + athlete[i].d * 5;  //進んだ距離
    const half = TWO_PI * r / 2;       // 半円1つ分の長さ
    const left = cx - straight / 2;    // 左の半円の中心x
    const right = cx + straight / 2;   // 右の半円の中心x
    let x;
    let y;

    if (a < half) {
      const angle = a / r;
      x = right + r * sin(angle);
      y = cy + r * cos(angle);
    } else if (a < half + straight) {
      const s = a - half;
      x = right - s;
      y = cy - r;
    } else if (a < half * 2 + straight) {
      const angle = (a - half - straight) / r;
      x = left - r * sin(angle);
      y = cy - r * cos(angle);
    } else {
      const s = a - half * 2 - straight;//区間に入ってから進んだ距離
      x = left + s;
      y = cy + r;
    }
    //簡易版の国旗を描く
    noStroke();
    fill(athlete[i].r, athlete[i].g, athlete[i].b)
    ellipse(x, y, laneW)
    fill(athlete[i].r2, athlete[i].g2, athlete[i].b2)
    ellipse(x, y, laneW * 0.5)
  }
  drawInfo();
}