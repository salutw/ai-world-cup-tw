const teams = {
  ARG: {
    name: "阿根廷",
    en: "Argentina",
    color: "linear-gradient(135deg, #75bde7 0 32%, #ffffff 32% 66%, #75bde7 66%)",
    rank: 1,
    elo: 2142,
    confed: "CONMEBOL",
    best: "冠軍 1978、1986、2022",
    form: ["W", "W", "D", "W", "L"],
    summary: "控球節奏穩，前場個人能力仍是打開僵局的主要來源。"
  },
  CRO: {
    name: "克羅埃西亞",
    en: "Croatia",
    color: "linear-gradient(135deg, #d9272e 0 50%, #ffffff 50%)",
    rank: 10,
    elo: 1958,
    confed: "UEFA",
    best: "亞軍 2018，季軍 1998、2022",
    form: ["D", "W", "W", "L", "D"],
    summary: "中場控節奏能力強，淘汰賽經驗與抗壓性是招牌。"
  },
  FRA: {
    name: "法國",
    en: "France",
    color: "linear-gradient(135deg, #1d3f8d 0 33%, #ffffff 33% 66%, #d63838 66%)",
    rank: 2,
    elo: 2115,
    confed: "UEFA",
    best: "冠軍 1998、2018",
    form: ["W", "D", "W", "W", "W"],
    summary: "邊路爆發力與前場速度出色，領先後的轉換威脅很高。"
  },
  JPN: {
    name: "日本",
    en: "Japan",
    color: "radial-gradient(circle, #c9333a 0 34%, #ffffff 35%)",
    rank: 18,
    elo: 1888,
    confed: "AFC",
    best: "十六強 2002、2010、2018、2022",
    form: ["W", "W", "L", "W", "D"],
    summary: "攻守轉換速度快，面對高壓逼搶時的出球品質是關鍵。"
  },
  BRA: {
    name: "巴西",
    en: "Brazil",
    color: "linear-gradient(135deg, #169b62 0 52%, #f7d13b 52%)",
    rank: 5,
    elo: 2074,
    confed: "CONMEBOL",
    best: "五屆冠軍",
    form: ["W", "L", "W", "D", "W"],
    summary: "單點突破與禁區前創造力強，但防線穩定性會影響上限。"
  },
  GER: {
    name: "德國",
    en: "Germany",
    color: "linear-gradient(135deg, #111111 0 33%, #d3343a 33% 66%, #f3c438 66%)",
    rank: 12,
    elo: 1969,
    confed: "UEFA",
    best: "四屆冠軍",
    form: ["D", "W", "L", "W", "W"],
    summary: "前場壓迫與陣地推進成熟，防守轉身速度仍需留意。"
  },
  ESP: {
    name: "西班牙",
    en: "Spain",
    color: "linear-gradient(135deg, #c92d2d 0 42%, #f2bf31 42% 64%, #c92d2d 64%)",
    rank: 4,
    elo: 2048,
    confed: "UEFA",
    best: "冠軍 2010",
    form: ["W", "W", "W", "D", "W"],
    summary: "控球壓制力強，能否把控球轉成高品質射門是勝負分水嶺。"
  },
  MEX: {
    name: "墨西哥",
    en: "Mexico",
    color: "linear-gradient(135deg, #0b7f53 0 33%, #ffffff 33% 66%, #c83b35 66%)",
    rank: 15,
    elo: 1854,
    confed: "CONCACAF",
    best: "八強 1970、1986",
    form: ["L", "D", "W", "W", "D"],
    summary: "主場區域氣勢與節奏感不差，臨門一腳效率會決定能走多遠。"
  }
};

