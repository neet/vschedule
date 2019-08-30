/**
 * This data is borrowed from wikiwiki.jp/nijisanji
 * https://bit.ly/2ZxLFlg
 */
const MITO_TSUKINO = '32';
const HIMAWARI_HONMA = '34';
const RIN_SHIZUKA = '11';
const KAEDE_HIGUCHI = '38';
const YUIKA_SHIINA = '37';
const SAKU_SASAKI = '10';
const UTAKO_SUZUKA = '51';
const ROA_YUZUKI = '63';
const KUZUHA = '8';
const ALICE_MONONOBE = '3';
const SISTER_CLAIRE = '15';
const MIKOTO_RINDOU = '45';
const RYUSHEN = '46';
const LIZE_HELESTA = '72';
const KANAE = '7';
const ERA_OTOGIBARA = '68';
const BELMOND_BANDERAS = '20';
const MIREI_GUNDO = '62';
const ANGE_KATRINA = '70';
const CHIHIRO_YUKI = '17';
const RION_TAKAMIYA = '58';
const LULU_SUZUHARA = '73';
const ELU = '14';
const KAZAKI_MORINAKA = '36';
const TOYA_KENMOCHI = '23';
const DOLA = '19';
const CHITOSE_KUDO = '61';
const KIZUKU_YASHIRO = '43';
const ICHIGO_USHIMI = '27';
const TOKO_INUI = '71';
const MUGI_IENAGA = '9';
const JOE_RIKIICHI = '16';
const MEIJI_WARABEDA = '60';
const MOIRA = '2';
const DEBIDEBI_DEBIRU = '18';
const KEISUKE_MAIMOTO = '47';
const CHAIKA_HANABATAKE = '48';
const ARS_ALMAL = '87';
const MAKAINO_RIRIMU = '56';
const SETSUNA = '54';
const HAYATO_KAGAMI = '84';
const YOUKO_AKABANE = '4';
const KAI_MAYUZUMI = '89';
const RIRI_YUHI = '12';
const KAKERU_YUMEOI = '26';
const FUYUKI_HAKASE = '85';
const KOU_UZUKI = '24';
const RENA_YORUMI = '86';
const RITSUKI_SAKURA = '35';
const SAYO_AMEMORI = '53';
const SHIBA_KUROI = '59';
const SHOICHI_KANDA = '44';
const EX_ALBIO = '79';
const AKI_SUZUYA = '13';
const MANAMI_AIZONO = '75';
const GAKU_FUSHIMI = '21';
const NUI_SOCIERE = '83';
const AKINA_SAEGUSA = '74';
const MARIN_HAYAMA = '82';
const CHIMA_MACHITA = '41';
const HAJIME_SHIBUYA = '40';
const TAMAKI_FUMINO = '30';
const KASUMI_IZUMO = '1';
const HARUKA_ONOMACHI = '64';
const MASARU_SUZUKI = '5';
const KYOKO_TODOROKI = '49';
const UIHA_AIBA = '88';
const CHINAMI_ACHIKITA = '50';
const GILZAREN_III = '6';
const MOMO_AZUCHI = '28';
const RINE_YAGURUMA = '42';
const SHIZUKU_TSUKIMI = '33';
const MIYAKO_SETO = '66';
const HINA_ASUKA = '55';
const AIR_HARUSAKI = '31';
const NARU_NARUSE = '29';

/*
const MAHIRO_YUKISHIRO = '76';
const LeviElipha = '78';
const TsumuguKataribe = '65';
const KokoroAmamiya = '91';
const EliConifer = '92';
const RatnaPetit = '90';
*/

const AZUMA_NAKAO = undefined;
const YUZU_HASSAKU = undefined;
const MORURU_YAMIYONO = undefined;
const UMIYASHANO_KAMI = undefined;
const TSUKASA_TENKAI = undefined;
const FAIRYS = undefined;

