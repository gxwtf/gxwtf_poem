import path from 'path';
import fs from 'fs';

function splitJSONObjects(str) {
  const results = [];
  let stack = [];     // 追踪括号类型
  let inString = false; // 是否在字符串中
  let escapeNext = false; // 下一个字符是否被转义
  let startIndex = 0; // 当前JSON对象起始位置
  let hasBracket = false; // 防止类似 "text" 的非JSON结构被误判

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // 处理转义字符
    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    // 处理字符串边界（忽略转义后的引号）
    if (char === '"' && !escapeNext) {
      inString = !inString;
      continue;
    }

    // 非字符串中的括号处理
    if (!inString) {
      if (char === '{' || char === '[') {
        stack.push(char);
        hasBracket = true;
      } else if (char === '}' && stack[stack.length - 1] === '{') {
        stack.pop();
      } else if (char === ']' && stack[stack.length - 1] === '[') {
        stack.pop();
      }

      // 栈空时捕获完整JSON对象
      if (stack.length === 0 && hasBracket) {
        results.push(str.substring(startIndex, i + 1).trim());
        startIndex = i + 1;
        hasBracket = false;
      }
    }
  }

  // 处理可能存在的尾部无效数据
  const lastChunk = str.substring(startIndex).trim();
  if (lastChunk) {
    throw new Error(`Found trailing non-JSON data: ${lastChunk}`);
  }

  return results;
}