const matches = [
  {
    id: "arg-cro",
    group: "C 組",
    round: "小組賽第 2 輪",
    kickoff: "06/24 22:00",
    venue: "Estadio Norte",
    home: "ARG",
    away: "CRO",
    score: "2-1",
    confidence: "中等",
    tags: ["高關注", "小組關鍵"],
    filter: ["high", "group"],
    odds: { home: 1.86, draw: 3.25, away: 4.20, updated: "2026/06/23 18:40" },
    probs: { home: 48, draw: 27, away: 25, over: 44, btts: 51 },
    scorelines: [
      ["1-1", 12.8],
      ["2-1", 11.5],
      ["1-0", 10.9],
      ["2-0", 8.7],
      ["0-0", 7.9]
    ],
    summary: "阿根廷整體進攻效率略高，但克羅埃西亞中場抗壓能力很強，這場不太像一面倒。",
    analysis: [
      "模型略看好阿根廷，主因是前場創造機會的穩定度較高，且禁區前的最後一傳更有威脅。",
      "克羅埃西亞的強項是把比賽節奏拖進自己舒服的區間。若上半場沒有太早失球，和局機率會明顯拉高。",
      "盤口目前給阿根廷優勢，但沒有到壓倒性。對球迷來說，這場更像是看誰先把節奏搶下來。"
    ],
    factors: ["阿根廷壓迫後的二次進攻品質", "克羅埃西亞中場持球抗壓", "若早段進球，比分會更容易打開"],
    history: "兩隊在世界盃舞台曾有多次高張力對決，克羅埃西亞近年淘汰賽韌性突出，阿根廷則在大賽決勝經驗上更完整。",
    qualification: {
      win: "阿根廷贏球可大幅提高提前晉級機率。",
      draw: "雙方平手會讓最後一輪仍保有變數。",
      loss: "克羅埃西亞贏球後，小組第一競爭會重新打開。"
    }
  },
  {
    id: "fra-jpn",
    group: "D 組",
    round: "小組賽第 2 輪",
    kickoff: "06/25 01:00",
    venue: "Pacific Stadium",
    home: "FRA",
    away: "JPN",
    score: "1-0",
    confidence: "中高",
    tags: ["高關注", "亞洲焦點"],
    filter: ["high"],
    odds: { home: 1.58, draw: 3.70, away: 5.60, updated: "2026/06/23 18:35" },
    probs: { home: 57, draw: 25, away: 18, over: 39, btts: 43 },
    scorelines: [
      ["1-0", 13.6],
      ["2-0", 11.1],
      ["1-1", 9.8],
      ["2-1", 9.3],
      ["0-0", 8.6]
    ],
    summary: "法國紙面戰力較完整，日本要靠轉換速度與中場出球品質製造麻煩。",
    analysis: [
      "模型看好法國，主要來自邊路速度與反擊效率。日本若壓上太深，容易被法國打到身後。",
      "日本不是沒有機會，關鍵在於能不能把法國的第一波壓迫拆掉，並在轉換時迅速找到弱側空間。",
      "這場模型不傾向大比分，因為日本防守組織通常不會太鬆散，法國也可能在領先後降低風險。"
    ],
    factors: ["法國邊路一對一", "日本後場出球穩定度", "上半場前 25 分鐘的抗壓"],
    history: "法國在世界盃淘汰賽經驗充足，日本近幾屆面對歐洲強隊的競爭力明顯提升。",
    qualification: {
      win: "法國贏球幾乎可取得晉級主導權。",
      draw: "平手對日本是可接受結果，但法國會錯過拉開差距的機會。",
      loss: "日本若爆冷勝出，小組排名會出現很大變化。"
    }
  },
  {
    id: "bra-ger",
    group: "E 組",
    round: "小組賽第 2 輪",
    kickoff: "06/25 04:00",
    venue: "Lakeside Arena",
    home: "BRA",
    away: "GER",
    score: "2-2",
    confidence: "中等",
    tags: ["高關注", "進球期待"],
    filter: ["high"],
    odds: { home: 2.12, draw: 3.35, away: 3.05, updated: "2026/06/23 18:20" },
    probs: { home: 39, draw: 29, away: 32, over: 57, btts: 62 },
    scorelines: [
      ["1-1", 11.7],
      ["2-1", 9.8],
      ["1-2", 9.2],
      ["2-2", 8.9],
      ["2-0", 7.5]
    ],
    summary: "巴西創造力更鮮明，德國整體推進更有結構，模型認為雙方都有進球機會。",
    analysis: [
      "這場是典型強強對話，模型差距拉不開。巴西的個人突破能製造高價值機會，德國則靠前場壓迫逼出失誤。",
      "雙方都有進球機率偏高，因為兩隊都不是只想保守拿一分的類型。",
      "如果德國能把巴西邊鋒逼到低效率區域，比賽會更接近；反過來，巴西若早早打穿肋部，德國防線會很吃力。"
    ],
    factors: ["巴西邊路突破", "德國反搶後第一腳傳球", "定位球防守"],
    history: "兩隊世界盃歷史感很重，過去交手常牽動球迷情緒，但本場模型更看當前攻防效率。",
    qualification: {
      win: "巴西贏球可在小組取得明顯優勢。",
      draw: "平手對兩隊都不差，但第三輪壓力仍在。",
      loss: "德國贏球後，小組第一會變成德國主導。"
    }
  },
  {
    id: "esp-mex",
    group: "F 組",
    round: "小組賽第 2 輪",
    kickoff: "06/25 07:00",
    venue: "Capital Field",
    home: "ESP",
    away: "MEX",
    score: "2-0",
    confidence: "中等",
    tags: ["小組關鍵", "地主區域"],
    filter: ["group"],
    odds: { home: 1.72, draw: 3.45, away: 4.85, updated: "2026/06/23 18:10" },
    probs: { home: 52, draw: 26, away: 22, over: 46, btts: 45 },
    scorelines: [
      ["1-0", 12.6],
      ["2-0", 10.8],
      ["1-1", 10.1],
      ["2-1", 9.9],
      ["0-0", 7.2]
    ],
    summary: "西班牙控球優勢明顯，墨西哥需要提高反擊第一腳品質，否則會被長時間壓在半場。",
    analysis: [
      "模型看好西班牙，因為控球壓制與中路滲透能力更穩定。墨西哥若只靠低位防守，體能壓力會很大。",
      "墨西哥的機會在於搶下球權後第一時間打到西班牙防線背後，尤其要避開無效長傳。",
      "若西班牙上半場取得領先，這場可能往 2-0 或 2-1 方向走。"
    ],
    factors: ["西班牙控球轉射門效率", "墨西哥反擊第一腳", "下半場體能與換人節奏"],
    history: "西班牙世界盃控球風格鮮明，墨西哥則長期以小組賽韌性聞名。",
    qualification: {
      win: "西班牙贏球可接近鎖定晉級。",
      draw: "平手會讓墨西哥保有競爭力。",
      loss: "墨西哥若贏球，小組排名會非常緊。"
    }
  }
];