export const groups = [
  {
    name: 'JK組',
    ids: [MITO_TSUKINO, KAEDE_HIGUCHI, RIN_SHIZUKA],
  },
  {
    name: 'あくまどーじょー',
    ids: [DEBIDEBI_DEBIRU, ROA_YUZUKI],
  },
  {
    name: '悪夢組',
    ids: [DEBIDEBI_DEBIRU, JOE_RIKIICHI],
  },
  {
    name: 'アズゆず',
    ids: [AZUMA_NAKAO, YUZU_HASSAKU],
  },
  {
    name: 'aho',
    ids: [AKINA_SAEGUSA, ERA_OTOGIBARA, TOKO_INUI],
  },
  {
    name: '雨森久遠',
    ids: [SAYO_AMEMORI, CHITOSE_KUDO],
  },
  {
    name: 'アリストロベリー',
    ids: [ICHIGO_USHIMI, ALICE_MONONOBE],
  },
  {
    name: 'ありめいじす',
    ids: [ALICE_MONONOBE, MEIJI_WARABEDA],
  },
  {
    name: 'あん・で・とこ',
    ids: [DEBIDEBI_DEBIRU, TOKO_INUI, ANGE_KATRINA],
  },
  {
    name: 'いずもるる',
    ids: [MORURU_YAMIYONO, KASUMI_IZUMO],
  },
  {
    name: 'いちガク',
    ids: [ICHIGO_USHIMI, GAKU_FUSHIMI],
  },
  {
    name: 'いちひま',
    ids: [ICHIGO_USHIMI, HIMAWARI_HONMA],
  },
  {
    name: '1期生出身',
    ids: [
      MITO_TSUKINO,
      CHIHIRO_YUKI,
      ELU,
      KAEDE_HIGUCHI,
      RIN_SHIZUKA,
      HAJIME_SHIBUYA,
      AKI_SUZUYA,
      MOIRA,
    ],
  },
  {
    name: 'うーちー',
    ids: [CHIHIRO_YUKI, UTAKO_SUZUKA],
  },
  {
    name: 'うさちゃんクラブwithB',
    ids: [SHOICHI_KANDA, AIR_HARUSAKI, MIREI_GUNDO, ROA_YUZUKI],
  },
  {
    name: 'うたかざ',
    ids: [UTAKO_SUZUKA, KAZAKI_MORINAKA],
  },
  {
    name: 'うたみこ',
    ids: [UTAKO_SUZUKA, MIKOTO_RINDOU],
  },
  {
    name: 'うたみこバネ卍',
    ids: [UTAKO_SUZUKA, YOUKO_AKABANE, SETSUNA, MIKOTO_RINDOU],
  },
  {
    name: 'ATM',
    ids: [ALICE_MONONOBE, TOYA_KENMOCHI, KAZAKI_MORINAKA],
  },
  {
    name: 'エクレア',
    ids: [ELU, SISTER_CLAIRE],
  },
  {
    name: 'エビ仙',
    ids: [RYUSHEN, EX_ALBIO],
  },
  {
    name: 'エビチリ',
    ids: [AKINA_SAEGUSA, EX_ALBIO],
  },
  {
    name: 'ERRors',
    ids: [ELU, RIRI_YUHI, RYUSHEN],
  },
  {
    name: 'えるかざガク',
    ids: [ELU, GAKU_FUSHIMI, KAZAKI_MORINAKA],
  },
  {
    name: 'OTN組',
    ids: [AZUMA_NAKAO, CHAIKA_HANABATAKE, KIZUKU_YASHIRO],
  },
  {
    name: 'おしぃりぃ',
    ids: [MAKAINO_RIRIMU, YUIKA_SHIINA],
  },
  {
    name: 'おしぃりぃまわり',
    ids: [HIMAWARI_HONMA, MAKAINO_RIRIMU, YUIKA_SHIINA],
  },
  {
    name: 'おっさんゲームス',
    ids: [KIZUKU_YASHIRO, KEISUKE_MAIMOTO],
  },
  {
    name: '漢組(初代)',
    ids: [HAJIME_SHIBUYA, AKI_SUZUYA],
  },
  {
    name: '漢組',
    ids: [
      HAJIME_SHIBUYA,
      AKI_SUZUYA,
      GAKU_FUSHIMI,
      GILZAREN_III,
      TOYA_KENMOCHI,
    ],
  },
  {
    name: 'おなえどし組',
    ids: [KASUMI_IZUMO, MASARU_SUZUKI, KOU_UZUKI],
  },
  {
    name: 'おののみれい',
    ids: [MIREI_GUNDO, HARUKA_ONOMACHI],
  },
  {
    name: 'おりコウ',
    ids: [MAKAINO_RIRIMU, KOU_UZUKI],
  },
  {
    name: '女の嫌なところ',
    ids: [SAKU_SASAKI, YUIKA_SHIINA, MIREI_GUNDO, ERA_OTOGIBARA],
  },
  {
    name: '解散GIG',
    ids: [YOUKO_AKABANE, SAKU_SASAKI, YUIKA_SHIINA, RYUSHEN],
  },
  {
    name: '楓と美兎',
    ids: [MITO_TSUKINO, KAEDE_HIGUCHI],
  },
  {
    name: 'かえる',
    ids: [ELU, KAEDE_HIGUCHI],
  },
  {
    name: 'ガチ屑農家',
    ids: [MAKAINO_RIRIMU, YUIKA_SHIINA, CHAIKA_HANABATAKE, KEISUKE_MAIMOTO],
  },
  {
    name: '叶え葉',
    ids: [KANAE, YOUKO_AKABANE],
  },
  {
    name: 'かなしいくず',
    ids: [KANAE, YUIKA_SHIINA, KUZUHA],
  },
  {
    name: 'かなしいな',
    ids: [KANAE, YUIKA_SHIINA],
  },
  {
    name: 'かなふぇあ',
    ids: [KANAE, FAIRYS],
  },
  {
    name: 'かなめいじー',
    ids: [KANAE, MEIJI_WARABEDA],
  },
  {
    name: 'がぶりえら',
    ids: [MEIJI_WARABEDA, ERA_OTOGIBARA],
  },
  {
    name: 'ギバライカ',
    ids: [CHAIKA_HANABATAKE, ERA_OTOGIBARA],
  },
  {
    name: 'くさおしぃりぃ',
    ids: [SAKU_SASAKI, MAKAINO_RIRIMU, KUZUHA, YUIKA_SHIINA],
  },
  {
    name: '葛神社',
    ids: [KUZUHA, KIZUKU_YASHIRO, SHOICHI_KANDA],
  },
  {
    name: 'くずばねおしぃりぃ',
    ids: [YOUKO_AKABANE, MAKAINO_RIRIMU, KUZUHA, YUIKA_SHIINA],
  },
  {
    name: 'くずンボ',
    ids: [KUZUHA, RITSUKI_SAKURA],
  },
  {
    name: 'くそざこGaming',
    ids: [KOU_UZUKI, RION_TAKAMIYA, BELMOND_BANDERAS],
  },
  // {
  //   name: 'くまもっさん',
  //   ids: [HIMAWARI_HONMA, KUZUHA],
  // },
  {
    name: '海月',
    ids: [UMIYASHANO_KAMI, RITSUKI_SAKURA],
  },
  {
    name: 'グリーンルージュ',
    ids: [CHAIKA_HANABATAKE, JOE_RIKIICHI],
  },
  {
    name: 'cresc.',
    ids: [DOLA, SISTER_CLAIRE, RYUSHEN],
  },
  {
    name: '黒ノ火廻',
    ids: [KANAE, HIMAWARI_HONMA, KUZUHA],
  },
  {
    name: 'ChroNoiR',
    ids: [KANAE, KUZUHA],
  },
  {
    name: 'ぐんかん',
    ids: [SHOICHI_KANDA, MIREI_GUNDO],
  },
  {
    name: '月下美人',
    ids: [YOUKO_AKABANE, YUIKA_SHIINA, MIKOTO_RINDOU],
  },
  {
    name: 'こあくまん',
    ids: [MAKAINO_RIRIMU, ROA_YUZUKI],
  },
  {
    name: '紅白アホ合戦',
    ids: [MEIJI_WARABEDA, CHITOSE_KUDO],
  },
  {
    name: '黒夢町',
    ids: [CHIMA_MACHITA, KAKERU_YUMEOI, SHIBA_KUROI],
  },
  {
    name: 'サイコ組',
    ids: [CHIHIRO_YUKI, ELU],
  },
  {
    name: 'さくゆい',
    ids: [SAKU_SASAKI, YUIKA_SHIINA],
  },
  {
    name: '三者面団',
    ids: [BELMOND_BANDERAS, MIREI_GUNDO, ROA_YUZUKI],
  },
  {
    name: 'さんばか',
    ids: [TOKO_INUI, ANGE_KATRINA, LIZE_HELESTA],
  },
  {
    name: 'シージ部',
    ids: [
      YUIKA_SHIINA,
      KANAE,
      KUZUHA,
      SHIZUKU_TSUKIMI,
      ANGE_KATRINA,
      RENA_YORUMI,
    ],
  },
  {
    name: 'JS組',
    ids: [CHIHIRO_YUKI, ICHIGO_USHIMI, KAZAKI_MORINAKA],
  },
  {
    name: 'JK組',
    ids: [MITO_TSUKINO, KAEDE_HIGUCHI, RIN_SHIZUKA],
  },
  {
    name: 'JCグミ',
    ids: [KASUMI_IZUMO, MOMO_AZUCHI, YUZU_HASSAKU],
  },
  {
    name: 'しかばねぱんだ',
    ids: [YOUKO_AKABANE, RYUSHEN],
  },
  {
    name: '渋谷大ガク',
    ids: [HAJIME_SHIBUYA, GAKU_FUSHIMI],
  },
  // {
  //   name: '囚人組',
  //   ids: [HAJIME_SHIBUYA, KANAE, KUZUHA, TSUKASA_TENKAI, FAIRYS],
  // },
  {
    name: '十人十色',
    ids: [
      SAKU_SASAKI,
      MAKAINO_RIRIMU,
      YUIKA_SHIINA,
      RION_TAKAMIYA,
      MIKOTO_RINDOU,
      CHITOSE_KUDO,
      MIREI_GUNDO,
      ROA_YUZUKI,
      ANGE_KATRINA,
      LIZE_HELESTA,
    ],
  },
  {
    name: '女子校花畑',
    ids: [YUIKA_SHIINA, CHAIKA_HANABATAKE, KOU_UZUKI, JOE_RIKIICHI],
  },
  {
    name: 'シリンソウ',
    ids: [KANAE, YOUKO_AKABANE, HIMAWARI_HONMA, KUZUHA],
  },
  {
    name: '深夜三傑RKS',
    ids: [RIN_SHIZUKA, HAJIME_SHIBUYA, KANAE],
  },
  {
    name: 'すとろべあ',
    ids: [ICHIGO_USHIMI, KAZAKI_MORINAKA],
  },
  {
    name: 'ストロベル',
    ids: [ICHIGO_USHIMI, BELMOND_BANDERAS],
  },
  {
    name: 'SMC組',
    ids: [FUYUKI_HAKASE, HAYATO_KAGAMI, RENA_YORUMI],
  },
  // {
  //   name: 'すもも幼稚園',
  //   ids: [
  //     ICHIGO_USHIMI,
  //     SAKU_SASAKI,
  //     MORURU_YAMIYONO,
  //     HIMAWARI_HONMA,
  //     MAKAINO_RIRIMU,
  //   ],
  // },
  // {
  //   name: 'だいさんじ杯',
  //   ids: [
  //     HAJIME_SHIBUYA,
  //     KANAE,
  //     MAKAINO_RIRIMU,
  //     KUZUHA,
  //     YUIKA_SHIINA,
  //     CHAIKA_HANABATAKE,
  //     KOU_UZUKI,
  //     KEISUKE_MAIMOTO,
  //     TSUKASA_TENKAI,
  //   ],
  // },
  {
    name: '鷹匠',
    ids: [RION_TAKAMIYA, JOE_RIKIICHI],
  },
  {
    name: 'ダブルスリーブ',
    ids: [KIZUKU_YASHIRO, HAYATO_KAGAMI],
  },
  {
    name: 'ダレパンダ',
    ids: [SAKU_SASAKI, BELMOND_BANDERAS],
  },
  {
    name: 'ちーかざちー',
    ids: [CHIHIRO_YUKI, KAZAKI_MORINAKA],
  },
  {
    name: 'ちーハジ',
    ids: [CHIHIRO_YUKI, HAJIME_SHIBUYA],
  },
  {
    name: '乳山',
    ids: [MARIN_HAYAMA, NUI_SOCIERE],
  },
  {
    name: 'ちとでびる',
    ids: [DEBIDEBI_DEBIRU, CHITOSE_KUDO],
  },
  {
    name: '血みどろコラボ',
    ids: [ICHIGO_USHIMI, GAKU_FUSHIMI, MORURU_YAMIYONO, HIMAWARI_HONMA, KUZUHA],
  },
  {
    name: 'ちりつも',
    ids: [MAKAINO_RIRIMU, CHITOSE_KUDO],
  },
  // {
  //   name: '角組',
  //   ids: [MORURU_YAMIYONO, DOLA, UMIYASHANO_KAMI],
  // },
  {
    name: 'でびリオン',
    ids: [RION_TAKAMIYA, DEBIDEBI_DEBIRU],
  },
  {
    name: 'でびるる',
    ids: [DEBIDEBI_DEBIRU, LULU_SUZUHARA],
  },
  {
    name: 'でろちー',
    ids: [CHIHIRO_YUKI, KAEDE_HIGUCHI],
  },
  {
    name: 'でろもい',
    ids: [KAEDE_HIGUCHI, MOIRA],
  },
  {
    name: 'でろもいちー',
    ids: [CHIHIRO_YUKI, KAEDE_HIGUCHI, MOIRA],
  },
  {
    name: 'デロロギ',
    ids: [KAEDE_HIGUCHI, GILZAREN_III, KYOKO_TODOROKI],
  },
  // {
  //   name: '天界卓',
  //   ids: [MOIRA, ICHIGO_USHIMI, MUGI_IENAGA, RION_TAKAMIYA, DEBIDEBI_DEBIRU],
  // },
  {
    name: 'Twinkle',
    ids: [
      MITO_TSUKINO,
      ALICE_MONONOBE,
      HIMAWARI_HONMA,
      SISTER_CLAIRE,
      MIKOTO_RINDOU,
    ],
  },
  {
    name: '刀かざ',
    ids: [TOYA_KENMOCHI, KAZAKI_MORINAKA],
  },
  {
    name: '童話組',
    ids: [ALICE_MONONOBE, MEIJI_WARABEDA, ERA_OTOGIBARA],
  },
  {
    name: '咎ノワール',
    ids: [GAKU_FUSHIMI, TOYA_KENMOCHI, KUZUHA, KANAE],
  },
  {
    name: '†咎人†',
    ids: [GAKU_FUSHIMI, TOYA_KENMOCHI],
  },
  {
    name: 'ド葛本社',
    ids: [HIMAWARI_HONMA, KUZUHA, DOLA, KIZUKU_YASHIRO],
  },
  {
    name: 'ド葛本社オルタ',
    ids: [
      AZUMA_NAKAO,
      CHAIKA_HANABATAKE,
      RYUSHEN,
      RION_TAKAMIYA,
      DEBIDEBI_DEBIRU,
      JOE_RIKIICHI,
    ],
  },
  {
    name: 'トライト',
    ids: [CHIHIRO_YUKI, ICHIGO_USHIMI, GAKU_FUSHIMI],
  },
  {
    name: 'ドラひま',
    ids: [HIMAWARI_HONMA, DOLA],
  },
  {
    name: 'トリガー',
    ids: [RIRI_YUHI, GAKU_FUSHIMI, TOYA_KENMOCHI],
  },
  {
    name: 'NZMN',
    ids: [KOU_UZUKI, AIR_HARUSAKI, NARU_NARUSE, KAKERU_YUMEOI],
  },
  {
    name: 'にじいろきゃんD→☆',
    ids: [
      RIRI_YUHI,
      KAZAKI_MORINAKA,
      SISTER_CLAIRE,
      CHAIKA_HANABATAKE,
      DEBIDEBI_DEBIRU,
      RITSUKI_SAKURA,
      CHINAMI_ACHIKITA,
    ],
  },
  {
    name: 'にじくじ7',
    ids: [
      MITO_TSUKINO,
      ELU,
      KAEDE_HIGUCHI,
      RIN_SHIZUKA,
      MUGI_IENAGA,
      ALICE_MONONOBE,
      TOYA_KENMOCHI,
    ],
  },
  {
    name: 'にじさんじGALS',
    ids: [KAEDE_HIGUCHI, SAKU_SASAKI, YUIKA_SHIINA, RION_TAKAMIYA],
  },
  {
    name: 'にじさんじ狂犬ズ',
    ids: [CHIMA_MACHITA, SHIBA_KUROI],
  },
  {
    name: 'にじさんじ矩形波倶楽部',
    ids: [MORURU_YAMIYONO, KIZUKU_YASHIRO],
  },
  {
    name: 'にじさんじスベ狼',
    ids: [
      CHAIKA_HANABATAKE,
      KIZUKU_YASHIRO,
      KEISUKE_MAIMOTO,
      JOE_RIKIICHI,
      KAKERU_YUMEOI,
      AKINA_SAEGUSA,
    ],
  },
  {
    name: 'にじさんじドリクラーズ',
    ids: [
      AZUMA_NAKAO,
      CHAIKA_HANABATAKE,
      KIZUKU_YASHIRO,
      KEISUKE_MAIMOTO,
      KAKERU_YUMEOI,
    ],
  },
  {
    name: 'にじさんじバスタード',
    ids: [KANAE, KUZUHA, KOU_UZUKI],
  },
  {
    name: 'にじさんじ Project Winter',
    ids: [
      KANAE,
      KUZUHA,
      SAKU_SASAKI,
      YUIKA_SHIINA,
      LIZE_HELESTA,
      ANGE_KATRINA,
      TSUKASA_TENKAI,
      FAIRYS,
    ],
  },
  {
    name: 'にじさんじポン酢',
    ids: [KASUMI_IZUMO, NUI_SOCIERE, FUYUKI_HAKASE, RENA_YORUMI],
  },
  {
    name: 'にじさんじマスコッツ',
    ids: [CHIMA_MACHITA, KAKERU_YUMEOI, MIREI_GUNDO, LIZE_HELESTA],
  },
  {
    name: 'にじさんじLOSERS',
    ids: [AZUMA_NAKAO, CHAIKA_HANABATAKE],
  },
  {
    name: 'にじさんじレジスタンス(2人)',
    ids: [YUIKA_SHIINA, CHAIKA_HANABATAKE],
  },
  {
    name: 'にじさんじレジスタンス(4人)',
    ids: [SAKU_SASAKI, YUIKA_SHIINA, CHAIKA_HANABATAKE, RYUSHEN],
  },
  {
    name: 'にじさんじレジスタンス',
    ids: [
      ALICE_MONONOBE,
      SAKU_SASAKI,
      YUIKA_SHIINA,
      CHAIKA_HANABATAKE,
      MOMO_AZUCHI,
      RYUSHEN,
    ],
  },
  {
    name: 'にじロック',
    ids: [
      KYOKO_TODOROKI,
      RYUSHEN,
      SAYO_AMEMORI,
      JOE_RIKIICHI,
      KAKERU_YUMEOI,
      AKINA_SAEGUSA,
      HAYATO_KAGAMI,
    ],
  },
  {
    name: 'にきさんきゲーマーズ',
    ids: [
      SAKU_SASAKI,
      HIMAWARI_HONMA,
      MORURU_YAMIYONO,
      MAKAINO_RIRIMU,
      KUZUHA,
      SETSUNA,
      YUIKA_SHIINA,
    ],
  },
  {
    name: 'N₠V₠R ₠NDs',
    ids: [KYOKO_TODOROKI, KOU_UZUKI, KEISUKE_MAIMOTO],
  },
  {
    name: 'はぁと組💙',
    ids: [CHIHIRO_YUKI, ALICE_MONONOBE],
  },
  {
    name: 'BACK STAGEs',
    ids: [KYOKO_TODOROKI, MOMO_AZUCHI, YUZU_HASSAKU, KOU_UZUKI],
  },
  // {
  //   name: '発色オタク三銃士',
  //   ids: [AIR_HARUSAKI, HINA_ASUKA],
  // },
  {
    name: 'ハッピートリガー',
    ids: [MUGI_IENAGA, RIRI_YUHI, GAKU_FUSHIMI, TOYA_KENMOCHI],
  },
  {
    name: 'バトロワAチーム',
    ids: [
      MAKAINO_RIRIMU,
      KUZUHA,
      KYOKO_TODOROKI,
      KIZUKU_YASHIRO,
      KOU_UZUKI,
      KEISUKE_MAIMOTO,
      CHITOSE_KUDO,
    ],
  },
  {
    name: 'ばねおしぃりぃ',
    ids: [YOUKO_AKABANE, MAKAINO_RIRIMU, YUIKA_SHIINA],
  },
  {
    name: 'はるみや',
    ids: [HARUKA_ONOMACHI, MIYAKO_SETO],
  },
  {
    name: 'BGクラブ',
    ids: [MOIRA, UTAKO_SUZUKA, KAZAKI_MORINAKA],
  },
  {
    name: 'ひなちなちま',
    ids: [HINA_ASUKA, CHIMA_MACHITA, CHINAMI_ACHIKITA],
  },
  {
    name: 'ひまンボ',
    ids: [HIMAWARI_HONMA, RITSUKI_SAKURA],
  },
  {
    name: 'ヒモと財布',
    ids: [CHINAMI_ACHIKITA, RINE_YAGURUMA],
  },
  {
    name: 'pure♡palet',
    ids: [ALICE_MONONOBE, SISTER_CLAIRE],
  },
  {
    name: 'ひよこぱんつ',
    ids: [SAKU_SASAKI, LIZE_HELESTA],
  },
  // {
  //   name: 'Vtuber甲子園',
  //   ids: [YUIKA_SHIINA, KEISUKE_MAIMOTO, TSUKASA_TENKAI],
  // },
  // {
  //   name: 'V雪人狼',
  //   ids: [
  //     MITO_TSUKINO,
  //     KAEDE_HIGUCHI,
  //     TOYA_KENMOCHI,
  //     HIMAWARI_HONMA,
  //     ERA_OTOGIBARA,
  //   ],
  // },
  {
    name: '4FFFF',
    ids: [HIMAWARI_HONMA, DOLA, RION_TAKAMIYA, DEBIDEBI_DEBIRU],
  },
  {
    name: 'ふゆれな',
    ids: [RENA_YORUMI, FUYUKI_HAKASE],
  },
  {
    name: '白金魔法研究所',
    ids: [RION_TAKAMIYA, FUYUKI_HAKASE],
  },
  {
    name: '不良不死',
    ids: [RYUSHEN, CHITOSE_KUDO],
  },
  {
    name: 'ぷりずむりりっく！',
    ids: [ICHIGO_USHIMI, MUGI_IENAGA, CHIHIRO_YUKI],
  },
  {
    name: 'ぷりんず',
    ids: [CHIHIRO_YUKI, RITSUKI_SAKURA],
  },
  {
    name: 'ぶるーず',
    ids: [KAI_MAYUZUMI, ARS_ALMAL, UIHA_AIBA],
  },
  {
    name: 'Fragrance5',
    ids: [ELU, UTAKO_SUZUKA, RIRI_YUHI, HIMAWARI_HONMA, SISTER_CLAIRE],
  },
  {
    name: 'ブレスト軍',
    ids: [CHIHIRO_YUKI, ICHIGO_USHIMI],
  },
  {
    name: '紅ズワイガニ',
    ids: [AKINA_SAEGUSA, MANAMI_AIZONO],
  },
  {
    name: 'ヘブンガールズ',
    ids: [CHIHIRO_YUKI, MOIRA],
  },
  {
    name: '舞元力一',
    ids: [KEISUKE_MAIMOTO, JOE_RIKIICHI],
  },
  {
    name: 'まほすず',
    ids: [CHIHIRO_YUKI, AKI_SUZUYA],
  },
  {
    name: 'みかえる',
    ids: [MITO_TSUKINO, KAEDE_HIGUCHI, ELU],
  },
  {
    name: 'みこでび',
    ids: [MIKOTO_RINDOU, DEBIDEBI_DEBIRU],
  },
  {
    name: 'みそしる',
    ids: [HAJIME_SHIBUYA, GAKU_FUSHIMI, KANAE, KUZUHA],
  },
  {
    name: 'みれロア',
    ids: [MIREI_GUNDO, ROA_YUZUKI],
  },
  {
    name: 'むぎたま',
    ids: [MUGI_IENAGA, TAMAKI_FUMINO],
  },
  {
    name: 'メーブレストロベア',
    ids: [CHIHIRO_YUKI, KAEDE_HIGUCHI, ICHIGO_USHIMI, KAZAKI_MORINAKA],
  },
  {
    name: 'もぐっとゆず',
    ids: [MASARU_SUZUKI, YUZU_HASSAKU],
  },
  {
    name: 'もちがえる',
    ids: [CHIHIRO_YUKI, ELU, KAEDE_HIGUCHI, MOIRA],
  },
  {
    name: '桃色冷蔵庫',
    ids: [ICHIGO_USHIMI, RIRI_YUHI],
  },
  {
    name: 'もやしば',
    ids: [KAKERU_YUMEOI, SHIBA_KUROI],
  },
  {
    name: 'もるひま',
    ids: [MORURU_YAMIYONO, HIMAWARI_HONMA],
  },
  {
    name: 'ヤンキー組《楓刀京明千葛》',
    ids: [
      KAEDE_HIGUCHI,
      TOYA_KENMOCHI,
      KYOKO_TODOROKI,
      AKINA_SAEGUSA,
      CHITOSE_KUDO,
      KUZUHA,
    ],
  },
  {
    name: 'ゆうやみ',
    ids: [CHIHIRO_YUKI, MORURU_YAMIYONO],
  },
  {
    name: 'ゆずでび',
    ids: [YUZU_HASSAKU, DEBIDEBI_DEBIRU],
  },
  {
    name: '楽陽',
    ids: [RIRI_YUHI, GAKU_FUSHIMI],
  },
  {
    name: 'ラタトゥイユ焼鮭',
    ids: [MIREI_GUNDO, MARIN_HAYAMA],
  },
  {
    name: 'リゼアン',
    ids: [ANGE_KATRINA, LIZE_HELESTA],
  },
  {
    name: 'りむみゃあ',
    ids: [MAKAINO_RIRIMU, RION_TAKAMIYA],
  },
  {
    name: 'りりぃろーず',
    ids: [RION_TAKAMIYA, LIZE_HELESTA],
  },
  {
    name: 'リリかざ',
    ids: [RIRI_YUHI, KAZAKI_MORINAKA],
  },
  {
    name: 'RRR',
    ids: [RION_TAKAMIYA, MIKOTO_RINDOU, JOE_RIKIICHI],
  },
  {
    name: 'りんかえW',
    ids: [KAEDE_HIGUCHI, RIN_SHIZUKA],
  },
  // {
  //   name: 'ルーザーキングス',
  //   ids: [MAKAINO_RIRIMU, KUZUHA, KOU_UZUKI],
  // },
  {
    name: 'le jouet',
    ids: [RYUSHEN, KAKERU_YUMEOI, HAYATO_KAGAMI],
  },
  {
    name: 'ロリ組',
    ids: [CHIHIRO_YUKI, ICHIGO_USHIMI, ALICE_MONONOBE, KAZAKI_MORINAKA],
  },
  // {
  //   name: 'LOL部',
  //   ids: [YUIKA_SHIINA, RION_TAKAMIYA, DEBIDEBI_DEBIRU],
  // },
];
