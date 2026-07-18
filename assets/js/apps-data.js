// ============================================================
// アプリカタログ
// 新しいアプリを追加する場合はこの配列にオブジェクトを1つ追加するだけ。
// id      : App Store の数値ID (URL末尾の idXXXXXXXXXX の数字部分)
// slug    : App Store URL のスラッグ (リンク生成に使用)
// category: 'productivity' | 'health' | 'lifestyle' | 'photo'
//           | 'finance' | 'tools' | 'food' | 'game'
//           (カテゴリを増やす場合は i18n.js の CATEGORY_LABELS にも追加)
// name    : { ja, en } 表示名
// desc    : { ja, en } 1〜2文の紹介文
// accent  : カードのネオンカラー 'cyan' | 'magenta' | 'yellow' | 'green'
// ============================================================
const APPS = [
  {
    id: "6785230783",
    slug: "tody-today-week-to-do",
    category: "productivity",
    accent: "cyan",
    name: { ja: "Tody — Today Week To-Do", en: "Tody — Today Week To-Do" },
    desc: {
      ja: "「今日」と「今週」だけに集中するミニマルなToDo。迷わず今やるべきことが見える。",
      en: "A minimal to-do app focused on just Today and This Week. See what matters now, instantly."
    }
  },
  {
    id: "6788225890",
    slug: "diceroller-rpg-dice",
    category: "game",
    accent: "magenta",
    name: { ja: "DiceRoller — RPG Dice", en: "DiceRoller — RPG Dice" },
    desc: {
      ja: "TRPGやボードゲームに。D4からD100まで振れる本格ダイスローラー。",
      en: "Roll D4 to D100 for tabletop RPGs and board games. Fast, satisfying, reliable."
    }
  },
  {
    id: "6785088442",
    slug: "sudoku-zen-number-logic",
    category: "game",
    accent: "cyan",
    name: { ja: "Sudoku Zen — Number Logic", en: "Sudoku Zen — Number Logic" },
    desc: {
      ja: "静かに没頭できる数独。禅の心で数字ロジックを解き明かす。",
      en: "Sudoku designed for calm, deep focus. Solve number logic with a zen mind."
    }
  },
  {
    id: "6785213055",
    slug: "splitpal-bill-splitter",
    category: "finance",
    accent: "green",
    name: { ja: "SplitPal — 割り勘アプリ", en: "SplitPal — Bill Splitter" },
    desc: {
      ja: "飲み会や旅行の割り勘を一瞬で計算。誰がいくら払うかもう揉めない。",
      en: "Split bills for dinners and trips in seconds. No more awkward math with friends."
    }
  },
  {
    id: "6785319142",
    slug: "nippo-daily-report-maker",
    category: "productivity",
    accent: "yellow",
    name: { ja: "Nippo — 日報メーカー", en: "Nippo — Daily Report Maker" },
    desc: {
      ja: "日報作成を最速に。テンプレートでサクッと書いてそのまま共有。",
      en: "Write daily work reports at lightning speed with templates, then share instantly."
    }
  },
  {
    id: "6785562622",
    slug: "intervo-hiit-tabata-timer",
    category: "health",
    accent: "magenta",
    name: { ja: "Intervo — HIIT タバタタイマー", en: "Intervo — HIIT Tabata Timer" },
    desc: {
      ja: "HIIT・タバタ式トレーニング用インターバルタイマー。追い込みたい日の相棒。",
      en: "Interval timer built for HIIT and Tabata workouts. Your partner for pushing limits."
    }
  },
  {
    id: "6784898840",
    slug: "coinpouch-offline-budget",
    category: "finance",
    accent: "yellow",
    name: { ja: "CoinPouch — オフライン予算管理", en: "CoinPouch — Offline Budget" },
    desc: {
      ja: "完全オフラインで使える予算管理。データは端末の中だけ、プライバシー重視。",
      en: "Budget tracking that works fully offline. Your data never leaves your device."
    }
  },
  {
    id: "6786262885",
    slug: "levelmaster-bubble-level",
    category: "tools",
    accent: "green",
    name: { ja: "LevelMaster — 水平器", en: "LevelMaster — Bubble Level" },
    desc: {
      ja: "スマホが水平器に。家具の設置やDIYの強い味方。",
      en: "Turn your phone into a precision bubble level. Perfect for DIY and furniture setup."
    }
  },
  {
    id: "6784672249",
    slug: "leafy-plant-care-reminder",
    category: "lifestyle",
    accent: "green",
    name: { ja: "Leafy — 植物のお世話リマインダー", en: "Leafy — Plant Care Reminder" },
    desc: {
      ja: "水やりを忘れて枯らすのはもう終わり。植物ごとのお世話をリマインド。",
      en: "Never let a plant die of thirst again. Care reminders tailored to each plant."
    }
  },
  {
    id: "6785360681",
    slug: "dueday-deadline-countdown",
    category: "productivity",
    accent: "magenta",
    name: { ja: "DueDay — 締切カウントダウン", en: "DueDay — Deadline Countdown" },
    desc: {
      ja: "大事な締切まであと何日?一目でわかるカウントダウン管理。",
      en: "How many days until it's due? Count down to every deadline at a glance."
    }
  },
  {
    id: "6784361354",
    slug: "aquatap-water-tracker",
    category: "health",
    accent: "cyan",
    name: { ja: "AquaTap — 水分補給トラッカー", en: "AquaTap — Water Tracker" },
    desc: {
      ja: "タップするだけの水分記録。今日の水、ちゃんと飲めてる?",
      en: "Log your water intake with a single tap. Stay hydrated, effortlessly."
    }
  },
  {
    id: "6784964041",
    slug: "trailpack-camp-checklist",
    category: "lifestyle",
    accent: "green",
    name: { ja: "TrailPack — キャンプ持ち物リスト", en: "TrailPack — Camp Checklist" },
    desc: {
      ja: "キャンプ・登山の忘れ物ゼロへ。ギアのチェックリストを賢く管理。",
      en: "Zero forgotten gear on your next camp or hike. Smart checklists for the outdoors."
    }
  },
  {
    id: "6785798158",
    slug: "soundlevel-pro-db-meter",
    category: "tools",
    accent: "cyan",
    name: { ja: "SoundLevel Pro — 騒音計", en: "SoundLevel Pro — dB Meter" },
    desc: {
      ja: "周囲の騒音レベルをdBで計測。環境チェックや楽器練習に。",
      en: "Measure ambient noise in decibels. Great for environment checks and practice rooms."
    }
  },
  {
    id: "6784733202",
    slug: "lull-focus-sleep-sounds",
    category: "health",
    accent: "magenta",
    name: { ja: "Lull — 集中・睡眠サウンド", en: "Lull — Focus & Sleep Sounds" },
    desc: {
      ja: "集中したい時も、眠りたい夜も。心地よい環境音があなたを包む。",
      en: "Ambient soundscapes for deep focus and better sleep. Press play, drift away."
    }
  },
  {
    id: "6788250434",
    slug: "chorewheel-chore-tracker",
    category: "lifestyle",
    accent: "yellow",
    name: { ja: "ChoreWheel — 家事トラッカー", en: "ChoreWheel — Chore Tracker" },
    desc: {
      ja: "家事の分担と記録をゲーム感覚で。「誰がやったっけ?」を解決。",
      en: "Track and share household chores, game-style. Settle 'whose turn is it?' for good."
    }
  },
  {
    id: "6786336559",
    slug: "petcare-log-pet-tracker",
    category: "lifestyle",
    accent: "cyan",
    name: { ja: "PetCare Log — ペット記録", en: "PetCare Log — Pet Tracker" },
    desc: {
      ja: "ごはん・お散歩・通院まで、大切なペットの毎日をまるごと記録。",
      en: "Log meals, walks, and vet visits — your pet's whole life in one place."
    }
  },
  {
    id: "6788648821",
    slug: "datestamp-cam-retro-date",
    category: "photo",
    accent: "yellow",
    name: { ja: "DateStamp Cam — レトロ日付カメラ", en: "DateStamp Cam — Retro Date" },
    desc: {
      ja: "写ルンです世代の日付焼き込みを再現。エモいレトロ写真が撮れる。",
      en: "Burn retro date stamps into your photos, straight out of the film-camera era."
    }
  },
  {
    id: "6786988500",
    slug: "cafelog-my-cafe-diary",
    category: "lifestyle",
    accent: "magenta",
    name: { ja: "CafeLog — マイカフェ日記", en: "CafeLog — My Cafe Diary" },
    desc: {
      ja: "訪れたカフェを記録するあなただけのカフェ手帳。お気に入りを地図に刻もう。",
      en: "Your personal cafe-hopping diary. Map every great cafe you discover."
    }
  },
  {
    id: "6787842811",
    slug: "pixelartcam-pixel-art-maker",
    category: "photo",
    accent: "magenta",
    name: { ja: "PixelArtCam — ドット絵メーカー", en: "PixelArtCam — Pixel Art Maker" },
    desc: {
      ja: "写真を一瞬でドット絵に変換。8bitの世界へようこそ。",
      en: "Turn photos into pixel art instantly. Welcome to the 8-bit dimension."
    }
  },
  {
    id: "6787731369",
    slug: "recipebox-my-recipe-book",
    category: "food",
    accent: "yellow",
    name: { ja: "RecipeBox — マイレシピ帳", en: "RecipeBox — My Recipe Book" },
    desc: {
      ja: "自分だけのレシピをストック。おうちの味を、ずっと残せる。",
      en: "Save your own recipes in one beautiful book. Keep family flavors forever."
    }
  },
  {
    id: "6784641065",
    slug: "gratie-gratitude-journal",
    category: "lifestyle",
    accent: "cyan",
    name: { ja: "Gratie — 感謝日記", en: "Gratie — Gratitude Journal" },
    desc: {
      ja: "1日1つ、感謝を書き留めるだけ。小さな習慣が毎日を変える。",
      en: "Write one thing you're grateful for each day. A tiny habit with a big impact."
    }
  },
  {
    id: "6788586336",
    slug: "polaroidframe-instant-frame",
    category: "photo",
    accent: "cyan",
    name: { ja: "PolaroidFrame — インスタントフレーム", en: "PolaroidFrame — Instant Frame" },
    desc: {
      ja: "写真をポラロイド風に加工。手書きキャプションでエモさ倍増。",
      en: "Give photos an instant-camera look with frames and handwritten captions."
    }
  },
  {
    id: "6785934495",
    slug: "mirrorme-beauty-mirror",
    category: "tools",
    accent: "magenta",
    name: { ja: "MirrorMe — ビューティーミラー", en: "MirrorMe — Beauty Mirror" },
    desc: {
      ja: "スマホが明るく見やすい手鏡に。外出先のメイク直しに。",
      en: "Your phone becomes a bright, crystal-clear mirror. Touch-ups anywhere."
    }
  },
  {
    id: "6785522355",
    slug: "notedown-markdown-notes",
    category: "productivity",
    accent: "cyan",
    name: { ja: "NoteDown — Markdownノート", en: "NoteDown — Markdown Notes" },
    desc: {
      ja: "Markdownでサクサク書けるシンプルノート。エンジニアの思考置き場に。",
      en: "Fast, simple Markdown notes. The perfect scratchpad for developer brains."
    }
  },
  {
    id: "6785066963",
    slug: "liftnote-gym-log",
    category: "health",
    accent: "yellow",
    name: { ja: "LiftNote — 筋トレ記録", en: "LiftNote — Gym Log" },
    desc: {
      ja: "重量・回数・セットを最速で記録。数字で見える成長がモチベになる。",
      en: "Log weights, reps, and sets at speed. Watch your numbers grow."
    }
  },
  {
    id: "6788350863",
    slug: "coffeebrewlog-brew-recipe",
    category: "food",
    accent: "magenta",
    name: { ja: "CoffeeBrewLog — 抽出レシピ", en: "CoffeeBrewLog — Brew Recipe" },
    desc: {
      ja: "豆・挽き目・湯温・時間を記録して、あなたのベストな一杯を再現。",
      en: "Log beans, grind, temperature, and time to reproduce your perfect cup."
    }
  },
  {
    id: "6757652619",
    slug: "%E3%83%9C%E3%82%A4%E3%82%B9%E4%BD%93%E9%87%8D%E3%83%A1%E3%83%A2",
    category: "health",
    accent: "green",
    name: { ja: "ボイス体重メモ", en: "Voice Weight Memo" },
    desc: {
      ja: "声で言うだけで体重を記録。毎日の計測がとにかくラクになる。",
      en: "Log your weight just by saying it out loud. The easiest daily habit ever."
    }
  },
  {
    id: "6785095668",
    slug: "packpilot-packing-list",
    category: "lifestyle",
    accent: "cyan",
    name: { ja: "PackPilot — パッキングリスト", en: "PackPilot — Packing List" },
    desc: {
      ja: "旅の荷造りをスマートに。行き先に合わせた持ち物リストで忘れ物ゼロ。",
      en: "Pack smarter for every trip. Destination-aware lists mean nothing gets left behind."
    }
  },
  {
    id: "6786718534",
    slug: "saunadiary-%E3%83%9E%E3%82%A4%E3%82%B5%E3%82%A6%E3%83%8A%E6%89%8B%E5%B8%B3",
    category: "lifestyle",
    accent: "magenta",
    name: { ja: "SaunaDiary — マイサウナ手帳", en: "SaunaDiary — My Sauna Log" },
    desc: {
      ja: "サ活を記録する専用手帳。今日の「ととのい」を残そう。",
      en: "A dedicated log for your sauna sessions. Record every perfect 'totonoi'."
    }
  },
  {
    id: "6757483193",
    slug: "%E3%82%BF%E3%82%B9%E3%82%AF%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88",
    category: "productivity",
    accent: "yellow",
    name: { ja: "タスクカウント", en: "Task Count" },
    desc: {
      ja: "こなしたタスクを数えるだけのシンプル記録。積み上げが自信になる。",
      en: "Simply count the tasks you complete. Watch small wins stack into confidence."
    }
  },
  {
    id: "6786963358",
    slug: "workspotfinder-cafe-work-log",
    category: "lifestyle",
    accent: "cyan",
    name: { ja: "WorkSpotFinder — カフェ作業ログ", en: "WorkSpotFinder — Cafe Work Log" },
    desc: {
      ja: "ノマドワークに最適なカフェを記録・評価。Wi-Fiと電源のある席を逃さない。",
      en: "Log and rate cafes for remote work. Never lose track of good Wi-Fi and outlets."
    }
  },
  {
    id: "6787983924",
    slug: "deskstretch-stretch-reminder",
    category: "health",
    accent: "green",
    name: { ja: "DeskStretch — ストレッチリマインダー", en: "DeskStretch — Stretch Reminder" },
    desc: {
      ja: "座りっぱなしのあなたへ。定期的なストレッチでデスクワークの体をケア。",
      en: "For desk-bound humans. Regular stretch reminders keep your body running."
    }
  },
  {
    id: "6757633166",
    slug: "%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6qr",
    category: "tools",
    accent: "yellow",
    name: { ja: "まとめてQR", en: "Matomete QR" },
    desc: {
      ja: "複数のQRコードをまとめて管理・表示。イベントやお店の受付がスムーズに。",
      en: "Manage and show multiple QR codes in one place. Breeze through check-ins."
    }
  },
  {
    id: "6785651690",
    slug: "quickkakeibo-expense-log",
    category: "finance",
    accent: "cyan",
    name: { ja: "QuickKakeibo — 支出メモ", en: "QuickKakeibo — Expense Log" },
    desc: {
      ja: "3秒で支出を記録する最速家計簿。続かなかった人のための家計簿。",
      en: "Log expenses in 3 seconds. The budget book for people who never stick to one."
    }
  }
];