const groups = [
  {
    name: "C 組",
    note: "阿根廷與克羅埃西亞的直接對話會決定小組第一主導權。",
    rows: [
      ["ARG", 1, 1, 0, 0, 2, 0, 3, 74],
      ["CRO", 1, 0, 1, 0, 1, 1, 1, 58],
      ["MEX", 1, 0, 1, 0, 1, 1, 1, 39],
      ["JPN", 1, 0, 0, 1, 0, 2, 0, 24]
    ]
  },
  {
    name: "D 組",
    note: "法國若贏球可拉開差距，日本拿分就能把競爭拖到最後一輪。",
    rows: [
      ["FRA", 1, 1, 0, 0, 3, 1, 3, 81],
      ["JPN", 1, 1, 0, 0, 2, 1, 3, 63],
      ["GER", 1, 0, 0, 1, 1, 2, 0, 35],
      ["BRA", 1, 0, 0, 1, 1, 3, 0, 31]
    ]
  },
  {
    name: "E 組",
    note: "巴西與德國同場高波動，第三名比較可能受淨勝球影響。",
    rows: [
      ["BRA", 1, 1, 0, 0, 2, 1, 3, 67],
      ["GER", 1, 1, 0, 0, 1, 0, 3, 64],
      ["ESP", 1, 0, 0, 1, 0, 1, 0, 42],
      ["MEX", 1, 0, 0, 1, 1, 2, 0, 29]
    ]
  },
  {
    name: "F 組",
    note: "西班牙控球優勢明顯，但墨西哥若拿分會讓第三名門檻提高。",
    rows: [
      ["ESP", 1, 1, 0, 0, 2, 0, 3, 76],
      ["MEX", 1, 0, 1, 0, 1, 1, 1, 48],
      ["CRO", 1, 0, 1, 0, 1, 1, 1, 46],
      ["JPN", 1, 0, 0, 1, 0, 2, 0, 28]
    ]
  }
];