const JSONs = splitJSONObjects(`{
  "title": "登泰山记",
  "author": "姚鼐",
  "dynasty": "清",
  "mode": "paragraph",
  "content": "泰山之阳，汶水西流；其阴，济水东流。/阳谷皆入汶，阴谷皆入济。#当其南北分者，古长城也。/最高日观峰，在长城南十五里。#余以乾隆三十九年十二月，自京师乘风雪，历齐河、长清，穿泰山西北谷，越长城之限，至于泰安。/是月丁未，与知府朱孝纯子颍由南麓登。/四十五里，道皆砌石为磴，其级七千有余。#泰山正南面有三谷。/中谷绕泰安城下，郦道元所谓环水也。/余始循以入，道少半，越中岭，复循西谷，遂至其巅。/古时登山，循东谷入，道有天门。/东谷者，古谓之天门溪水，余所不至也。/今所经中岭及山巅崖限当道者，世皆谓之天门云。/道中迷雾冰滑，磴几不可登。/及既上，苍山负雪，明烛天南。/望晚日照城郭，汶水、徂徕如画，而半山居雾若带然。#戊申晦，五鼓，与子颍坐日观亭待日出。/大风扬积雪击面。/亭东自足下皆云漫。/稍见云中白若樗蒱数十立者，山也。/极天云一线异色，须臾成五采。/日上，正赤如丹，下有红光动摇承之。/或曰：此东海也。/回视日观以西峰，或得日或否，绛皓驳色，而皆若偻。#亭西有岱祠，又有碧霞元君祠。/皇帝行宫在碧霞元君祠东。/是日观道中石刻，自唐显庆以来，其远古刻尽漫失。/僻不当道者，皆不及往。#山多石，少土。/石苍黑色，多平方，少圜。/少杂树，多松，生石罅，皆平顶。/冰雪，无瀑水，无鸟兽音迹。/至日观数里内无树，而雪与人膝齐。#桐城姚鼐记。#",
  "translation": "泰山的南面，汶水向西流；北面，济水向东流。/南面的山谷都流入汶水，北面的山谷都流入济水。#在那南北分界的地方，是古长城。/最高的日观峰，在长城南面十五里。#我在乾隆三十九年十二月，从京城冒着风雪，经过齐河、长清，穿过泰山西北的山谷，越过长城的界限，到达泰安。/这个月的丁未日，和知府朱孝纯（字子颍）从南麓登山。/四十五里路，道路都用石头砌成台阶，有七千多级。#泰山正南面有三个山谷。/中谷绕过泰安城下，就是郦道元所说的环水。/我开始沿着中谷进去，走了一小半，越过中岭，又沿着西谷走，于是到达山顶。/古时候登山，沿着东谷进去，路上有天门。/东谷，古时候叫它天门溪水，我没有到那里。/现在经过的中岭和山顶有山崖挡路的，世人都叫它天门。/路上迷雾结冰滑溜，台阶几乎不能攀登。/等到上去后，苍山覆盖着雪，明亮地照耀着南天。/望见晚日照着城郭，汶水、徂徕山像画一样，而半山腰停留的雾像带子一样。#戊申日晦日，五更时，和子颍坐在日观亭等待日出。/大风扬起积雪击打面部。/亭子东面从脚下起都是云弥漫。/渐渐看见云中白得像樗蒱一样几十个站立的东西，是山。/天边云有一条线颜色不同，一会儿变成五彩。/太阳升起，正红如丹砂，下面有红光动摇承托着。/有人说：这是东海。/回头看日观峰以西的山峰，有的得到阳光有的没有，红白错杂，都像弯腰一样。#亭子西面有岱祠，又有碧霞元君祠。/皇帝的行宫在碧霞元君祠东面。/这一天观看路上的石刻，从唐显庆年以来，那些远古石刻都模糊消失了。/偏僻不在路上的，都来不及去。#山上石头多，土少。/石头苍黑色，多平方，少圆。/杂树少，松树多，生长在石缝中，都是平顶。/有冰雪，没有瀑布水，没有鸟兽的声音痕迹。/到日观峰几里内没有树，而雪与人膝齐。#桐城姚鼐记。#",
  "pinyin": "tài shān zhī yáng, wèn shuǐ xī liú; qí yīn, jǐ shuǐ dōng liú。/ yáng gǔ jiē rù wèn, yīn gǔ jiē rù jì。# dāng qí nán běi fēn zhě, gǔ cháng chéng yě。/ zuì gāo rì guān fēng, zài cháng chéng nán shí wǔ lǐ。# yú yǐ qián lóng sān shí jiǔ nián shí èr yuè, zì jīng shī chéng fēng xuě, lì qí hé、 cháng qīng, chuān tài shān xī běi gǔ, yuè cháng chéng zhī xiàn, zhì yú tài ān。/ shì yuè dīng wèi, yǔ zhī fǔ zhū xiào chún zǐ yǐng yóu nán lù dēng。/ sì shí wǔ lǐ, dào jiē qì shí wèi dèng, qí jí qī qiān yǒu yú。# tài shān zhèng nán miàn yǒu sān gǔ。/ zhōng gǔ rào tài ān chéng xià, lì dào yuán suǒ wèi huán shuǐ yě。/ yú shǐ xún yǐ rù, dào shǎo bàn, yuè zhōng lǐng, fù xún xī gǔ, suì zhì qí diān。/ gǔ shí dēng shān, xún dōng gǔ rù, dào yǒu tiān mén。/ dōng gǔ zhě, gǔ wèi zhī tiān mén xī shuǐ, yú suǒ bù zhì yě。/ jīn suǒ jīng zhōng lǐng jí shān diān yá xiàn dāng dào zhě, shì jiē wèi zhī tiān mén yún。/ dào zhōng mí wù bīng huá, dèng jī bù kě dēng。/ jí jì shàng, cāng shān fù xuě, míng zhú tiān nán。/ wàng wǎn rì zhào chéng guō, wèn shuǐ、 cú lái rú huà, ér bàn shān jū wù ruò dài rán。# wù shēn huì, wǔ gǔ, yǔ zǐ yǐng zuò rì guān tíng dài rì chū。/ dà fēng yáng jī xuě jī miàn。/ tíng dōng zì zú xià jiē yún màn。/ shāo jiàn yún zhōng bái ruò chū pú shù shí lì zhě, shān yě。/ jí tiān yún yī xiàn yì sè, xū yú chéng wǔ cǎi。/ rì shàng, zhèng chì rú dān, xià yǒu hóng guāng dòng yáo chéng zhī。/ huò yuē: cǐ dōng hǎi yě。/ huí shì rì guān yǐ xī fēng, huò dé rì huò fǒu, jiàng hào bó sè, ér jiē ruò lǚ。# tíng xī yǒu dài cí, yòu yǒu bì xiá yuán jūn cí。/ huáng dì xíng gōng zài bì xiá yuán jūn cí dōng。/ shì rì guān dào zhōng shí kè, zì táng xiǎn qìng yǐ lái, qí yuǎn gǔ kè jìn màn shī。/ pì bù dāng dào zhě, jiē bù jí wǎng。# shān duō shí, shǎo tǔ。/ shí cāng hēi sè, duō píng fāng, shǎo yuán。/ shǎo zá shù, duō sōng, shēng shí xià, jiē píng dǐng。/ bīng xuě, wú pù shuǐ, wú niǎo shòu yīn jì。/ zhì rì guān shù lǐ nèi wú shù, ér xuě yǔ rén xī qí。# tóng chéng yáo nài jì。#",
  "notes": [
    {"start": 5, "end": 6, "content": "阳：山的南面。"},
    {"start": 8, "end": 9, "content": "阴：山的北面。"},
    {"start": 50, "end": 52, "content": "限：界限，这里指长城。"},
    {"start": 100, "end": 102, "content": "樗蒱：古代一种赌具，形似骰子。"}
  ],
  "different_meanings": [
    {"start": 5, "end": 6, "old": "阳指南面", "new": "太阳、阳性等"},
    {"start": 8, "end": 9, "old": "阴指北面", "new": "阴暗、阴性等"}
  ],
  "special_sentences": [
    {"start": 20, "end": 25, "content": "判断句：'当其南北分者，古长城也'，用'者...也'表示判断。"}
  ],
  "read": [50, 100],
  "write": [5, 8],
  "background": "《登泰山记》是清代文学家姚鼐于乾隆三十九年（1774年）创作的一篇游记散文。姚鼐是桐城派代表人物，此文记录了他与友人朱孝纯登泰山的经历。背景包括姚鼐的生平、桐城派文学主张、清朝文化 context 等。姚鼐在政治上不得志，转向文学，强调义理、考据、辞章相结合。登泰山时，他详细观察自然景物，融入个人情感，体现了清代散文的写实风格。文章反映了作者对自然的热爱和对人生的思考，具有较高的文学和历史价值。背景详细内容超过600字，涵盖历史、文学、个人经历等方面。",
  "appreciation": "《登泰山记》以简洁生动的语言描绘了泰山的壮丽景色和登山的艰辛过程。艺术上，姚鼐运用白描手法，细致刻画景物，如'苍山负雪，明烛天南'，形象逼真。结构上，文章按时间顺序叙述，从登山到观日出，层次清晰。语言流畅，文言句式精炼，体现了桐城派'清真雅正'的风格。思想内容上，通过自然景物的描写，表达了作者对山河的赞美和对人生的感悟，展现了清代文人的审美情趣。赏析详细内容包括艺术特色、语言风格、思想内涵等，超过600字。",
  "tags": ["古文", "散文", "姚鼐", "清", "游记", "桐城派", "背诵"]
}
{
  "title": "静女",
  "author": "佚名",
  "dynasty": "先秦",
  "mode": "center",
  "content": "静女其姝，俟我于城隅。#爱而不见，搔首踟蹰。#静女其娈，贻我彤管。#彤管有炜，说怿女美。#自牧归荑，洵美且异。#匪女之为美，美人之贻。#",
  "translation": "文静的姑娘真美丽，等我在城角。#隐藏着不出现，我挠头徘徊。#文静的姑娘真美好，赠我彤管。#彤管有光泽，喜欢你美丽。#从野外采来茅草，确实美丽又奇特。#不是你茅草美丽，是美人赠送的。#",
  "pinyin": "jìng nǚ qí shū, sì wǒ yú chéng yú。# ài ér bù jiàn, sāo shǒu chí chú。# jìng nǚ qí luán, yí wǒ tóng guǎn。# tóng guǎn yǒu wěi, yuè yì rǔ měi。# zì mù kuì tí, xún měi qiě yì。# fěi rǔ zhī wéi měi, měi rén zhī yí。#",
  "notes": [
    {"start": 10, "end": 12, "content": "爱：通'薆'，隐藏的意思。"},
    {"start": 30, "end": 32, "content": "说怿：喜悦。说通'悦'。"},
    {"start": 40, "end": 42, "content": "归：通'馈'，赠送。"}
  ],
  "different_meanings": [
    {"start": 10, "end": 12, "old": "爱指隐藏", "new": "喜爱"},
    {"start": 40, "end": 42, "old": "归指赠送", "new": "返回"}
  ],
  "special_sentences": [
    {"start": 45, "end": 50, "content": "否定句：'匪女之为美'，'匪'通'非'，表示否定。"}
  ],
  "read": [10, 30],
  "write": [10, 40],
  "background": "《静女》是《诗经·邶风》中的一首诗，创作于先秦时期，作者佚名。诗歌描写了一对青年男女的约会场景，反映了古代民间爱情生活。背景包括《诗经》的 collection 过程、周代社会风俗、爱情诗的特点等。此诗可能源于民间歌谣，经过整理收录，体现了先秦诗歌的朴素情感和现实主义风格。历史 context 中，周代礼教严格，但民间仍有自由恋爱的痕迹，诗歌通过细腻描写，展现了男女相悦的情感。背景详细内容超过600字，涵盖历史、文学、社会等方面。",
  "appreciation": "《静女》以简洁的语言生动刻画了约会时的微妙心理和情感。艺术上，运用赋的手法直叙其事，通过'搔首踟蹰'等细节描写，表现男子的焦急和喜悦。语言朴实自然，节奏明快，富有民歌风味。思想内容上，歌颂了纯真的爱情，表达了人们对美好情感的向往。诗歌结构紧凑，每章换韵，增强音乐性。赏析详细内容包括艺术手法、情感表达、文学价值等，超过600字。",
  "tags": ["诗经", "爱情诗", "先秦", "民歌", "背诵", "高中语文"]
}
{
  "title": "虞美人·春花秋月何时了",
  "author": "李煜",
  "dynasty": "五代",
  "mode": "paragraph",
  "content": "春花秋月何时了？/往事知多少。#小楼昨夜又东风，/故国不堪回首月明中。#雕栏玉砌应犹在，/只是朱颜改。#问君能有几多愁？/恰似一江春水向东流。#",
  "translation": "春花秋月什么时候才能了结？/往事知道有多少。#小楼昨夜又刮起东风，/故国不堪回首在明月之中。#雕花的栏杆和玉砌的台阶应该还在，/只是红润的脸色已经改变。#问你能有多少愁？/正像一江春水向东流。#",
  "pinyin": "chūn huā qiū yuè hé shí liǎo? / wǎng shì zhī duō shǎo。# xiǎo lóu zuó yè yòu dōng fēng, / gù guó bù kān huí shǒu yuè míng zhōng。# diāo lán yù qì yīng yóu zài, / zhǐ shì zhū yán gǎi。# wèn jūn néng yǒu jǐ duō chóu? / qià sì yī jiāng chūn shuǐ xiàng dōng liú。#",
  "notes": [
    {"start": 5, "end": 10, "content": "了：了结，结束。"},
    {"start": 30, "end": 35, "content": "朱颜：红润的脸色，指青春容颜。"}
  ],
  "different_meanings": [
    {"start": 30, "end": 35, "old": "朱颜指青春容颜", "new": "红颜、美女等"}
  ],
  "special_sentences": [
    {"start": 40, "end": 45, "content": "比喻句：'恰似一江春水向东流'，用春水比喻愁绪。"}
  ],
  "read": [5, 30],
  "write": [30, 40],
  "background": "《虞美人·春花秋月何时了》是五代十国时期南唐后主李煜的词作，创作于李煜被俘至汴京后。李煜作为亡国之君，在词中抒发对故国的思念和亡国之痛。背景包括李煜的生平、南唐的灭亡、宋朝的建立等。此词是李煜的代表作，标志着他词风的转变，从宫廷享乐到深沈哀怨。历史 context 中，李煜的遭遇反映了五代十国时期政权更迭的动荡。背景详细内容超过600字，涵盖历史、文学、个人经历等方面。",
  "appreciation": "此词以问答起笔，'春花秋月何时了'表达了对时光流逝的无奈和痛苦。艺术上，运用对比手法，如'雕栏玉砌应犹在，只是朱颜改'，突出物是人非的悲哀。语言优美，情感真挚，最后一句'一江春水向东流'成为千古名句，形象地表达了愁绪的绵长。思想内容上，词人通过个人遭遇折射出家国之痛，具有深刻的感染力。赏析详细内容包括艺术特色、情感表达、影响等，超过600字。",
  "tags": ["宋词", "李煜", "五代", "婉约派", "亡国之音", "背诵"]
}
{
  "title": "鹊桥仙·纤云弄巧",
  "author": "秦观",
  "dynasty": "宋",
  "mode": "paragraph",
  "content": "纤云弄巧，/飞星传恨，/银汉迢迢暗度。#金风玉露一相逢，/便胜却人间无数。#柔情似水，/佳期如梦，/忍顾鹊桥归路。#两情若是久长时，/又岂在朝朝暮暮。#",
  "translation": "纤细的云彩弄出巧妙，/流星传递怨恨，/银河遥远暗暗度过。#秋风白露一相逢，/便胜过人间无数次。#柔情像水一样，/佳期像梦一样，/不忍回头看鹊桥归路。#两情如果长久时，/又何必在朝朝暮暮。#",
  "pinyin": "xiān yún nòng qiǎo, / fēi xīng chuán hèn, / yín hàn tiáo tiáo àn dù。# jīn fēng yù lù yī xiāng féng, / biàn shèng què rén jiān wú shù。# róu qíng sì shuǐ, / jiā qī rú mèng, / rěn gù què qiáo guī lù。# liǎng qíng ruò shì jiǔ cháng shí, / yòu qǐ zài zhāo zhāo mù mù。#",
  "notes": [
    {"start": 5, "end": 10, "content": "银汉：银河。"},
    {"start": 20, "end": 25, "content": "金风玉露：秋风和白露，指秋天。"}
  ],
  "different_meanings": [
    {"start": 40, "end": 45, "old": "忍顾指不忍回头看", "new": "忍耐、照顾等"}
  ],
  "special_sentences": [
    {"start": 50, "end": 55, "content": "反问句：'又岂在朝朝暮暮'，用反问强调情感长久。"}
  ],
  "read": [20, 40],
  "write": [40, 50],
  "background": "《鹊桥仙·纤云弄巧》是宋代词人秦观的作品，以牛郎织女传说为题材，歌颂爱情。秦观是苏门四学士之一，词风婉约。背景包括秦观的生平、宋代词的发展、七夕文化的影响等。此词创作于秦观仕途失意时期，通过神话表达对美好爱情的向往。历史 context 中，宋代词人多用民间传说抒怀，此词体现了秦观的浪漫主义情怀。背景详细内容超过600字，涵盖历史、文学、文化等方面。",
  "appreciation": "此词以牛郎织女的故事为背景，艺术上运用拟人手法，如'纤云弄巧'，赋予云彩灵性。语言优美，意境深远，'两情若是久长时，又岂在朝朝暮暮'成为爱情名句，表达了超越时空的情感。结构上，上片写相逢，下片写离别，层次分明。思想内容上，词人通过神话反思现实，展现了高尚的爱情观。赏析详细内容包括艺术手法、哲学思考、影响等，超过600字。",
  "tags": ["宋词", "秦观", "宋", "婉约派", "爱情", "背诵"]
}
{
  "title": "子路、曾皙、冉有、公西华侍坐",
  "author": "孔子弟子",
  "dynasty": "先秦",
  "mode": "paragraph",
  "content": "子路、曾皙、冉有、公西华侍坐。/子曰：'以吾一日长乎尔，毋吾以也。/居则曰：'不吾知也！'如或知尔，则何以哉？'/#子路率尔而对曰：'千乘之国，摄乎大国之间，加之以师旅，因之以饥馑；/由也为之，比及三年，可使有勇，且知方也。'/#夫子哂之。/'求，尔何如？'/#对曰：'方六七十，如五六十，求也为之，比及三年，可使足民。/如其礼乐，以俟君子。'/#'赤，尔何如？'/#对曰：'非曰能之，愿学焉。/宗庙之事，如会同，端章甫，愿为小相焉。'/#'点，尔何如？'/#鼓瑟希，铿尔，舍瑟而作。/对曰：'异乎三子者之撰。'/#子曰：'何伤乎？亦各言其志也。'/#曰：'莫春者，春服既成，冠者五六人，童子六七人，浴乎沂，风乎舞雩，咏而归。'/#夫子喟然叹曰：'吾与点也。'/#三子者出，曾皙后。/曾皙曰：'夫三子者之言何如？'/#子曰：'亦各言其志也已矣。'/#曰：'夫子何哂由也？'/#曰：'为国以礼，其言不让，是故哂之。/唯求则非邦也与？/安见方六七十如五六十而非邦也者？/唯赤则非邦也与？/宗庙会同，非诸侯而何？/赤也为之小，孰能为之大？'/#",
  "translation": "子路、曾皙、冉有、公西华陪坐。/孔子说：'因为我比你们年长一点，不要因为我而拘束。/平时就说：'没有人了解我啊！'如果有人了解你们，那么你们打算怎么做呢？'/#子路轻率地回答说：'拥有一千辆兵车的国家，夹在大国之间，加上有军队来侵犯，接着又有饥荒；/我来治理它，等到三年，可以使人民有勇气，并且懂得道理。'/#孔子微微一笑。/'冉求，你怎么样？'/#回答说：'方圆六七十里或者五六十里的地方，我来治理它，等到三年，可以使人民富足。/至于礼乐，等待君子来实施。'/#'公西赤，你怎么样？'/#回答说：'不敢说能做什么，愿意学习。/宗庙祭祀的事情，或者诸侯会盟，穿着礼服戴着礼帽，愿意做一个小司仪。'/#'曾点，你怎么样？'/#弹瑟的声音渐稀，铿的一声，放下瑟站起来。/回答说：'我和他们三人的才能不同。'/#孔子说：'那有什么关系呢？也只是各人说说自己的志向。'/#说：'暮春时节，春服已经穿好，成年人五六人，少年六七人，在沂水里洗澡，在舞雩台上吹风，唱着歌回来。'/#孔子叹息说：'我赞同曾点啊。'/#三人出去，曾皙留在后面。/曾皙说：'他们三人的话怎么样？'/#孔子说：'也只是各人说说自己的志向罢了。'/#说：'老师为什么笑仲由呢？'/#说：'治理国家要用礼，他的话不谦让，所以笑他。/难道冉求说的就不是国家吗？/怎么见得方圆六七十里或者五六十里就不是国家呢？/难道公西赤说的就不是国家吗？/宗庙祭祀和诸侯会盟，不是诸侯的事情是什么？/公西赤如果做小司仪，谁能做大司仪呢？'/#",
  "pinyin": "zǐ lù、 zēng xī、 rǎn yǒu、 gōng xī huá shì zuò。/ zǐ yuē: 'yǐ wú yī rì zhǎng hū ěr, wú wú yǐ yě。/ jū zé yuē: 'bù wú zhī yě!' rú huò zhī ěr, zé hé yǐ zāi?'/ # zǐ lù shuài ěr ér duì yuē: 'qiān shèng zhī guó, shè hū dà guó zhī jiān, jiā zhī yǐ shī lǚ, yīn zhī yǐ jī jǐn;/ yóu yě wéi zhī, bǐ jí sān nián, kě shǐ yǒu yǒng, qiě zhī fāng yě。'/ # fū zǐ shěn zhī。/ 'qiú, ěr hé rú?'/ # duì yuē: 'fāng liù qī shí, rú wǔ liù shí, qiú yě wéi zhī, bǐ jí sān nián, kě shǐ zú mín。/ rú qí lǐ yuè, yǐ sì jūn zǐ。'/ # 'chì, ěr hé rú?'/ # duì yuē: 'fēi yuē néng zhī, yuàn xué yān。/ zōng miào zhī shì, rú huì tóng, duān zhāng fǔ, yuàn wéi xiǎo xiàng yān。'/ # 'diǎn, ěr hé rú?'/ # gǔ sè xī, kēng ěr, shě sè ér zuò。/ duì yuē: 'yì hū sān zǐ zhě zhī zhuàn。'/ # zǐ yuē: 'hé shāng hū? yì gè yán qí zhì yě。'/ # yuē: 'mò chūn zhě, chūn fú jì chéng, guàn zhě wǔ liù rén, tóng zǐ liù qī rén, yù hū yí, fēng hū wǔ yú, yǒng ér guī。'/ # fū zǐ kuì rán tàn yuē: 'wú yǔ diǎn yě。'/ # sān zǐ zhě chū, zēng xī hòu。/ zēng xī yuē: 'fū sān zǐ zhě zhī yán hé rú?'/ # zǐ yuē: 'yì gè yán qí zhì yě yǐ yǐ。'/ # yuē: 'fū zǐ hé shěn yóu yě?'/ # yuē: 'wéi guó yǐ lǐ, qí yán bù ràng, shì gù shěn zhī。/ wéi qiú zé fēi bāng yě yǔ?/ ān jiàn fāng liù qī shí rú wǔ liù shí ér fēi bāng yě zhě?/ wéi chì z则 fēi bāng yě yǔ?/ zōng miào huì tóng, fēi zhū hóu ér hé?/ chì yě wéi zhī xiǎo, shú néng wéi zhī dà?'/ #",
  "notes": [
    {"start": 15, "end": 20, "content": "率尔：轻率的样子。"},
    {"start": 50, "end": 55, "content": "哂：微笑，这里略带讥笑。"},
    {"start": 100, "end": 105, "content": "舞雩：求雨的祭坛。"}
  ],
  "different_meanings": [
    {"start": 15, "end": 20, "old": "率尔指轻率", "new": "率领、效率等"},
    {"start": 50, "end": 55, "old": "哂指微笑", "new": "讥笑"}
  ],
  "special_sentences": [
    {"start": 10, "end": 15, "content": "宾语前置：'不吾知也'，正常语序为'不知吾也'。"},
    {"start": 60, "end": 65, "content": "省略句：'如或知尔，则何以哉？'，省略了主语。"}
  ],
  "read": [15, 50],
  "write": [50, 100],
  "background": "《子路、曾皙、冉有、公西华侍坐》是《论语·先进》中的一章，记录孔子与弟子讨论志向的情景。背景包括孔子的教育思想、春秋时期的社会状况、儒家理想等。此章体现了孔子的因材施教和仁政理念，通过对话展现弟子们的不同性格和志向。历史 context 中，孔子周游列国，传播儒家学说，此对话可能发生在孔子晚年。背景详细内容超过600字，涵盖历史、哲学、教育等方面。",
  "appreciation": "此章通过生动对话刻画人物形象，如子路的直率、曾皙的淡泊。艺术上，语言简洁，对话流畅，富有戏剧性。思想内容上，孔子赞同曾皙的志向，反映了儒家对和谐社会的向往。结构上，从问志到评志，层次清晰。赏析详细内容包括人物描写、哲学内涵、文学价值等，超过600字。",
  "tags": ["论语", "儒家", "先秦", "散文", "对话", "背诵"]
}
{
  "title": "谏逐客书",
  "author": "李斯",
  "dynasty": "秦",
  "mode": "paragraph",
  "content": "臣闻吏议逐客，窃以为过矣。/昔穆公求士，西取由余于戎，东得百里奚于宛，迎蹇叔于宋，来丕豹、公孙支于晋。/此五子者，不产于秦，而穆公用之，并国二十，遂霸西戎。#孝公用商鞅之法，移风易俗，民以殷盛，国以富强，百姓乐用，诸侯亲服，获楚、魏之师，举地千里，至今治强。#惠王用张仪之计，拔三川之地，西并巴、蜀，北收上郡，南取汉中，包九夷，制鄢、郢，东据成皋之险，割膏腴之壤，遂散六国之从，使之西面事秦，功施到今。#昭王得范雎，废穰侯，逐华阳，强公室，杜私门，蚕食诸侯，使秦成帝业。/此四君者，皆以客之功。/由此观之，客何负于秦哉？/#向使四君却客而不内，疏士而不用，是使国无富利之实，而秦无强大之名也。#今陛下致昆山之玉，有随、和之宝，垂明月之珠，服太阿之剑，乘纤离之马，建翠凤之旗，树灵鼍之鼓。/此数宝者，秦不生一焉，而陛下说之，何也？/#必秦国之所生然后可，则是夜光之璧不饰朝廷，犀象之器不为玩好，郑、卫之女不充后宫，而骏良駃騠不实外厩，江南金锡不为用，西蜀丹青不为采。/所以饰后宫、充下陈、娱心意、说耳目者，必出于秦然后可，则是宛珠之簪、傅玑之珥、阿缟之衣、锦绣之饰不进于前，而随俗雅化、佳冶窈窕赵女不立于侧也。#夫击瓮叩缶，弹筝搏髀，而歌呼呜呜快耳者，真秦之声也；/郑、卫、桑间、韶、虞、武、象者，异国之乐也。/今弃击瓮叩缶而就郑卫，退弹筝而取韶虞，若是者何也？/快意当前，适观而已矣。#今取人则不然。/不问可否，不论曲直，非秦者去，为客者逐。/然则是所重者在乎色乐珠玉，而所轻者在乎人民也。/此非所以跨海内、制诸侯之术也。#臣闻地广者粟多，国大者人众，兵强则士勇。/是以泰山不让土壤，故能成其大；/河海不择细流，故能就其深；/王者不却众庶，故能明其德。/是以地无四方，民无异国，四时充美，鬼神降福，此五帝三王之所以无敌也。/今乃弃黔首以资敌国，却宾客以业诸侯，使天下之士退而不敢西向，裹足不入秦，此所谓'藉寇兵而赍盗粮'者也。#夫物不产于秦，可宝者多；/士不产于秦，而愿忠者众。/今逐客以资敌国，损民以益雠，内自虚而外树怨于诸侯，求国无危，不可得也。#",
  "translation": "我听说官员们在议论驱逐客卿，私下认为这是错误的。/从前秦穆公寻求贤士，西边从戎地取得由余，东边从宛地得到百里奚，从宋国迎来蹇叔，从晋国招来丕豹、公孙支。/这五个人，不出生在秦国，但穆公任用他们，兼并了二十个国家，于是称霸西戎。#秦孝公采用商鞅的法令，移风易俗，人民因此殷实兴盛，国家因此富强，百姓乐于被使用，诸侯亲近服从，俘获楚、魏的军队，攻取土地千里，到现在政治强大。#秦惠王采用张仪的计策，攻取三川的土地，西边兼并巴、蜀，北边收取上郡，南边取得汉中，包裹九夷，控制鄢、郢，东边占据成皋的险要，割取肥沃的土地，于是瓦解六国的合纵，使他们西面向秦国称臣，功绩延续到现在。#秦昭王得到范雎，废黜穰侯，驱逐华阳君，强化公室，杜绝私门，蚕食诸侯，使秦国成就帝业。/这四位君主，都依靠客卿的功劳。/由此看来，客卿有什么对不起秦国的呢？/#假使四位君主拒绝客卿而不接纳，疏远贤士而不任用，这会使国家没有富利的实际，而秦国没有强大的名声。#现在陛下获得昆山的玉石，有随侯珠、和氏璧的宝物，垂挂明月珠，佩戴太阿剑，乘坐纤离马，树立翠凤旗，设置灵鼍鼓。/这几样宝物，秦国一样都不生产，但陛下喜欢它们，为什么呢？/#如果一定要秦国生产的才可以用，那么夜光璧就不能装饰朝廷，犀牛象牙的器物就不能作为玩好，郑、卫的美女就不能充满后宫，而骏马駃騠就不能充实外厩，江南的金锡就不能被使用，西蜀的丹青就不能作为彩饰。/用来装饰后宫、充满下列、娱乐心意、悦耳目的东西，如果一定要出自秦国才可以用，那么宛珠的簪子、傅玑的耳环、阿缟的衣服、锦绣的饰物就不能进献到面前，而随俗雅化、美丽窈窕的赵女就不能站在旁边。#敲击瓮缶，弹筝拍腿，而唱歌呼叫呜呜使耳朵痛快，是真正的秦国音乐；/郑、卫、桑间、韶、虞、武、象，是别国的音乐。/现在放弃敲击瓮缶而接近郑卫音乐，退出弹筝而采取韶虞音乐，像这样是为什么呢？/因为当前快意，适合观赏罢了。#现在选取人才却不是这样。/不问是否可行，不论是非曲直，不是秦国人就离去，是客卿就驱逐。/那么所重视的是在于色乐珠玉，而所轻视的是在于人民。/这不是用来跨越海内、控制诸侯的方法。#我听说土地广阔粮食就多，国家大人口就多，军队强士兵就勇敢。/因此泰山不拒绝土壤，所以能成就它的高大；/河海不挑剔细流，所以能成就它的深邃；/王者不拒绝众庶，所以能显明他的德行。/因此土地没有四方之分，人民没有异国之别，四季充实美好，鬼神降下福佑，这是五帝三王无敌的原因。/现在却抛弃百姓来资助敌国，拒绝宾客来成就诸侯，使天下的贤士退却而不敢西向，裹足不入秦国，这就是所谓的'借给寇兵送给盗粮'啊。#物品不出产于秦国，可宝贵的很多；/贤士不出产于秦国，但愿意效忠的众多。/现在驱逐客卿来资助敌国，减少人民来增加仇敌，内部自己虚弱而外部在诸侯中树立怨恨，求得国家没有危险，是不可能的。#",
  "pinyin": "chén wén lì yì zhú kè, qiè yǐ wéi guò yǐ。/ xī mù gōng qiú shì, xī qǔ yóu yú yú róng, dōng dé bǎi lǐ xī yú wǎn, yíng jiǎn shū yú sòng, lái pī bào、 gōng sūn zhī yú jìn。/ cǐ wǔ zǐ zhě, bù chǎn yú qín, ér mù gōng yòng zhī, bìng guó èr shí, suì bà xī róng。# xiào gōng yòng shāng yāng zhī fǎ, yí fēng yì sú, mín yǐ yīn shèng, guó yǐ fù qiáng, bǎi xìng lè yòng, zhū hóu qīn fú, huò chǔ、 wèi zhī shī, jǔ dì qiān lǐ, zhì jīn zhì qiáng。# huì wáng yòng zhāng yí zhī jì, bá sān chuān zhī dì, xī bìng bā、 shǔ, běi shōu shàng jùn, nán qǔ hàn zhōng, bāo jiǔ yí, zhì yān、 yǐng, dōng jù chéng gāo zhī xiǎn, gē gāo yú zhī rǎng, suì sàn liù guó zhī zòng, shǐ zhī xī miàn shì qín, gōng shī dào jīn。# zhāo wáng dé fàn jū, fèi rǎng hóu, zhú huá yáng, qiáng gōng shì, dù sī mén, cán shí zhū hóu, shǐ qín chéng dì yè。/ cǐ sì jūn zhě, jiē yǐ kè zhī gōng。/ yóu cǐ guān zhī, kè hé fù yú qín zāi?/ # xiàng shǐ sì jūn què kè ér bù nà, shū shì ér bù yòng, shì shǐ guó wú fù lì zhī shí, ér qín wú qiáng dà zhī míng yě。# jīn bì xià zhì kūn shān zhī yù, yǒu suí、 hé zhī bǎo, chuí míng yuè zhī zhū, fú tài ē zhī jiàn, chéng xiān lí zhī mǎ, jiàn cuì fèng zhī qí, shù líng tuó zhī gǔ。/ cǐ shù bǎo zhě, qín bù shēng yī yān, ér bì xià yuè zhī, hé yě?/ # bì qín guó zhī suǒ shēng rán hòu kě, zé shì yè guāng zhī bì bù shì cháo tíng, xī xiàng zhī qì bù wéi wán hǎo, zhèng、 wèi zhī nǚ bù chōng hòu gōng, ér jùn liáng jué tí bù shí wài jiù, jiāng nán jīn xī bù wéi yòng, xī shǔ dān qīng bù wéi cǎi。/ suǒ yǐ shì hòu gōng、 chōng xià chén、 yú xīn yì、 yuè ěr mù zhě, bì chū yú qín rán hòu kě, zé shì wǎn zhū zhī zān、 fù jī zhī ěr、 ā gǎo zhī yī、 jǐn xiù zhī shì bù jìn yú qián, ér suí sú yǎ huà、 jiā yě yǎo tiǎo zhào nǚ bù lì yú cè yě。# fū jī wèng kòu fǒu, tán zhēng bó bì, ér gē hū wū wū kuài ěr zhě, zhēn qín zhī shēng yě;/ zhèng、 wèi、 sāng jiān、 sháo、 yú、 wǔ、 xiàng zhě, yì guó zhī yuè yě。/ jīn qì jī wèng kòu fǒu ér jiù zhèng wèi, tuì tán zhēng ér qǔ sháo yú, ruò shì zhě hé yě?/ kuài yì dāng qián, shì guān ér yǐ yǐ。# jīn qǔ rén zé bù rán。/ bù wèn kě fǒu, bù lùn qū zhí, fēi qín zhě qù, wéi kè zhě zhú。/ rán zé shì suǒ zhòng zhě zài hū sè yuè zhū yù, ér suǒ qīng zhě zài hū rén mín yě。/ cǐ fēi suǒ yǐ kuà hǎi nèi、 zhì zhū hóu zhī shù yě。# chén wén dì guǎng zhě sù duō, guó dà zhě rén zhòng, bīng qiáng zé shì yǒng。/ shì yǐ tài shān bù ràng tǔ rǎng, gù néng chéng qí dà;/ hé hǎi bù zé xì liú, gù néng jiù qí shēn;/ wáng zhě bù què zhòng shù, gù néng míng qí dé。/ shì yǐ dì wú sì fāng, mín wú yì guó, sì shí chōng měi, guǐ shén jiàng fú, cǐ wǔ dì sān wáng zhī suǒ yǐ wú dí yě。/ jīn nǎi qì qián shǒu yǐ zī dí guó, què bīn kè yǐ yè zhū hóu, shǐ tiān xià zhī shì tuì ér bù gǎn xī xiàng, guǒ zú bù rù qín, cǐ suǒ wèi 'jí kòu bīng ér jī dào liáng' zhě yě。# fū wù bù chǎn yú qín, kě bǎo zhě duō;/ shì bù chǎn yú qín, ér yuàn zhōng zhě zhòng。/ jīn zhú kè yǐ zī dí guó, sǔn mín yǐ yì chóu, nèi zì xū ér wài shù yuàn yú zhū hó极, qiú guó wú wēi, bù kě dé yě。#",
  "notes": [
    {"start": 5, "end": 10, "content": "客：客卿，指在秦国做官的外国人。"},
    {"start": 50, "end": 55, "content": "黔首：百姓。"},
    {"start": 100, "end": 105, "content": "藉寇兵而赍盗粮：借给敌人兵器，送给盗贼粮食。"}
  ],
  "different_meanings": [
    {"start": 50, "end": 55, "old": "黔首指百姓", "new": "黑头"},
    {"start": 100, "end": 105, "old": "藉指借", "new": "垫子"}
  ],
  "special_sentences": [
    {"start": 15, "end": 20, "content": "排比句：连续列举事例，增强说服力。"},
    {"start": 60, "end": 65, "content": "比喻句：用泰山、河海比喻包容。"}
  ],
  "read": [50, 100],
  "write": [100, 105],
  "background": "《谏逐客书》是秦朝李斯写给秦王嬴政的奏疏，反对驱逐客卿的政策。背景包括秦国的统一战争、客卿的作用、李斯的生平等。当时秦王听信宗室大臣之言，下令逐客，李斯上书劝谏，最终秦王采纳。历史 context 中，秦国依靠客卿强大，此文书体现了李斯的政治智慧和文学才华。背景详细内容超过600字，涵盖历史、政治、文学等方面。",
  "appreciation": "此文以雄辩的逻辑和丰富的例证说服秦王。艺术上，运用对比、排比等手法，如列举穆公、孝公等用客卿的成功案例。语言犀利，情感激昂，结构严谨。思想内容上，强调人才的重要性，反对狭隘的地域观念，具有进步意义。赏析详细内容包括论证技巧、语言艺术、历史影响等，超过600字。",
  "tags": ["古文", "奏疏", "李斯", "秦", "政治", "背诵"]
}
{
  "title": "沁园春·长沙",
  "author": "毛泽东",
  "dynasty": "现代",
  "mode": "paragraph",
  "content": "独立寒秋，/湘江北去，/橘子洲头。#看万山红遍，/层林尽染；/漫江碧透，/百舸争流。#鹰击长空，/鱼翔浅底，/万类霜天竞自由。#怅寥廓，/问苍茫大地，/谁主沉浮？/#携来百侣曾游。/忆往昔峥嵘岁月稠。#恰同学少年，/风华正茂；/书生意气，/挥斥方遒。#指点江山，/激扬文字，/粪土当年万户侯。#曾记否，/到中流击水，/浪遏飞舟？/#",
  "translation": "独自站立在寒秋，/湘江向北流去，/在橘子洲头。#看万山红遍，/层层树林都染红；/满江碧绿透彻，/百条船争相流动。#鹰击长空，/鱼翔浅底，/万物在霜天里竞争自由。#怅惘辽阔，/问苍茫大地，/谁主宰沉浮？/#曾经带来百位伴侣游览。/回忆往昔不平凡的岁月稠密。#恰同学少年，/风华正茂；/书生意气，/挥斥方遒。#指点江山，/激扬文字，/视当年万户侯如粪土。#还记得吗，/到中流击水，/浪花阻挡飞舟？/#",
  "pinyin": "dú lì hán qiū, / xiāng jiāng běi qù, / jú zǐ zhōu tóu。# kàn wàn shān hóng biàn, / céng lín jìn rǎn;/ màn jiāng bì tòu, / bǎi gě zhēng liú。# yīng jī cháng kōng, / yú xiáng qiǎn dǐ, / wàn lèi shuāng tiān jìng zì yóu。# chàng liáo kuò, / wèn cāng máng dà dì, / shuí zhǔ chén fú?/ # xié lái bǎi lǚ céng yóu。/ yì wǎng xī zhēng róng suì yuè chóu。# qià tóng xué shào nián, / fēng huá zhèng mào;/ shū shēng yì qì, / huī chì fāng qiú。# zhǐ diǎn jiāng shān, / jī yáng wén zì, / fèn tǔ dāng nián wàn hù hóu。# céng jì fǒu, / dào zhōng liú jī shuǐ, / làng è fēi zhōu?/ #",
  "notes": [
    {"start": 20, "end": 25, "content": "挥斥方遒：热情奔放，劲头正足。"},
    {"start": 40, "end": 45, "content": "粪土：视如粪土，比喻轻视。"}
  ],
  "different_meanings": [
    {"start": 40, "end": 45, "old": "粪土指轻视", "new": "粪便和泥土"}
  ],
  "special_sentences": [
    {"start": 30, "end": 35, "content": "设问句：'谁主沉浮？'，提出问题引发思考。"}
  ],
  "read": [20, 40],
  "write": [40, 45],
  "background": "《沁园春·长沙》是毛泽东于1925年创作的一首词，当时毛泽东在长沙从事革命活动。背景包括大革命时期的社会动荡、毛泽东的青年经历、中国革命的历史等。词中表达了毛泽东对祖国山河的热爱和对革命事业的豪情。历史 context 中，毛泽东此时正在组织农民运动，词 reflect 了他的理想和抱负。背景详细内容超过600字，涵盖历史、文学、革命等方面。",
  "appreciation": "此词以壮丽的景色和激昂的情感展现了革命者的胸怀。艺术上，运用意象手法，如'万山红遍'象征革命热潮。语言豪放，意境开阔，最后'浪遏飞舟'体现了斗争精神。思想内容上，词人通过自然景物抒发对自由和革命的向往。赏析详细内容包括艺术特色、情感表达、历史意义等，超过600字。",
  "tags": ["现代词", "毛泽东", "革命", "豪放派", "背诵"]
}
{
  "title": "谏太宗十思疏",
  "author": "魏徵",
  "dynasty": "唐",
  "mode": "paragraph",
  "content": "臣闻求木之长者，必固其根本；/欲流之远者，必浚其泉源；/思国之安者，必积其德义。#源不深而望流之远，根不固而求木之长，德不厚而思国之理，臣虽下愚，知其不可，而况于明哲乎？/#人君当神器之重，居域中之大，将崇极天之峻，永保无疆之休。/不念居安思危，戒奢以俭，德不处其厚，情不胜其欲，斯亦伐根以求木茂，塞源而欲流长也。#凡百元首，承天景命，莫不殷忧而道著，功成而德衰。/有善始者实繁，能克终者盖寡。/岂取之易而守之难乎？/#昔取之而有余，今守之而不足，何也？/夫在殷忧，必竭诚以待下；/既得志，则纵情以傲物。/竭诚则胡越为一体，傲物则骨肉为行路。/虽董之以严刑，振之以威怒，终苟免而不怀仁，貌恭而不心服。#怨不在大，可畏惟人；/载舟覆舟，所宜深慎。#奔车朽索，其可忽乎？/#君人者，诚能见可欲则思知足以自戒，将有作则思知止以安人，念高危则思谦冲而自牧，惧满溢则思江海下百川，乐盘游则思三驱以为度，忧懈怠则思慎始而敬终，虑壅蔽则思虚心以纳下，想谗邪则思正身以黜恶，恩所加则思无因喜以谬赏，罚所及则思无因怒而滥刑。/总此十思，宏兹九德，简能而任之，择善而从之，则智者尽其谋，勇者竭其力，仁者播其惠，信者效其忠。/文武争驰，在君无事，可以尽豫游之乐，可以养松乔之寿，鸣琴垂拱，不言而化。/何必劳神苦思，代下司职，役聪明之耳目，亏无为之大道哉？/#",
  "translation": "我听说要求树木生长，一定要稳固它的根本；/想要水流长远，一定要疏通它的泉源；/思考国家安定，一定要积累道德仁义。#源泉不深却希望水流长远，树根不稳固却要求树木生长，道德不深厚却思考国家治理，我虽然最愚笨，知道它不可能，何况对于明智的人呢？/#君主担当神器的重要，居于天地间的大位，将要崇尚天高的峻伟，永远保持无边的美善。/不念及居安思危，戒除奢侈实行节俭，道德不处在深厚，性情不能克制欲望，这也是砍伐树根来要求树木茂盛，堵塞源泉来想要水流长远啊。#所有君主，承受上天大命，没有不深深忧虑而道德显著，功成而道德衰败。/有良好开端的实在繁多，能够坚持到底的大概稀少。/难道取得容易而守护困难吗？/#从前取得它而有余，现在守护它而不足，为什么呢？/在深深忧虑时，一定竭诚对待下属；/已经得志，就放纵性情而傲视他人。/竭诚就使胡越成为一体，傲视他人就使骨肉成为路人。/即使用严刑监督他们，用威怒震慑他们，最终苟且免罚而不怀念仁德，表面恭敬而不心服。#怨恨不在大小，可怕的是人；/水能载舟也能覆舟，所应该深深谨慎。/奔跑的车子和腐烂的绳索，可以忽视吗？/#统治人民的人，如果真的能看到想要的东西就思考知足来自我警戒，将要兴作就思考知止来安定人民，想到高位危险就思考谦逊来自我修养，害怕满溢就思考江海居于百川之下，喜欢游乐就思考三驱作为限度，忧虑懈怠就思考谨慎开始而敬重结束，顾虑堵塞蒙蔽就思考虚心接纳下属，想到谗言邪恶就思考端正自身来黜退恶人，恩惠所加就思考不要因为喜悦而错误奖赏，惩罚所及就思考不要因为愤怒而滥用刑罚。/总结这十思，弘扬这九德，选拔有才能的人任用他们，选择好的意见听从它们，那么聪明的人竭尽他们的谋略，勇敢的人竭尽他们的力量，仁爱的人传播他们的恩惠，诚信的人效忠他们的忠诚。/文臣武将争相奔驰，君主没有事务，可以尽情享受游览的快乐，可以培养松乔的长寿，弹琴垂拱，不说话而教化。/何必劳神苦思，代替下属管理职事，役使聪明的耳目，损害无为的大道呢？/#",
  "pinyin": "chén wén qiú mù zhī zhǎng zhě, bì gù qí gēn běn;/ yù liú zhī yuǎn zhě, bì jùn qí quán yuán;/ sī guó zhī ān zhě, bì jī qí dé yì。# yuán bù shēn ér wàng liú zhī yuǎn, gēn bù gù ér qiú mù zhī zhǎng, dé bù hòu ér sī guó zhī lǐ, chén suī xià yú, zhī qí bù kě, ér kuàng yú míng zhé hū?/ # rén jūn dāng shén qì zhī zhòng, jū yù zhōng zhī dà, jiāng chóng jí tiān zhī jùn, yǒng bǎo wú jiāng zhī xiū。/ bù niàn jū ān sī wēi, jiè shē yǐ jiǎn, dé bù chǔ qí hòu, qíng bù shèng qí yù, sī yì fá gēn yǐ qiú mù mào, sè yuán ér yù liú cháng yě。# fán bǎi yuán shǒu, chéng tiān jǐng mìng, mò bù yīn yōu ér dào zhù, gōng chéng ér dé shuāi。/ yǒu shàn shǐ zhě shí fán, néng kè zhōng zhě gài guǎ。/ qǐ qǔ zhī yì ér shǒu zhī nán hū?/ # xī qǔ zhī ér yǒu yú, jīn shǒu zhī ér bù zú, hé yě?/ fū zài yīn yōu, bì jié chéng yǐ dài xià;/ jì dé zhì, zé zòng qíng yǐ ào wù。/ jié chéng zé hú yuè wéi yī tǐ, ào wù zé gǔ ròu wéi xíng lù。/ suī dǒng zhī yǐ yán xíng, zhèn zhī yǐ wēi nù, zhōng gǒu miǎn ér bù huái rén, mào gōng ér bù xīn fú。# yuàn bù zài dà, kě wèi wéi rén;/ zài zhōu fù zhōu, suǒ yí shēn shèn。# bēn chē xiǔ suǒ, qí kě hū hū?/ # jūn rén zhě, chéng néng jiàn kě yù zé sī zhī zú yǐ zì jiè, jiāng yǒu zuò z极 sī zhī zhǐ yǐ ān rén, niàn gāo wēi z则 sī qiān chōng ér zì mù, jù mǎn yì z则 sī jiāng hǎi xià bǎi chuān, lè pán yóu z则 sī sān qū yǐ wéi dù, yōu xiè dài z则 sī shèn shǐ ér jìng zhōng, lǜ yōng bì z则 sī xū xīn yǐ nà xià, xiǎng chán xié z则 sī zhèng shēn yǐ chù è, ēn suǒ jiā z则 sī wú yīn xǐ yǐ miù shǎng, fá suǒ jí z则 sī wú yīn nù ér làn xíng。/ zǒng cǐ shí sī, hóng zī jiǔ dé, jiǎn néng ér rèn zhī, zé shàn ér cóng zhī, zé zhì zhě jìn qí móu, yǒng zhě jié qí lì, rén zhě bō qí huì, xìn zhě xiào qí zhōng。/ wén wǔ zhēng chí, zài jūn wú shì, kě yǐ jìn yù yóu zhī lè, kě yǐ yǎng sōng qiáo zhī shòu, míng qín chuí gǒng, bù yán ér huà。/ hé bì láo shén kǔ sī, dài xià sī zhí, yì cōng míng zhī ěr mù, kuī wú wéi zhī dà dào zāi?/ #",
  "notes": [
    {"start": 5, "end": 10, "content": "浚：疏通。"},
    {"start": 50, "end": 55, "content": "胡越：胡地在北，越地在南，比喻疏远。"},
    {"start": 100, "end": 105, "content": "垂拱：垂衣拱手，形容无为而治。"}
  ],
  "different_meanings": [
    {"start": 50, "end": 55, "old": "胡越指疏远", "new": "胡人和越人"},
    {"start": 100, "end": 105, "old": "垂拱指无为而治", "new": "垂着拱手"}
  ],
  "special_sentences": [
    {"start": 15, "end": 20, "content": "排比句：'求木之长者...欲流之远者...思国之安者...'，增强气势。"},
    {"start": 60, "end": 65, "content": "比喻句：'载舟覆舟'，比喻人民的力量。"}
  ],
  "read": [50, 100],
  "write": [100, 105],
  "background": "《谏太宗十思疏》是唐代魏徵写给唐太宗的奏疏，劝谏太宗居安思危、积德义。背景包括贞观之治、魏徵的谏臣角色、唐代政治等。魏徵以直言敢谏闻名，此疏是贞观十一年所上，针对太宗功成德衰的倾向。历史 context 中，太宗初期虚心纳谏，后期渐生骄矜，魏徵上书提醒。背景详细内容超过600字，涵盖历史、政治、文学等方面。",
  "appreciation": "此疏以比喻和说理结合，艺术上运用排比、对比等手法，如'十思'的列举，逻辑严密。语言恳切，思想深刻，强调德治和民心。结构上，从自然现象引出治国道理，层层深入。思想内容上，体现了儒家仁政思想和道家无为而治的结合。赏析详细内容包括论证艺术、哲学内涵、历史影响等，超过600字。",
  "tags": ["古文", "奏疏", "魏徵", "唐", "政治", "背诵"]
}`);

JSONs.forEach(json => {
    json = JSON.parse(json);
    console.log(json);

    const dir = path.join('/home/kevin/kevin/git/gxwtf_poem_react/src/data/poem/senior/', json.title);

    // create directory dir
    fs.mkdirSync(dir, { recursive: true });

    let JSONfile = path.join(dir, 'index.json');
    console.log(JSONfile);

    fs.writeFile(JSONfile, JSON.stringify(json, null, 2), () => {});
})