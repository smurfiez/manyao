const MANYAO_MIX_QUERIES = [
  "manyao nonstop",
  "manyao remix",
  "92ccdj manyao",
  "chinese dj manyao nonstop",
  "manyao club mix",
  "electro manyao nonstop",
  "dj manyao full bass",
  "chinese dj remix nonstop"
];

const FALLBACK_MIXCLOUD_MIXES = [
  {
    "id": "/jarty-ye/%E4%B8%80%E5%84%84%E5%80%8B%E5%82%B7%E5%BF%83x%E5%A4%A9%E4%BD%BF%E7%9A%84%E7%BF%85%E8%86%80x%E6%8B%BF%E8%B5%B0%E4%BA%86%E4%BB%80%E9%BA%BCrmx-2k18-private-nonstop-manyao-just-for-celine-by-dj-ye/",
    "key": "/jarty-ye/%E4%B8%80%E5%84%84%E5%80%8B%E5%82%B7%E5%BF%83x%E5%A4%A9%E4%BD%BF%E7%9A%84%E7%BF%85%E8%86%80x%E6%8B%BF%E8%B5%B0%E4%BA%86%E4%BB%80%E9%BA%BCrmx-2k18-private-nonstop-manyao-just-for-celine-by-dj-ye/",
    "title": "一億個傷心X天使的翅膀X拿走了什麼RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR Celine BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 5410,
    "duration_formatted": "1h 30m",
    "url": "https://www.mixcloud.com/jarty-ye/%E4%B8%80%E5%84%84%E5%80%8B%E5%82%B7%E5%BF%83x%E5%A4%A9%E4%BD%BF%E7%9A%84%E7%BF%85%E8%86%80x%E6%8B%BF%E8%B5%B0%E4%BA%86%E4%BB%80%E9%BA%BCrmx-2k18-private-nonstop-manyao-just-for-celine-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/a/b/f/c/f878-1b0e-473b-a2d4-6dd5bdb16f98"
  },
  {
    "id": "/DjXinyi/%E4%BE%A7%E8%84%B8%E6%88%92%E8%8F%B8%E8%B5%B0%E5%BF%83%E8%BF%87%E5%AE%A2dj-xiin-yii-2k18-private-manyao-nonstop-rmx-for-myself/",
    "key": "/DjXinyi/%E4%BE%A7%E8%84%B8%E6%88%92%E8%8F%B8%E8%B5%B0%E5%BF%83%E8%BF%87%E5%AE%A2dj-xiin-yii-2k18-private-manyao-nonstop-rmx-for-myself/",
    "title": "侧脸•戒菸•走心•过客•DJ XiiN Yii 2K18 PRIVATE MANYAO NONSTOP RMX FOR MYSELF",
    "channel": "DJ XiiN Yii",
    "duration": 5283,
    "duration_formatted": "1h 28m",
    "url": "https://www.mixcloud.com/DjXinyi/%E4%BE%A7%E8%84%B8%E6%88%92%E8%8F%B8%E8%B5%B0%E5%BF%83%E8%BF%87%E5%AE%A2dj-xiin-yii-2k18-private-manyao-nonstop-rmx-for-myself/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/f/5/8/c/1dfb-2d7d-4d58-9e88-797b3091b84b"
  },
  {
    "id": "/jarty-ye/%E4%B8%8D%E6%83%B3v3%E6%B5%AA%E4%BA%BA%E7%90%B5%E7%90%B6%E6%84%9F%E8%AC%9D%E4%BD%A0%E6%9B%BE%E4%BE%86%E9%81%8Ermx-2k18-private-nonstop-manyao-just-for-ah-qun-by-dj-ye/",
    "key": "/jarty-ye/%E4%B8%8D%E6%83%B3v3%E6%B5%AA%E4%BA%BA%E7%90%B5%E7%90%B6%E6%84%9F%E8%AC%9D%E4%BD%A0%E6%9B%BE%E4%BE%86%E9%81%8Ermx-2k18-private-nonstop-manyao-just-for-ah-qun-by-dj-ye/",
    "title": "不想V3●浪人琵琶●感謝你曾來過RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR Ah Qun BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 3843,
    "duration_formatted": "1h 4m",
    "url": "https://www.mixcloud.com/jarty-ye/%E4%B8%8D%E6%83%B3v3%E6%B5%AA%E4%BA%BA%E7%90%B5%E7%90%B6%E6%84%9F%E8%AC%9D%E4%BD%A0%E6%9B%BE%E4%BE%86%E9%81%8Ermx-2k18-private-nonstop-manyao-just-for-ah-qun-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/f/a/0/b/e928-f6f2-4941-b12a-87420837c3db"
  },
  {
    "id": "/junyan-lo/%E6%B2%99%E6%BC%A0%E9%AA%86%E9%A9%BC%E6%8B%A5%E6%8A%B1%E4%BD%A0%E7%A6%BB%E5%8E%BB%E7%AD%94%E6%A1%88-manyao-remix-2k18-by-dj-y/",
    "key": "/junyan-lo/%E6%B2%99%E6%BC%A0%E9%AA%86%E9%A9%BC%E6%8B%A5%E6%8A%B1%E4%BD%A0%E7%A6%BB%E5%8E%BB%E7%AD%94%E6%A1%88-manyao-remix-2k18-by-dj-y/",
    "title": "沙漠骆驼$拥抱你离去$答案 MANYAO REMIX 2K18 BY DJ Y",
    "channel": "DJ Y神 (Y'P'DJs)",
    "duration": 3804,
    "duration_formatted": "1h 3m",
    "url": "https://www.mixcloud.com/junyan-lo/%E6%B2%99%E6%BC%A0%E9%AA%86%E9%A9%BC%E6%8B%A5%E6%8A%B1%E4%BD%A0%E7%A6%BB%E5%8E%BB%E7%AD%94%E6%A1%88-manyao-remix-2k18-by-dj-y/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/e/9/7/2/d345-8a1d-4078-b22b-627ec773f8cf"
  },
  {
    "id": "/ng-kianchee/%E9%94%99%E5%AD%A3%E6%B2%89%E9%86%89%E7%9A%84%E9%9D%92%E4%B8%9D%E5%96%84%E5%8F%98%E5%A4%9C%E6%9B%B2%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97nonstop-manyao-mix-2k20-by-djkc/",
    "key": "/ng-kianchee/%E9%94%99%E5%AD%A3%E6%B2%89%E9%86%89%E7%9A%84%E9%9D%92%E4%B8%9D%E5%96%84%E5%8F%98%E5%A4%9C%E6%9B%B2%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97nonstop-manyao-mix-2k20-by-djkc/",
    "title": "错季●沉醉的青丝●善变●夜曲●刻在我心底的名字●NONSTOP MANYAO MIX 2K20 BY DJKC",
    "channel": "DJ KC | UNiTED V.i.P'G DJs",
    "duration": 3628,
    "duration_formatted": "1h 0m",
    "url": "https://www.mixcloud.com/ng-kianchee/%E9%94%99%E5%AD%A3%E6%B2%89%E9%86%89%E7%9A%84%E9%9D%92%E4%B8%9D%E5%96%84%E5%8F%98%E5%A4%9C%E6%9B%B2%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97nonstop-manyao-mix-2k20-by-djkc/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/d/c/9/b/ead8-ad8a-44e4-9e12-5c68f1a08afa"
  },
  {
    "id": "/%E6%9D%83%E6%AD%A3/oi-%E6%88%91%E8%B7%9F%E4%BD%A0%E8%AE%B2%E5%90%BC-%E7%AC%AC%E4%B8%80%E9%A6%96%E4%BD%A0%E8%B7%9F%E6%88%91%E6%94%BE%E9%82%A3%E4%B8%AAnanana%E7%9A%84%E5%92%AF-%E7%9C%9F%E7%9A%84%E4%B8%80%E6%87%92%E6%B5%81%E5%99%A2-2o19-private-nonstop-manyao-just-for-jordan-by-dj-xiiaozen/",
    "key": "/%E6%9D%83%E6%AD%A3/oi-%E6%88%91%E8%B7%9F%E4%BD%A0%E8%AE%B2%E5%90%BC-%E7%AC%AC%E4%B8%80%E9%A6%96%E4%BD%A0%E8%B7%9F%E6%88%91%E6%94%BE%E9%82%A3%E4%B8%AAnanana%E7%9A%84%E5%92%AF-%E7%9C%9F%E7%9A%84%E4%B8%80%E6%87%92%E6%B5%81%E5%99%A2-2o19-private-nonstop-manyao-just-for-jordan-by-dj-xiiaozen/",
    "title": "『 Oi 我跟你讲吼 第一首你跟我放那个Nanana的咯 真的一懒流噢 !!! 』2o19 Private NonStop ManYao Just For JorDan BY DJ XiiaoZen",
    "channel": "DJ XiiaoZen|UNiTED V.i.P'G DJs",
    "duration": 4024,
    "duration_formatted": "1h 7m",
    "url": "https://www.mixcloud.com/%E6%9D%83%E6%AD%A3/oi-%E6%88%91%E8%B7%9F%E4%BD%A0%E8%AE%B2%E5%90%BC-%E7%AC%AC%E4%B8%80%E9%A6%96%E4%BD%A0%E8%B7%9F%E6%88%91%E6%94%BE%E9%82%A3%E4%B8%AAnanana%E7%9A%84%E5%92%AF-%E7%9C%9F%E7%9A%84%E4%B8%80%E6%87%92%E6%B5%81%E5%99%A2-2o19-private-nonstop-manyao-just-for-jordan-by-dj-xiiaozen/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/6/6/b/b/04ab-b541-40c0-bfa3-a23ca9d34a3d"
  },
  {
    "id": "/jarty-ye/%E7%BD%97%E6%9B%BC%E8%92%82%E5%85%8B%E7%9A%84%E7%88%B1%E6%83%85%E9%AB%94%E9%9D%A2%E7%97%85%E8%AE%8Armx-2k18-private-nonstop-manyao-just-for-bb-by-dj-ye/",
    "key": "/jarty-ye/%E7%BD%97%E6%9B%BC%E8%92%82%E5%85%8B%E7%9A%84%E7%88%B1%E6%83%85%E9%AB%94%E9%9D%A2%E7%97%85%E8%AE%8Armx-2k18-private-nonstop-manyao-just-for-bb-by-dj-ye/",
    "title": "罗曼蒂克的爱情✘體面✘病變RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR BB BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 4638,
    "duration_formatted": "1h 17m",
    "url": "https://www.mixcloud.com/jarty-ye/%E7%BD%97%E6%9B%BC%E8%92%82%E5%85%8B%E7%9A%84%E7%88%B1%E6%83%85%E9%AB%94%E9%9D%A2%E7%97%85%E8%AE%8Armx-2k18-private-nonstop-manyao-just-for-bb-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/c/b/3/c/8a52-8ef6-4f62-bf86-03e6fd092e03"
  },
  {
    "id": "/ng-kianchee/djkc-%E4%B9%9D%E4%B8%87%E5%AD%97%E8%B7%B3%E6%A5%BC%E6%9C%BA%E5%BA%A7%E4%BD%8D%E7%97%B4%E6%83%85%E7%9A%84%E7%94%B7%E5%AD%90%E6%B1%89%E5%BF%99%E7%BA%BF%E5%B0%8F%E5%AD%A9%E9%9B%A8%E5%A4%A9%E9%9B%AA%E8%97%8Fmanyao-mix-2k25/",
    "key": "/ng-kianchee/djkc-%E4%B9%9D%E4%B8%87%E5%AD%97%E8%B7%B3%E6%A5%BC%E6%9C%BA%E5%BA%A7%E4%BD%8D%E7%97%B4%E6%83%85%E7%9A%84%E7%94%B7%E5%AD%90%E6%B1%89%E5%BF%99%E7%BA%BF%E5%B0%8F%E5%AD%A9%E9%9B%A8%E5%A4%A9%E9%9B%AA%E8%97%8Fmanyao-mix-2k25/",
    "title": "DJ‘KC｛九万字●跳楼机●座位●痴情的男子汉●忙线●小孩●雨天●雪藏●MANYAO MIX 2K25｝",
    "channel": "DJ KC | UNiTED V.i.P'G DJs",
    "duration": 6830,
    "duration_formatted": "1h 53m",
    "url": "https://www.mixcloud.com/ng-kianchee/djkc-%E4%B9%9D%E4%B8%87%E5%AD%97%E8%B7%B3%E6%A5%BC%E6%9C%BA%E5%BA%A7%E4%BD%8D%E7%97%B4%E6%83%85%E7%9A%84%E7%94%B7%E5%AD%90%E6%B1%89%E5%BF%99%E7%BA%BF%E5%B0%8F%E5%AD%A9%E9%9B%A8%E5%A4%A9%E9%9B%AA%E8%97%8Fmanyao-mix-2k25/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/0/d/0/9b21-1d33-4f7a-9a12-32a3916b7925"
  },
  {
    "id": "/jarty-ye/momo%E5%B0%88%E5%B1%AC%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B2%E0%B8%99-pure-x-%E6%B3%B0%E5%9C%8B%E6%AD%8C-wip-wup-x-dior%E5%A4%A7%E7%A9%8E_-_%E6%84%9B%E8%87%AA%E5%B7%B1%E6%9B%B4%E6%B7%B1rmx-2o2o-private-manyao-nonstop-by-djye/",
    "key": "/jarty-ye/momo%E5%B0%88%E5%B1%AC%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B2%E0%B8%99-pure-x-%E6%B3%B0%E5%9C%8B%E6%AD%8C-wip-wup-x-dior%E5%A4%A7%E7%A9%8E_-_%E6%84%9B%E8%87%AA%E5%B7%B1%E6%9B%B4%E6%B7%B1rmx-2o2o-private-manyao-nonstop-by-djye/",
    "title": "『MoMo^專屬』【ทางผาน - Pure X 泰國歌 - Wip Wup X Dior大穎_-_愛自己更深】Rmx 2o2o Private ManYao NonStop By Dj'Ye",
    "channel": "DJ'YE",
    "duration": 4757,
    "duration_formatted": "1h 19m",
    "url": "https://www.mixcloud.com/jarty-ye/momo%E5%B0%88%E5%B1%AC%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B2%E0%B8%99-pure-x-%E6%B3%B0%E5%9C%8B%E6%AD%8C-wip-wup-x-dior%E5%A4%A7%E7%A9%8E_-_%E6%84%9B%E8%87%AA%E5%B7%B1%E6%9B%B4%E6%B7%B1rmx-2o2o-private-manyao-nonstop-by-djye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/9/c/5/3/2f28-d41a-49b5-be75-a275520fc13b"
  },
  {
    "id": "/%E6%9D%83%E6%AD%A3/just-for-dara%E5%BD%93%E4%BD%A0%E5%8E%BB%E6%91%87%E5%A4%B4%E4%B8%80%E5%AE%9A%E8%A6%81%E5%B8%A6%E4%B8%8A%E8%BF%99%E9%A6%96%E6%AD%8C-%E4%B8%8D%E7%84%B6%E4%BD%A0%E4%BC%9A%E5%90%8E%E6%82%94-kik-never-stop-bro-2o19-private-manyao-by-dj-xiiaozen/",
    "key": "/%E6%9D%83%E6%AD%A3/just-for-dara%E5%BD%93%E4%BD%A0%E5%8E%BB%E6%91%87%E5%A4%B4%E4%B8%80%E5%AE%9A%E8%A6%81%E5%B8%A6%E4%B8%8A%E8%BF%99%E9%A6%96%E6%AD%8C-%E4%B8%8D%E7%84%B6%E4%BD%A0%E4%BC%9A%E5%90%8E%E6%82%94-kik-never-stop-bro-2o19-private-manyao-by-dj-xiiaozen/",
    "title": "【Just For Dora】当你去摇头一定要带上这首歌!! 不然你会后悔!! Kik Never Stop Bro!! 【2o19 Private ManYao BY DJ XiiaoZen】",
    "channel": "DJ XiiaoZen|UNiTED V.i.P'G DJs",
    "duration": 4286,
    "duration_formatted": "1h 11m",
    "url": "https://www.mixcloud.com/%E6%9D%83%E6%AD%A3/just-for-dara%E5%BD%93%E4%BD%A0%E5%8E%BB%E6%91%87%E5%A4%B4%E4%B8%80%E5%AE%9A%E8%A6%81%E5%B8%A6%E4%B8%8A%E8%BF%99%E9%A6%96%E6%AD%8C-%E4%B8%8D%E7%84%B6%E4%BD%A0%E4%BC%9A%E5%90%8E%E6%82%94-kik-never-stop-bro-2o19-private-manyao-by-dj-xiiaozen/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/3/0/f/f/02fa-8631-47df-8205-e2a77ae08765"
  },
  {
    "id": "/jarty-ye/%E5%90%83%E6%AF%92%E6%91%87%E7%9A%87%E5%9F%8E%E7%A5%9E%E4%BB%99%E6%B0%B4%E9%87%91%E5%AE%AE%E7%A5%9E%E4%BB%99%E6%B0%B4rmx-2k18-private-nonstop-manyao-just-for-youbao-by-dj-ye/",
    "key": "/jarty-ye/%E5%90%83%E6%AF%92%E6%91%87%E7%9A%87%E5%9F%8E%E7%A5%9E%E4%BB%99%E6%B0%B4%E9%87%91%E5%AE%AE%E7%A5%9E%E4%BB%99%E6%B0%B4rmx-2k18-private-nonstop-manyao-just-for-youbao-by-dj-ye/",
    "title": "吃毒摇●皇城神仙水●金宮神仙水RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR YouBao BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 4284,
    "duration_formatted": "1h 11m",
    "url": "https://www.mixcloud.com/jarty-ye/%E5%90%83%E6%AF%92%E6%91%87%E7%9A%87%E5%9F%8E%E7%A5%9E%E4%BB%99%E6%B0%B4%E9%87%91%E5%AE%AE%E7%A5%9E%E4%BB%99%E6%B0%B4rmx-2k18-private-nonstop-manyao-just-for-youbao-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/b/2/d/f596-cc90-4728-b8b8-d5e671cfce7c"
  },
  {
    "id": "/myklean/myk-manyao-10/",
    "key": "/myklean/myk-manyao-10/",
    "title": "MYK Manyao 10",
    "channel": "Myk Lean",
    "duration": 4312,
    "duration_formatted": "1h 11m",
    "url": "https://www.mixcloud.com/myklean/myk-manyao-10/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/9/f/9/0/686d-ada3-40e4-9910-b9ecc9cab169.jpg"
  },
  {
    "id": "/diana-miko2/%E6%88%91%E5%A4%AA%E7%AC%A8-%E6%9B%BE%E7%BB%8F%E4%BD%A0%E8%AF%B4-%E4%B8%8D%E5%A6%82-2021-chinese-manyao-dj-tiger/",
    "key": "/diana-miko2/%E6%88%91%E5%A4%AA%E7%AC%A8-%E6%9B%BE%E7%BB%8F%E4%BD%A0%E8%AF%B4-%E4%B8%8D%E5%A6%82-2021-chinese-manyao-dj-tiger/",
    "title": "『 我太笨• 曾经你说 • 不如 』  ②⓪②①  CHINESE MANYAO DJ TIGER",
    "channel": "『DJ TIGER Y'P'DJs』",
    "duration": 4059,
    "duration_formatted": "1h 7m",
    "url": "https://www.mixcloud.com/diana-miko2/%E6%88%91%E5%A4%AA%E7%AC%A8-%E6%9B%BE%E7%BB%8F%E4%BD%A0%E8%AF%B4-%E4%B8%8D%E5%A6%82-2021-chinese-manyao-dj-tiger/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/2/5/f/7/19d3-fc6d-4069-b6f2-e5fe28b9fee5"
  },
  {
    "id": "/leonardboy/%E5%91%A8%E6%9D%B0%E4%BC%A6%E6%AD%8C%E6%9B%B2%E7%89%B9%E4%B8%93%E8%BE%91%E4%B8%83%E9%87%8C%E9%A6%99-x-%E7%8F%8A%E7%91%9A%E6%B5%B7-x-%E5%AE%89%E9%9D%99-x-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97-2k20-nonstop-manyao-private-customisation-by-dj-leonard/",
    "key": "/leonardboy/%E5%91%A8%E6%9D%B0%E4%BC%A6%E6%AD%8C%E6%9B%B2%E7%89%B9%E4%B8%93%E8%BE%91%E4%B8%83%E9%87%8C%E9%A6%99-x-%E7%8F%8A%E7%91%9A%E6%B5%B7-x-%E5%AE%89%E9%9D%99-x-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97-2k20-nonstop-manyao-private-customisation-by-dj-leonard/",
    "title": "《周杰伦歌曲特专辑》七里香 x 珊瑚海 x 安静 x 一路向北 2K20 NONSTOP MANYAO PRIVATE CUSTOMISATION BY DJ LEONARD",
    "channel": "DJ Leonard|UNiTED V.i.P’G DJs",
    "duration": 6165,
    "duration_formatted": "1h 42m",
    "url": "https://www.mixcloud.com/leonardboy/%E5%91%A8%E6%9D%B0%E4%BC%A6%E6%AD%8C%E6%9B%B2%E7%89%B9%E4%B8%93%E8%BE%91%E4%B8%83%E9%87%8C%E9%A6%99-x-%E7%8F%8A%E7%91%9A%E6%B5%B7-x-%E5%AE%89%E9%9D%99-x-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97-2k20-nonstop-manyao-private-customisation-by-dj-leonard/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/2/a/3/9/d934-6353-48ab-b8d5-dbe25b3aa151"
  },
  {
    "id": "/%E6%9D%83%E6%AD%A3/blah-blah-blah%E6%96%B0faded%E4%BD%A9%E5%A5%87%E5%90%B9%E5%8F%A3%E5%93%A8hand-clap-2k18-rmx-manyao-for-kai-wen/",
    "key": "/%E6%9D%83%E6%AD%A3/blah-blah-blah%E6%96%B0faded%E4%BD%A9%E5%A5%87%E5%90%B9%E5%8F%A3%E5%93%A8hand-clap-2k18-rmx-manyao-for-kai-wen/",
    "title": "Blah Blah Blah●新Faded●佩奇吹口哨●Hand Clap 2K18 RMX MANYAO FOR Kai Wen",
    "channel": "DJ XiiaoZen|UNiTED V.i.P'G DJs",
    "duration": 3605,
    "duration_formatted": "1h 0m",
    "url": "https://www.mixcloud.com/%E6%9D%83%E6%AD%A3/blah-blah-blah%E6%96%B0faded%E4%BD%A9%E5%A5%87%E5%90%B9%E5%8F%A3%E5%93%A8hand-clap-2k18-rmx-manyao-for-kai-wen/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/0/a/2/1/99b6-cb20-40e2-8919-4d5851c649e7"
  },
  {
    "id": "/jarty-ye/%E6%91%A9%E6%89%98%E6%90%96ftgucci-prada%E7%95%A2%E7%AB%9F%E6%B7%B1%E6%84%9B%E9%81%8E%E7%A9%BA%E7%A9%BA%E5%A6%82%E4%B9%9Frmx-2k18-private-nonstop-manyao-just-for-%E5%95%8A%E5%B8%83-by-dj-ye/",
    "key": "/jarty-ye/%E6%91%A9%E6%89%98%E6%90%96ftgucci-prada%E7%95%A2%E7%AB%9F%E6%B7%B1%E6%84%9B%E9%81%8E%E7%A9%BA%E7%A9%BA%E5%A6%82%E4%B9%9Frmx-2k18-private-nonstop-manyao-just-for-%E5%95%8A%E5%B8%83-by-dj-ye/",
    "title": "摩托搖FT.Gucci Prada●畢竟深愛過●空空如也RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR 啊布 BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 14012,
    "duration_formatted": "3h 53m",
    "url": "https://www.mixcloud.com/jarty-ye/%E6%91%A9%E6%89%98%E6%90%96ftgucci-prada%E7%95%A2%E7%AB%9F%E6%B7%B1%E6%84%9B%E9%81%8E%E7%A9%BA%E7%A9%BA%E5%A6%82%E4%B9%9Frmx-2k18-private-nonstop-manyao-just-for-%E5%95%8A%E5%B8%83-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/4/d/2/5/b131-8aff-4dda-a066-75f3dc6b1623"
  },
  {
    "id": "/leonardboy/dj-leonard%E7%BB%BF%E8%89%B2-x-%E8%AF%B4%E4%B8%80%E5%8F%A5%E4%B8%8D%E8%B5%B0%E4%BA%86-x-%E5%A4%9A%E6%83%B3%E7%88%B1%E4%BD%A0-x-%E6%B5%AA%E5%AD%90%E5%9B%9E%E5%A4%B4-2k19-private-nonstop-manyao-remix-just-for-jiaying/",
    "key": "/leonardboy/dj-leonard%E7%BB%BF%E8%89%B2-x-%E8%AF%B4%E4%B8%80%E5%8F%A5%E4%B8%8D%E8%B5%B0%E4%BA%86-x-%E5%A4%9A%E6%83%B3%E7%88%B1%E4%BD%A0-x-%E6%B5%AA%E5%AD%90%E5%9B%9E%E5%A4%B4-2k19-private-nonstop-manyao-remix-just-for-jiaying/",
    "title": "【DJ Leonard】绿色 x 说一句不走了 x 多想爱你 x 浪子回头 2k19 Private NonStop ManYao Remix Just For Jiaying",
    "channel": "DJ Leonard|UNiTED V.i.P’G DJs",
    "duration": 3600,
    "duration_formatted": "1h 0m",
    "url": "https://www.mixcloud.com/leonardboy/dj-leonard%E7%BB%BF%E8%89%B2-x-%E8%AF%B4%E4%B8%80%E5%8F%A5%E4%B8%8D%E8%B5%B0%E4%BA%86-x-%E5%A4%9A%E6%83%B3%E7%88%B1%E4%BD%A0-x-%E6%B5%AA%E5%AD%90%E5%9B%9E%E5%A4%B4-2k19-private-nonstop-manyao-remix-just-for-jiaying/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/f/f/a/c/4814-59b9-4d97-82fd-0e64e9cba58d"
  },
  {
    "id": "/jarty-ye/80000%E7%97%85%E8%AE%8A%E6%88%91%E6%98%AF%E7%9C%9F%E7%9A%84%E6%84%9B%E4%B8%8A%E4%BD%A0-rmx-2k18-private-nonstop-manyao-just-for-jian%CA%8F%CA%8F-by-dj-ye/",
    "key": "/jarty-ye/80000%E7%97%85%E8%AE%8A%E6%88%91%E6%98%AF%E7%9C%9F%E7%9A%84%E6%84%9B%E4%B8%8A%E4%BD%A0-rmx-2k18-private-nonstop-manyao-just-for-jian%CA%8F%CA%8F-by-dj-ye/",
    "title": "80000✘病變✘我是真的愛上你 RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR JIAN&ʏʏ BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 4642,
    "duration_formatted": "1h 17m",
    "url": "https://www.mixcloud.com/jarty-ye/80000%E7%97%85%E8%AE%8A%E6%88%91%E6%98%AF%E7%9C%9F%E7%9A%84%E6%84%9B%E4%B8%8A%E4%BD%A0-rmx-2k18-private-nonstop-manyao-just-for-jian%CA%8F%CA%8F-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/c/b/e/8/2b0b-3a52-474e-ac09-392744280b7c"
  },
  {
    "id": "/jarty-ye/%E6%84%9B%E6%B2%B39420%E4%BD%A0%E7%9E%9E%E6%88%91%E7%9E%9Ermx-2k18-private-nonstop-manyao-just-for-singapore-by-dj-ye/",
    "key": "/jarty-ye/%E6%84%9B%E6%B2%B39420%E4%BD%A0%E7%9E%9E%E6%88%91%E7%9E%9Ermx-2k18-private-nonstop-manyao-just-for-singapore-by-dj-ye/",
    "title": "愛河●9420●你瞞我瞞RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR Singapore BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 8319,
    "duration_formatted": "2h 18m",
    "url": "https://www.mixcloud.com/jarty-ye/%E6%84%9B%E6%B2%B39420%E4%BD%A0%E7%9E%9E%E6%88%91%E7%9E%9Ermx-2k18-private-nonstop-manyao-just-for-singapore-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/0/3/c/3/0496-638b-4a74-bda1-78d5d0e8f248"
  },
  {
    "id": "/jarty-ye/imma-be-a-raver%E3%83%A1%E6%9D%8E%E6%A6%AE%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E7%82%BA%E3%83%A1%E4%BB%BB%E7%84%B6-%E6%B6%BC%E5%9F%8Eremix-2o18-private-nonstop-manyao-just-for-%E5%B0%8F%E8%BF%AA%E5%A6%B9-by-djye/",
    "key": "/jarty-ye/imma-be-a-raver%E3%83%A1%E6%9D%8E%E6%A6%AE%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E7%82%BA%E3%83%A1%E4%BB%BB%E7%84%B6-%E6%B6%BC%E5%9F%8Eremix-2o18-private-nonstop-manyao-just-for-%E5%B0%8F%E8%BF%AA%E5%A6%B9-by-djye/",
    "title": "『Imma Be A Raverメ李榮浩 - 年少有為メ任然 - 涼城』ReMix 2o18 Private NonStop ManYao Just For 小迪妹 By DJ'YE",
    "channel": "DJ'YE",
    "duration": 4051,
    "duration_formatted": "1h 7m",
    "url": "https://www.mixcloud.com/jarty-ye/imma-be-a-raver%E3%83%A1%E6%9D%8E%E6%A6%AE%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E7%82%BA%E3%83%A1%E4%BB%BB%E7%84%B6-%E6%B6%BC%E5%9F%8Eremix-2o18-private-nonstop-manyao-just-for-%E5%B0%8F%E8%BF%AA%E5%A6%B9-by-djye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/profile/9/c/9/a/c2a4-144f-45d2-b631-cc7c9d10a06b"
  },
  {
    "id": "/%E9%BB%84%E5%BB%BA%E8%81%AA/%E4%BD%9B%E7%B3%BB%E5%B0%91%E5%A5%B3%E8%A1%8C%E6%98%9F%E7%A6%BB%E4%BA%BA%E6%84%81-manyao-nonstop-rmx-2k18-by-deejay-jc-for-hq-%E5%B0%8F%E5%8F%AF%E7%88%B1/",
    "key": "/%E9%BB%84%E5%BB%BA%E8%81%AA/%E4%BD%9B%E7%B3%BB%E5%B0%91%E5%A5%B3%E8%A1%8C%E6%98%9F%E7%A6%BB%E4%BA%BA%E6%84%81-manyao-nonstop-rmx-2k18-by-deejay-jc-for-hq-%E5%B0%8F%E5%8F%AF%E7%88%B1/",
    "title": "佛系少女❤行星❤离人愁 Manyao Nonstop Rmx 2k18 By Deejay JC For HQ 小可爱",
    "channel": "Jian Cong (M Techno/manyao)",
    "duration": 4009,
    "duration_formatted": "1h 6m",
    "url": "https://www.mixcloud.com/%E9%BB%84%E5%BB%BA%E8%81%AA/%E4%BD%9B%E7%B3%BB%E5%B0%91%E5%A5%B3%E8%A1%8C%E6%98%9F%E7%A6%BB%E4%BA%BA%E6%84%81-manyao-nonstop-rmx-2k18-by-deejay-jc-for-hq-%E5%B0%8F%E5%8F%AF%E7%88%B1/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/4/6/e/b/3862-e57c-4fed-9f2c-efa7bcd45677"
  },
  {
    "id": "/kent-soh2/%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%96%9C%E6%AC%A2-x-%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF-x-%E5%BD%92%E8%BF%98%E4%B8%96%E7%95%8C%E7%BB%99%E4%BD%A0-x-%E8%BF%99%E8%AF%A5%E6%AD%BB%E7%9A%84%E7%88%B1-x-%E7%88%B1%E8%BF%87%E4%BD%A0%E8%BF%99%E4%BB%B6%E4%BA%8B-rmx-2k18-manyao-nonstop-for-jjjh/",
    "key": "/kent-soh2/%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%96%9C%E6%AC%A2-x-%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF-x-%E5%BD%92%E8%BF%98%E4%B8%96%E7%95%8C%E7%BB%99%E4%BD%A0-x-%E8%BF%99%E8%AF%A5%E6%AD%BB%E7%9A%84%E7%88%B1-x-%E7%88%B1%E8%BF%87%E4%BD%A0%E8%BF%99%E4%BB%B6%E4%BA%8B-rmx-2k18-manyao-nonstop-for-jjjh/",
    "title": "不仅仅是喜欢 X 有何不可 X 归还世界给你 X 这该死的爱 X 爱过你这件事 RMX 2K18 Manyao Nonstop For JJ@JH Vol.3",
    "channel": "Dj K",
    "duration": 3840,
    "duration_formatted": "1h 4m",
    "url": "https://www.mixcloud.com/kent-soh2/%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%96%9C%E6%AC%A2-x-%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF-x-%E5%BD%92%E8%BF%98%E4%B8%96%E7%95%8C%E7%BB%99%E4%BD%A0-x-%E8%BF%99%E8%AF%A5%E6%AD%BB%E7%9A%84%E7%88%B1-x-%E7%88%B1%E8%BF%87%E4%BD%A0%E8%BF%99%E4%BB%B6%E4%BA%8B-rmx-2k18-manyao-nonstop-for-jjjh/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/6/0/e/f/a3ed-3fc3-45cd-b19e-290b9e32d063"
  },
  {
    "id": "/ng-kianchee/djkc%E7%9C%8B%E7%9D%80%E6%88%91%E7%9A%84%E7%9C%BC%E7%9D%9B%E8%AF%B4%E6%9C%89%E4%B8%80%E7%A7%8D%E9%81%97%E6%86%BE%E5%8F%AB%E6%88%91%E4%BB%AC%E6%88%91%E4%BC%9A%E5%A5%BD%E5%A5%BD%E7%9A%84%E4%B8%80%E5%8D%83%E5%B9%B4%E4%BB%A5%E5%90%8Emanyao-mix-2k25/",
    "key": "/ng-kianchee/djkc%E7%9C%8B%E7%9D%80%E6%88%91%E7%9A%84%E7%9C%BC%E7%9D%9B%E8%AF%B4%E6%9C%89%E4%B8%80%E7%A7%8D%E9%81%97%E6%86%BE%E5%8F%AB%E6%88%91%E4%BB%AC%E6%88%91%E4%BC%9A%E5%A5%BD%E5%A5%BD%E7%9A%84%E4%B8%80%E5%8D%83%E5%B9%B4%E4%BB%A5%E5%90%8Emanyao-mix-2k25/",
    "title": "DJ‘KC｛看着我的眼睛说●有一种遗憾叫我们●我会好好的●一千年以后●MANYAO MIX 2K25｝",
    "channel": "DJ KC | UNiTED V.i.P'G DJs",
    "duration": 7379,
    "duration_formatted": "2h 2m",
    "url": "https://www.mixcloud.com/ng-kianchee/djkc%E7%9C%8B%E7%9D%80%E6%88%91%E7%9A%84%E7%9C%BC%E7%9D%9B%E8%AF%B4%E6%9C%89%E4%B8%80%E7%A7%8D%E9%81%97%E6%86%BE%E5%8F%AB%E6%88%91%E4%BB%AC%E6%88%91%E4%BC%9A%E5%A5%BD%E5%A5%BD%E7%9A%84%E4%B8%80%E5%8D%83%E5%B9%B4%E4%BB%A5%E5%90%8Emanyao-mix-2k25/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/c/6/3/7992-2de4-4d64-b956-65cac959f6e7"
  },
  {
    "id": "/jarty-ye/%E7%97%85%E5%8F%98%E4%BD%A0%E8%A6%81%E5%B9%B8%E7%A6%8F%E8%A7%A3%E8%8D%AF-rmx-2k18-private-nonstop-manyao-just-for-jackie-by-dj-ye/",
    "key": "/jarty-ye/%E7%97%85%E5%8F%98%E4%BD%A0%E8%A6%81%E5%B9%B8%E7%A6%8F%E8%A7%A3%E8%8D%AF-rmx-2k18-private-nonstop-manyao-just-for-jackie-by-dj-ye/",
    "title": "病变✘你要幸福✘解药 RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR JACKIE BY DJ Ye",
    "channel": "DJ'YE",
    "duration": 9053,
    "duration_formatted": "2h 30m",
    "url": "https://www.mixcloud.com/jarty-ye/%E7%97%85%E5%8F%98%E4%BD%A0%E8%A6%81%E5%B9%B8%E7%A6%8F%E8%A7%A3%E8%8D%AF-rmx-2k18-private-nonstop-manyao-just-for-jackie-by-dj-ye/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/f/0/7/8/87b1-c6e9-4436-b19b-965efa4407e3"
  },
  {
    "id": "/kent-soh2/%E7%BA%B8%E7%9F%AD%E6%83%85%E9%95%BF%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%96%9C%E6%AC%A2%E4%BD%A0%E4%B8%8D%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%88%B1%E4%BD%A0%E4%B8%A4%E4%B8%AA%E6%88%91%E4%BB%AC%E6%9C%80%E7%BE%8E%E7%9A%84%E6%9C%9F%E5%BE%85-rmx-2k18-nonstop-manyao-for-jj-vol2/",
    "key": "/kent-soh2/%E7%BA%B8%E7%9F%AD%E6%83%85%E9%95%BF%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%96%9C%E6%AC%A2%E4%BD%A0%E4%B8%8D%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%88%B1%E4%BD%A0%E4%B8%A4%E4%B8%AA%E6%88%91%E4%BB%AC%E6%9C%80%E7%BE%8E%E7%9A%84%E6%9C%9F%E5%BE%85-rmx-2k18-nonstop-manyao-for-jj-vol2/",
    "title": "纸短情长✖️不仅仅是喜欢你✖️不可能不爱你✖️两个我们✖️最美的期待 RMX 2K18 Nonstop Manyao For JJ Vol.2",
    "channel": "Dj K",
    "duration": 4008,
    "duration_formatted": "1h 6m",
    "url": "https://www.mixcloud.com/kent-soh2/%E7%BA%B8%E7%9F%AD%E6%83%85%E9%95%BF%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%96%9C%E6%AC%A2%E4%BD%A0%E4%B8%8D%E5%8F%AF%E8%83%BD%E4%B8%8D%E7%88%B1%E4%BD%A0%E4%B8%A4%E4%B8%AA%E6%88%91%E4%BB%AC%E6%9C%80%E7%BE%8E%E7%9A%84%E6%9C%9F%E5%BE%85-rmx-2k18-nonstop-manyao-for-jj-vol2/",
    "artwork": "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/8/4/d/1/042a-e993-4d0c-a4f4-2ebc07303907"
  }
];

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*"
  };
}

