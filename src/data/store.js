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
            id: 1,
            title: "The Genesis of Geometric Minimalism",
            slug: "geometric-minimalism",
            date: "2026.01.20",
            excerpt: "Exploring the mathematical harmony between the Golden Ratio and modern web surfaces.",
            content: `
          <p>In the pursuit of timeless design, we often find ourselves returning to the fundamental laws of geometry. This blog's recent redesign isn't just an aesthetic choice; it's a structural realization of the Golden Ratio.</p>
          <p>By applying a Fibonacci sequence to our border radii and layout proportions, we create an environment that feels organic yet architecturally sound. This is the essence of my current design philosophy.</p>
        `,
            backgroundImage: "blog_hero_bg_1769832819331.png",
            aesthetics: {
                bgOpacity: 0.05,
                hoverOffset: '-2px',
                hoverScale: 1.005,
                glassOpacity: 0.02
            },
            tags: ["Design", "Geometry", "Minimalism"]
        },
        {
            id: 2,
            title: "Arch Linux: The Root of Precision",
            slug: "arch-linux-precision",
            date: "2026.01.15",
            excerpt: "Why absolute control over your OS environment leads to 100% efficient creative workflows.",
            content: `
          <p>Efficiency in music production and photography grading starts with the OS. Arch Linux provides the minimal foundation required to build a focused workstation.</p>
          <p>No bloat. No background interference. Just pure access to the hardware for low-latency audio processing and color-accurate workflows.</p>
        `,
            backgroundImage: "hero_bg.png",
            aesthetics: {
                bgOpacity: 0.03,
                hoverOffset: '-1px',
                hoverScale: 1.002,
                motionSpeed: '0.4s'
            },
            tags: ["Linux", "Efficiency", "Workstation"]
        }
    ],
    galleryHovered: null
})
