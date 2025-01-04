import { ca } from "date-fns/locale";

// ダミーのデータを返す
const ingredientsData = [
  {
    _id: "1",
    name: "キャベツ",
    category: "野菜",
  },
  {
    _id: "2",
    name: "にんじん",
    category: "野菜",
  },
  {
    _id: "3",
    name: "じゃがいも",
    category: "野菜",
  },
  {
    _id: "4",
    name: "たまねぎ",
    category: "野菜",
  },
  {
    _id: "5",
    name: "ほうれん草",
    category: "野菜",
  },
  {
    _id: "6",
    name: "ブロッコリー",
    category: "野菜",
  },
  {
    _id: "7",
    name: "トマト",
    category: "野菜",
  },
  {
    _id: "8",
    name: "きゅうり",
    category: "野菜",
  },
  {
    _id: "9",
    name: "ピーマン",
    category: "野菜",
  },
  {
    _id: "10",
    name: "なす",
    category: "野菜",
  },
  {
    _id: "11",
    name: "かぼちゃ",
    category: "野菜",
  },
  {
    _id: "12",
    name: "さつまいも",
    category: "野菜",
  },
  {
    _id: "13",
    name: "レタス",
    category: "野菜",
  },
  {
    _id: "14",
    name: "セロリ",
    category: "野菜",
  },
  {
    _id: "15",
    name: "アスパラガス",
    category: "野菜",
  },
  {
    _id: "16",
    name: "レンコン",
    category: "野菜",
  },
  {
    _id: "17",
    name: "大根",
    category: "野菜",
  },
  {
    _id: "18",
    name: "にら",
    category: "野菜",
  },
  {
    _id: "19",
    name: "しいたけ",
    category: "きのこ類",
  },
  {
    _id: "20",
    name: "えのき",
    category: "きのこ類",
  },
  {
    _id: "22",
    name: "しめじ",
    category: "きのこ類",
  },
  {
    _id: "23",
    name: "マッシュルーム",
    category: "きのこ類",
  },
  {
    _id: "24",
    name: "エリンギ",
    category: "きのこ類",
  },
  {
    _id: "25",
    name: "りんご",
    category: "果物",
  },
  {
    _id: "26",
    name: "バナナ",
    category: "果物",
  },
  {
    _id: "27",
    name: "みかん",
    category: "果物",
  },
  {
    _id: "28",
    name: "いちご",
    category: "果物",
  },
  {
    _id: "29",
    name: "ぶどう",
    category: "果物",
  },
  {
    _id: "30",
    name: "メロン",
    category: "果物",
  },
  {
    _id: "31",
    name: "さくらんぼ",
    category: "果物",
  },
  {
    _id: "32",
    name: "パイナップル",
    category: "果物",
  },
  {
    _id: "33",
    name: "キウイ",
    category: "果物",
  },
  {
    _id: "34",
    name: "マンゴー",
    category: "果物",
  },
  {
    _id: "35",
    name: "パパイヤ",
    category: "果物",
  },
  {
    _id: "36",
    name: "レモン",
    category: "果物",
  },
  {
    _id: "37",
    name: "ライム",
    category: "果物",
  },
  {
    _id: "38",
    name: "オレンジ",
    category: "果物",
  },
  {
    _id: "39",
    name: "グレープフルーツ",
    category: "果物",
  },
  {
    _id: "40",
    name: "タイ",
    category: "魚介類",
  },
  {
    _id: "41",
    name: "サバ",
    category: "魚介類",
  },
  {
    _id: "42",
    name: "イワシ",
    category: "魚介類",
  },
  {
    _id: "43",
    name: "サンマ",
    category: "魚介類",
  },
  {
    _id: "44",
    name: "マグロ",
    category: "魚介類",
  },
  {
    _id: "45",
    name: "カツオ",
    category: "魚介類",
  },
  {
    _id: "46",
    name: "ホタテ",
    category: "魚介類",
  },
  {
    _id: "47",
    name: "アサリ",
    category: "魚介類",
  },
  {
    _id: "48",
    name: "ホタルイカ",
    category: "魚介類",
  },
  {
    _id: "49",
    name: "エビ",
    category: "魚介類",
  },
  {
    _id: "50",
    name: "イカ",
    category: "魚介類",
  },
  {
    _id: "51",
    name: "タコ",
    category: "魚介類",
  },
  {
    _id: "52",
    name: "牛もも肉",
    category: "肉類",
  },
  {
    _id: "53",
    name: "豚もも肉",
    category: "肉類",
  },
  {
    _id: "54",
    name: "鶏むね肉",
    category: "肉類",
  },
  {
    _id: "55",
    name: "豚バラ肉",
    category: "肉類",
  },
  {
    _id: "56",
    name: "鶏もも肉",
    category: "肉類",
  },
  {
    _id: "57",
    name: "豚ロース",
    category: "肉類",
  },
  {
    _id: "58",
    name: "牛バラ肉",
    category: "肉類",
  },
  {
    _id: "59",
    name: "牛ロース",
    category: "肉類",
  },
  {
    _id: "60",
    name: "牛ひれ肉",
    category: "肉類",
  },
  {
    _id: "61",
    name: "牛タン",
    category: "肉類",
  },
  {
    _id: "62",
    name: "鶏手羽先",
    category: "肉類",
  },
  {
    _id: "63",
    name: "鶏手羽中",
    category: "肉類",
  },
  {
    _id: "64",
    name: "鶏ささみ",
    category: "肉類",
  },
  {
    _id: "65",
    name: "豚ヒレ",
    category: "肉類",
  },
  {
    _id: "66",
    name: "小麦粉",
    category: "穀類",
  },
  {
    _id: "67",
    name: "米",
    category: "穀類",
  },
  {
    _id: "68",
    name: "パン粉",
    category: "穀類",
  },
  {
    _id: "69",
    name: "パスタ",
    category: "穀類",
  },
  {
    _id: "70",
    name: "そば",
    category: "穀類",
  },
  {
    _id: "71",
    name: "うどん",
    category: "穀類",
  },
  {
    _id: "72",
    name: "ラーメン",
    category: "穀類",
  },
  {
    _id: "73",
    name: "そうめん",
    category: "穀類",
  },
  {
    _id: "74",
    name: "おから",
    category: "豆類",
  },
  {
    _id: "75",
    name: "納豆",
    category: "豆類",
  },
  {
    _id: "76",
    name: "豆腐",
    category: "豆類",
  },
  {
    _id: "77",
    name: "豆乳",
    category: "豆類",
  },
  {
    _id: "78",
    name: "枝豆",
    category: "豆類",
  },
  {
    _id: "79",
    name: "ひよこ豆",
    category: "豆類",
  },
  {
    _id: "80",
    name: "大豆",
    category: "豆類",
  },
  {
    _id: "81",
    name: "小豆",
    category: "豆類",
  },
  {
    _id: "82",
    name: "レンズ豆",
    category: "豆類",
  },
  {
    _id: "83",
    name: "ソラマメ",
    category: "豆類",
  },
];

export default ingredientsData;
