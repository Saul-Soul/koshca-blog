import { reactive } from 'vue'

export const store = reactive({
    profile: {
        name: 'Koshca',
        title: 'Digital Architect & Creative Explorer',
        bio: '你好！我是 Koshca。一个数字时代的探索者，致力于在技术与艺术的交汇点寻找灵感。',
        location: 'Cloud / Matrix',
        specialty: 'Creative Technology',
        focus: 'Future & Aesthetics'
    },
    gallery: [
        {
            id: 'start',
            title: '起始',
            slug: 'Start',
            desc: '这是手机拿到后意义上的第一张照片, 一切, 从此刻开始',
            image: '1233fe85792cfba6ecf41efdea6813b3_0.jpg',
            color: '#ffffffa3',
            tags: ['orientation'],
            aspectRatio: '4/3'
        },
        {
            id: 'orientatal pearl tv tower',
            title: '东方明珠',
            slug: 'Orientatal Pearl TV Tower',
            desc: '外滩, 东方明珠',
            image: '05fe51c34d4aa3f438d93aafe86909ac_0.jpg',
            color: '#5a86ffff',
            tags: ['Natural', 'Shanghai', 'Tower'],
            aspectRatio: '4/3'
        },
        {
            id: 'home',
            title: '家',
            slug: 'Home',
            desc: '随手向窗外拍下, 落日余晖',
            image: 'b088dccd35c802664681d8239397fed5_0.jpg',
            color: '#ffaa00ff',
            tags: ['Natural', 'Shanghai', 'Home'],
            aspectRatio: '4/3'
        },
        {
            id: 'walkway',
            title: '街边人行',
            slug: 'Walkway',
            desc: '',
            image: 'fea41d420b071280dbe8683d91ecf7cb_0.jpg',
            color: '#fe9800cc',
            tags: ['Natural', 'Shanghai', 'Park'],
            aspectRatio: '4/3'
        },
        {
            id: '1',
            title: '温煦',
            slug: 'Path',
            desc: '当阳光穿过灌木丛来到下沉堆放空间, 照亮黑暗, 秩序而现',
            image: 'Koshca_20250524_095641082.jpg',
            color: '#ffffffa3',
            tags: ['Natural', 'Shanghai', 'Park'],
            aspectRatio: '4/3'
        },
        {
            id: 'music',
            title: '频率',
            slug: 'Sonic Resonance',
            desc: '',
            image: '56789013771672e92e1264d045852a8c_720.jpg',
            color: '#c084fc',
            tags: ['Natural', 'Shanghai'],
            aspectRatio: '1/1'
        },
        {
            id: 'photography',
            title: '光影叙事',
            slug: 'Visual Poetry',
            desc: '游戏一角撇开现实枷锁, 奇幻给人新奇, 色彩给人稳重',
            image: '20251122142349.png',
            color: '#3ebffff3',
            tags: ['Game', '鸣潮'],
            aspectRatio: '4/5'
        },
        {
            id: '2',
            title: '羁绊',
            slug: 'Bonds',
            desc: '我们终将独自面对人生的长路，但那些在途中与我们短暂交汇、温暖彼此的瞬间，便构成了生命中最坚韧的羁绊。与上一张类似的处理, 却有鲜明的色调, 这是活力',
            image: 'IMG_20260204_131553.png',
            color: '#ff4147ff',
            tags: ['Game', '鸣潮'],
            aspectRatio: '16/9'
        },
        {
            id: 'Flow',
            title: '流动的视界',
            slug: 'Flow',
            desc: '这是最奇幻的一张',
            image: 'Image_1766862224353.jpg',
            color: '#3c8dffff',
            tags: ['Game', '鸣潮'],
            aspectRatio: '1/1'
        },
        {
            id: 'Shanghai',
            title: '俯瞰上海',
            slug: 'Shanghai',
            desc: '上海中心, 118层, 拍下了这张照片',
            image: 'HDR_20260128_140206.jpg',
            color: '#cbfff7ff',
            tags: ['Shanghai', 'City'],
            aspectRatio: '16/9'
        },
        {
            id: 'Lab',
            title: '喝大了',
            slug: 'Lab',
            desc: '实验作品, 我笑称其喝大时调的',
            image: 'IMG_20260214_001305.jpg',
            color: '#00bfffff',
            tags: ['Lab', 'Experiment'],
            aspectRatio: '16/9'
        },
        {
            id: 'Lab2',
            title: '喝大了2',
            slug: 'Lab',
            desc: '继上张后的又一力作(笑)',
            image: 'IMG_20260214_005050.jpg',
            color: '#6b93ffff',
            tags: ['Lab', 'Experiment'],
            aspectRatio: '16/9'
        }
    ],
    config: {
        theme: 'Elegant Dark',
        fontHead: "'Cormorant Garamond', serif",
        fontBody: "'Inter', sans-serif"
    },
    posts: [
        {
            "id": 1,
            "title": "The First I Write",
            "slug": "start",
            "date": "2026.02.23",
            "excerpt": "这是第一篇帖子, 或许是了解我的第一步",
            "content": `
          <p>你好, 旅人.<br>我是Koshca, 有心之人会去寻这意义, 但现在, 看完这篇帖子吧.<br>互联网一定程度上弥补了我的许多缺憾, 而我, 则成了网络的一部分.</p>
          <p>当以网络为媒介, 我看到了无尽星海, 整个人陷入信息的温暖之中, 以至于差点无法站起来<br>感谢我的天赋, 某方面烂到极致的天赋.<br>游戏, 当年我只是跟风地去玩, 好玩而已, 有人而已. 从未思考如何玩, 或是主动找寻, 或是交流. 像只无头苍蝇般, 又像是打卡上班, 只是为了填补心中一丝空虚而玩.</p>
          <p>我在学习方面一直被动, 直至至今. 被动地接受环境带来的知识. 我漫无目的地看着电视, 父母看什么, 便看什么, 推荐算法在这起了大作用.<br>特意的信息茧房, 尽是物理知识与工业科技, 现在回想, 这启蒙算是做到位了.<br>得益于不时的&quot;漫无目的&quot;, 以及不适应就放弃的半途而废性格, 我的知识面变得广泛而浅薄. 我想, 我将用后面部分的人生填补他们.</p>
          <p>好动贯彻至今, 我报以无知无畏的心态.......搞破坏.却也从重建中博学.</p>
          <p>愿以人生为代价, 充实我的知识.</p>
        `,
            "backgroundImage": "1233fe85792cfba6ecf41efdea6813b3_0.jpg",
            "aesthetics": {
                "bgOpacity": 0.05,
                "hoverOffset": "-2px",
                "hoverScale": 1.005,
                "glassOpacity": 0.02
            },
            "tags": ["Myself"]
        }
    ],
    galleryHovered: null
})