const modelNotes = [
  {
    title: "強隊優勢不等於大勝",
    text: "法國與西班牙勝率較高，但模型都把 1 球差與低比分列為主要情境。"
  },
  {
    title: "巴西 vs 德國波動最高",
    text: "兩隊都有高轉換效率，雙方進球機率來到 62%，是今日最不穩定的一場。"
  },
  {
    title: "和局風險集中在強強對話",
    text: "阿根廷、克羅埃西亞、巴西、德國兩場的平手機率都接近三成。"
  }
];

const heatItems = [
  {
    title: "C 組：阿根廷贏球可接近提前晉級",
    text: "若克羅埃西亞拿分，小組第一競爭會拖到最後一輪。"
  },
  {
    title: "D 組：日本拿分價值很高",
    text: "面對法國只要不輸，模型會明顯上修日本晉級率。"
  },
  {
    title: "E 組：淨勝球可能決定第三名排序",
    text: "巴西與德國若打大比分，其他隊第三名比較壓力會升高。"
  }
];

let selectedMatchId = matches[0].id;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function team(code) {
  return teams[code];
}

function createTeamLine(code) {
  const item = team(code);
  return `
    <span class="team-name">
      <span class="team-chip" style="--chip:${item.color}" aria-hidden="true"></span>
      <span>${item.name}</span>
    </span>
  `;
}

function percentBar(label, value, color = "var(--green)") {
  return `
    <div class="prob-row">
      <span>${label}</span>
      <div class="bar-track" aria-hidden="true">
        <div class="bar-fill" style="--value:${value}; --bar:${color}"></div>
      </div>
      <strong>${value}%</strong>
    </div>
  `;
}