function formatDuration(seconds) {
  if (!seconds) return "1h+";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h} hrs`;
  }
  return `${m}m`;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders()
  });
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = parseInt(url.searchParams.get("count") || "25", 10);
  const minDurationSec = parseInt(url.searchParams.get("min_duration") || "3600", 10);
  let q = url.searchParams.get("q");

  if (!q) {
    q = MANYAO_MIX_QUERIES[Math.floor(Math.random() * MANYAO_MIX_QUERIES.length)];
  }

  let tracks = [];

  try {
    const mcUrl = `https://api.mixcloud.com/search/?q=${encodeURIComponent(q)}&type=cloudcast`;
    const res = await fetch(mcUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    });

    if (res.ok) {
      const data = await res.json();
      const items = data.data || [];
      for (const item of items) {
        const durSec = item.audio_length || 0;
        if (durSec >= minDurationSec && item.key) {
          const pictures = item.pictures || {};
          const artwork = pictures.large || pictures.medium || "";
          tracks.push({
            id: item.key,
            key: item.key,
            title: item.name || "Manyao Cloudcast",
            channel: item.user?.name || "Mixcloud DJ",
            duration: durSec,
            duration_formatted: formatDuration(durSec),
            url: item.url || `https://www.mixcloud.com${item.key}`,
            artwork: artwork
          });
        }
      }
    }
  } catch (err) {
    console.error("Mixcloud search edge error:", err);
  }

  // If no live results found, use curated >1hr fallback mixes
  if (tracks.length === 0) {
    tracks = [...FALLBACK_MIXCLOUD_MIXES];
  }

  const results = shuffle(tracks).slice(0, count);

  return new Response(JSON.stringify({
    platform: "mixcloud",
    query: q,
    min_duration: minDurationSec,
    count: results.length,
    tracks: results
  }), {
    status: 200,
    headers: corsHeaders()
  });
}