function renderMatchCards(filter = "all") {
  const grid = $("#match-grid");
  grid.innerHTML = matches
    .map((match) => {
      const isHidden = filter !== "all" && !match.filter.includes(filter);
      return `
        <article class="match-card ${isHidden ? "is-hidden" : ""}">
          <div class="match-meta">
            <span>${match.kickoff}</span>
            <span>${match.group}｜${match.round}</span>
          </div>
          <div class="team-pair">
            ${createTeamLine(match.home)}
            <span class="versus">VS</span>
            ${createTeamLine(match.away)}
          </div>
          <div class="prediction-line">
            <div class="predicted-score">${match.score}</div>
            <p>${match.summary}</p>
          </div>
          <div class="prob-bars">
            ${percentBar(team(match.home).name, match.probs.home, "var(--green)")}
            ${percentBar("和局", match.probs.draw, "var(--gold)")}
            ${percentBar(team(match.away).name, match.probs.away, "var(--blue)")}
          </div>
          <div class="odds-box" aria-label="台灣運彩勝和負倍率">
            <div class="odd"><small>主勝</small><strong>${match.odds.home}</strong></div>
            <div class="odd"><small>和局</small><strong>${match.odds.draw}</strong></div>
            <div class="odd"><small>客勝</small><strong>${match.odds.away}</strong></div>
          </div>
          <div class="card-actions">
            <div class="tag-row">
              ${match.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <button class="secondary-action" type="button" data-open-match="${match.id}">分析</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMatchSelect() {
  const select = $("#match-select");
  select.innerHTML = matches
    .map((match) => `<option value="${match.id}">${team(match.home).name} vs ${team(match.away).name}</option>`)
    .join("");
  select.value = selectedMatchId;
}

function renderMatchDetail() {
  const match = matches.find((item) => item.id === selectedMatchId) || matches[0];
  const home = team(match.home);
  const away = team(match.away);
  $("#odds-updated").textContent = match.odds.updated;
  $("#hero-match-title").textContent = `${home.name} vs ${away.name}`;
  $("#hero-score").textContent = match.score.replace("-", " - ");
  $("#hero-summary").textContent = match.summary;
  $(".primary-action").dataset.openMatch = match.id;

  $("#match-detail").innerHTML = `
    <div class="match-hero">
      <div>
        <span class="eyebrow">${match.group}｜${match.kickoff}｜${match.venue}</span>
        <h2>${home.name} vs ${away.name}</h2>
        <p>${match.summary}</p>
        <div class="tag-row">
          <span class="confidence">模型信心：${match.confidence}</span>
          ${match.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
      <div class="score-callout">
        <div>
          <span>模型預估比分</span>
          <strong>${match.score}</strong>
        </div>
      </div>
    </div>

    <div class="detail-grid">
      <section class="detail-panel">
        <h3>一眼看懂</h3>
        <div class="metric-grid">
          <div class="metric"><span>${home.name}勝率</span><strong>${match.probs.home}%</strong></div>
          <div class="metric"><span>和局機率</span><strong>${match.probs.draw}%</strong></div>
          <div class="metric"><span>${away.name}勝率</span><strong>${match.probs.away}%</strong></div>
        </div>
        <div class="prob-bars">
          ${percentBar("大球傾向", match.probs.over, "var(--red)")}
          ${percentBar("雙方進球", match.probs.btts, "var(--cyan)")}
        </div>
      </section>

      <section class="detail-panel">
        <h3>台灣運彩倍率</h3>
        <div class="odds-box">
          <div class="odd"><small>主勝 ${home.name}</small><strong>${match.odds.home}</strong></div>
          <div class="odd"><small>和局</small><strong>${match.odds.draw}</strong></div>
          <div class="odd"><small>客勝 ${away.name}</small><strong>${match.odds.away}</strong></div>
        </div>
        <p class="heading-note">更新時間：${match.odds.updated}。倍率只作市場訊號參考。</p>
      </section>

      <section class="detail-panel">
        <h3>白話解讀</h3>
        <div class="analysis-copy">
          ${match.analysis.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </section>

      <section class="detail-panel">
        <h3>最可能比分</h3>
        <div class="scoreline-list">
          ${match.scorelines
            .map(
              ([score, probability]) => `
                <div class="scoreline-row">
                  <span>${score}</span>
                  <div class="bar-track" aria-hidden="true">
                    <div class="bar-fill" style="--value:${probability * 6}; --bar:var(--green)"></div>
                  </div>
                  <strong>${probability}%</strong>
                </div>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="detail-panel">
        <h3>關鍵因素</h3>
        <ul class="factor-list">
          ${match.factors.map((factor) => `<li>${factor}</li>`).join("")}
        </ul>
      </section>

      <section class="detail-panel">
        <h3>歷史與近況</h3>
        <p>${match.history}</p>
        <div class="mini-row">
          <span>${home.name} Elo</span>
          <strong>${home.elo}</strong>
        </div>
        <div class="mini-row">
          <span>${away.name} Elo</span>
          <strong>${away.elo}</strong>
        </div>
      </section>

      <section class="detail-panel wide">
        <h3>晉級影響</h3>
        <div class="impact-row"><span>${home.name}贏球</span><strong>${match.qualification.win}</strong></div>
        <div class="impact-row"><span>雙方平手</span><strong>${match.qualification.draw}</strong></div>
        <div class="impact-row"><span>${away.name}贏球</span><strong>${match.qualification.loss}</strong></div>
      </section>
    </div>
  `;
}

function renderHeatAndNotes() {
  $("#heat-list").innerHTML = heatItems
    .map((item) => `<article class="heat-item"><h3>${item.title}</h3><p>${item.text}</p></article>`)
    .join("");
  $("#notes-list").innerHTML = modelNotes
    .map((item) => `<article class="note-item"><h3>${item.title}</h3><p>${item.text}</p></article>`)
    .join("");
}

function renderGroups() {
  $("#group-grid").innerHTML = groups
    .map(
      (group) => `
        <section class="group-panel">
          <div class="group-title">
            <div>
              <span class="eyebrow">${group.name}</span>
              <h3>${group.note}</h3>
            </div>
          </div>
          <table class="group-table">
            <thead>
              <tr>
                <th>球隊</th>
                <th>賽</th>
                <th>勝</th>
                <th>和</th>
                <th>敗</th>
                <th>淨勝</th>
                <th>分</th>
                <th>晉級</th>
              </tr>
            </thead>
            <tbody>
              ${group.rows
                .map(([code, played, wins, draws, losses, gf, ga, points, qualify]) => {
                  const diff = gf - ga;
                  return `
                    <tr>
                      <td>${createTeamLine(code)}</td>
                      <td>${played}</td>
                      <td>${wins}</td>
                      <td>${draws}</td>
                      <td>${losses}</td>
                      <td>${diff > 0 ? `+${diff}` : diff}</td>
                      <td><strong>${points}</strong></td>
                      <td>${qualify}%</td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
        </section>
      `
    )
    .join("");

  const thirdCandidates = groups
    .map((group) => group.rows[2])
    .sort((a, b) => b[7] - a[7]);

  $("#third-place-panel").innerHTML = `
    <div class="section-heading compact">
      <div>
        <span class="eyebrow">Third Place Watch</span>
        <h2>最佳第三名觀察</h2>
      </div>
      <p class="heading-note">48 隊賽制下，第三名比較會看積分、淨勝球與進球數。</p>
    </div>
    <div class="third-list">
      ${thirdCandidates
        .map(([code, played, wins, draws, losses, gf, ga, points, qualify]) => {
          const diff = gf - ga;
          return `
            <div class="third-item">
              <strong>${team(code).name}</strong>
              <span>${points} 分｜淨勝 ${diff > 0 ? `+${diff}` : diff}｜晉級 ${qualify}%</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderTeams() {
  $("#team-grid").innerHTML = Object.entries(teams)
    .map(([code, item]) => {
      const form = item.form
        .map((result) => {
          const label = result === "W" ? "勝" : result === "D" ? "和" : "敗";
          const className = result === "W" ? "win" : result === "D" ? "draw" : "loss";
          return `<span class="form-dot ${className}">${label}</span>`;
        })
        .join("");
      return `
        <article class="team-card">
          <div class="team-head">
            <span class="team-emblem" style="--chip:${item.color}" aria-hidden="true"></span>
            <div>
              <span class="eyebrow">${item.en}</span>
              <h3>${item.name}</h3>
            </div>
          </div>
          <p>${item.summary}</p>
          <div class="mini-row"><span>FIFA 排名</span><strong>${item.rank}</strong></div>
          <div class="mini-row"><span>Elo 評分</span><strong>${item.elo}</strong></div>
          <div class="mini-row"><span>洲別</span><strong>${item.confed}</strong></div>
          <div class="mini-row"><span>世界盃最佳</span><strong>${item.best}</strong></div>
          <div class="form-row" aria-label="${item.name}近期五場">${form}</div>
        </article>
      `;
    })
    .join("");
}

function switchView(viewName) {
  $$(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewName);
  });
  $$("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === viewName);
  });
  window.scrollTo({ top: viewName === "dashboard" ? 0 : $(".status-strip").offsetTop + 80, behavior: "smooth" });
}

function openMatch(matchId) {
  selectedMatchId = matchId;
  renderMatchSelect();
  renderMatchDetail();
  switchView("match");
}

function bindEvents() {
  $(".main-nav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    switchView(button.dataset.view);
  });

  document.body.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-match]");
    if (!button) return;
    openMatch(button.dataset.openMatch);
  });

  $("#match-select").addEventListener("change", (event) => {
    selectedMatchId = event.target.value;
    renderMatchDetail();
  });

  $(".segmented-control").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    $$(".segment").forEach((segment) => segment.classList.toggle("is-active", segment === button));
    renderMatchCards(button.dataset.filter);
  });
}

function init() {
  renderMatchCards();
  renderMatchSelect();
  renderMatchDetail();
  renderHeatAndNotes();
  renderGroups();
  renderTeams();
  bindEvents();
}

init();
