import { Artisan, Craft, Category, Product, Exhibition, Story, User, Order } from '../types';

export const CRAFTS_DATA: Craft[] = [
  {
    id: 'craft-1',
    name: 'Sikki Grass Weaving',
    slug: 'sikki-grass',
    shortDescription: 'The golden grass craft of the Mithila wetlands, sculpted into luminous homeware, vessels, and heirloom forms.',
    description: 'Sikki (Chrysopogon zizanioides) is a wild wetland grass that blooms in Bihar along the marshlands of Madhubani and Sitamarhi after the monsoon rains. Cut, dried under the sun, and split with precision, the grass takes on an innate warm golden luster without artificial lacquer. Women artisans weave it using a traditional needle tool called the Takua, coiling grass cores with golden sheaths to create structural vessels, lampshades, and festive artifacts.',
    history: 'Practiced for centuries in Mithila households, Sikki weaving was traditionally passed down from mothers to daughters as both a domestic art and ritual offering. In 2007, Sikki craft received Geographical Indication (GI) status in India, recognizing its unique ecological and cultural provenance.',
    region: 'Madhubani, Sitamarhi & Darbhanga Districts, Bihar',
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80'
    ],
    process: [
      { step: '01', title: 'Monsoon Harvesting', description: 'Artisans gather wild Sikki grass from wetland marshes immediately after the monsoon recedes in late October.' },
      { step: '02', title: 'Solar Bleaching & Sorting', description: 'The stems are sun-cured over weeks until they turn into a rich natural golden amber shade.' },
      { step: '03', title: 'Core Coiling with Munj', description: 'Strong inner Munj reeds form the load-bearing spine, tightly wrapped in lustrous Sikki grass.' },
      { step: '04', title: 'Takua Needle Sculpting', description: 'Using an iron needle (Takua), the artisan pierces coils and binds each layer with rhythmic finger tension.' }
    ],
    materials: ['Wild Sikki Grass (Golden Reed)', 'Munj Grass (Inner Core)', 'Natural Vegetable Dyes', 'Iron Takua Needle'],
    culturalSignificance: 'Traditionally gifted to daughters as symbols of auspiciousness, self-reliance, and familial affection, Sikki has evolved into contemporary organic design revered globally.',
    artisanIds: ['artisan-1'],
    featured: true
  },
  {
    id: 'craft-2',
    name: 'Sujuni Narrative Embroidery',
    slug: 'sujuni-embroidery',
    shortDescription: 'Fine running-stitch needlework on layered cotton textiles, chronicling women’s lived experiences, dreams, and natural lore.',
    description: 'Sujuni is a centuries-old textile tradition from Muzaffarpur where layered old cotton sarees or fresh handloom khadi are quilted with fine running stitches. Unlike purely ornamental embroidery, Sujuni is narrative poetry in thread: each motif depicts women’s daily lives, struggles against societal constraints, ecological rhythms, birds, fish, and folklore.',
    history: 'Born out of the thrift and maternal tenderness of rural mothers repurposing soft worn saris for newborns, Sujuni was transformed into an artistic movement for women’s economic independence in Bhusra village during the 1980s. It was awarded GI registration in 2006.',
    region: 'Muzaffarpur & Madhubani Districts, Bihar',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    process: [
      { step: '01', title: 'Layering Handloom Cloth', description: 'Pure cotton khadi sheets are laid together to form a soft, breathable quilt foundation.' },
      { step: '02', title: 'Freehand Charcoal Sketching', description: 'The artisan draws flowing figurative narratives using charcoal pencil directly from memory.' },
      { step: '03', title: 'Outline Chain Stitching', description: 'Contour lines are defined using colored cotton floss in rhythmic chain or stem stitches.' },
      { step: '04', title: 'Dense Rippled Running Stitch', description: 'The background is filled with undulating white running stitches creating a signature crinkled texture.' }
    ],
    materials: ['Unbleached Handloom Khadi Cotton', 'Fine Cotton Embroidery Floss', 'Azo-free Natural Dyes', 'Fine Hand Needles'],
    culturalSignificance: 'A textile of dignity and voice: Sujuni allowed rural Bihari women to articulate their world, domestic challenges, and dreams into museum-worthy tapestries.',
    artisanIds: ['artisan-2'],
    featured: true
  },
  {
    id: 'craft-3',
    name: 'Madhubani / Mithila Painting',
    slug: 'madhubani-mithila',
    shortDescription: 'Ancient sacred visual language of the Mithila region rendered with fine bamboo nibs, natural pigments, and intricate geometric lines.',
    description: 'Madhubani art is characterized by line drawings filled in with vibrant natural mineral and botanical colors, geometric borders, and symbolic motifs of sun, moon, bamboo groves, fish, peacocks, and fertility deities. Executed in two primary classical idioms—Kachni (delicate monochrome cross-hatching) and Bharni (bold saturated fills)—on handmade paper, raw silk, and contemporary canvas.',
    history: 'Tradition traces Mithila painting back to King Janaka commissioning artists for Princess Sita’s wedding. For millennia, women painted mud walls during festivities before transitioning to paper during the 1968 Bihar drought relief initiative.',
    region: 'Jitwarpur, Ranti & Madhubani District, Bihar',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80'
    ],
    process: [
      { step: '01', title: 'Paper Priming with Cowdung / Rice Paste', description: 'Handmade cotton paper is primed to impart an antique parchment texture and insect resistance.' },
      { step: '02', title: 'Nib Crafting from Bamboo Twigs', description: 'Artisans carve thin wild bamboo twigs into dip pens wrapped with raw cotton thread.' },
      { step: '03', title: 'Kachni Line Drawing', description: 'Continuous double lines and delicate rhythmic hatching are drawn without any erasure or ruler.' },
      { step: '04', title: 'Pigment Infusion', description: 'Colors derived from turmeric, indigo, soot, and aparajita petals fill the sacred geometries.' }
    ],
    materials: ['Handmade Rag Paper', 'Bamboo Nibs & Twigs', 'Natural Plant & Mineral Extracts', 'Cotton Gauze'],
    culturalSignificance: 'A living celebration of cosmic ecology where every living creature and plant is revered as an interconnected thread of existence.',
    artisanIds: ['artisan-3'],
    featured: true
  },
  {
    id: 'craft-4',
    name: 'Khatwa / Appliqué & Patchwork',
    slug: 'khatwa-applique',
    shortDescription: 'Meticulous cutwork and stitched fabric architectural motifs dating from the Mughal and Mauryan epochs.',
    description: 'Khatwa is the traditional craft of appliqué and reverse-cutwork from Bihar. Women artists cut complex silhouettes of flora, fauna, and geometric lattices out of vibrant fabrics and hand-hem them onto contrasting base cloths using minute invisible stitches. Today, it translates effortlessly into refined contemporary cushions, drapery, and table linens.',
    history: 'Historically used for royal tents, ceremonial canopies (shamianas), and palanquin covers, Khatwa became a domestic craft perfected by women across Patna and Vaishali districts.',
    region: 'Patna, Vaishali & Bhojpur Districts, Bihar',
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    process: [
      { step: '01', title: 'Pattern Geometry Cutting', description: 'Fabrics are folded into multiple layers and hand-sheared into intricate positive and negative templates.' },
      { step: '02', title: 'Basting on Base Fabric', description: 'The cut motif is carefully aligned and temporarily tacked onto the woven ground cloth.' },
      { step: '03', title: 'Turn-and-Hem Needlework', description: 'The raw cut edges are turned inward by a hair’s breadth and fastened with blind hem-stitches.' },
      { step: '04', title: 'Accent Detail Stitching', description: 'Stem stitches and mirrors or French knots highlight eyes, petals, and border flourishes.' }
    ],
    materials: ['Organic Handloom Cotton', 'Linen Blends', 'Natural Indigo & Madder Dyes', 'Fine Steel Needles'],
    culturalSignificance: 'Celebrates architectural geometry and sustainable zero-waste fabric circularity by repurposing precious textiles into enduring heirlooms.',
    artisanIds: ['artisan-4'],
    featured: true
  },
  {
    id: 'craft-5',
    name: 'Bhagalpuri Handspun Tussar Silk',
    slug: 'bhagalpur-tussar-silk',
    shortDescription: 'The legendary "Wild Silk of the East" celebrated for its deep golden undertones, breathable hand, and textured weave.',
    description: 'Bhagalpur, known across the subcontinent as the "Silk City", has nurtured wild silkworm rearing and hand-spinning for over a century. Tussar silk is extracted from Antheraea mylitta silkworms living in local Arjun and Asan forest trees. Hand-reeled by women using traditional thigh-reeling and spindle techniques, the resulting yarn has natural imperfections, a breathable porosity, and an earthy gold sheen.',
    history: 'Referenced in classical Indian texts and travelers’ logs dating back centuries, Bhagalpur Tussar has clothed nobility and evolved into the premier sustainable raw silk choice worldwide.',
    region: 'Bhagalpur & Banka Districts, Bihar',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    process: [
      { step: '01', title: 'Wild Forest Cocoon Collection', description: 'Artisans sustainably harvest mature wild Tussar cocoons from native deciduous forests.' },
      { step: '02', title: 'Boiling & Natural Softening', description: 'Cocoons are softened in natural alkaline solutions to ease fiber separation.' },
      { step: '03', title: 'Hand-Spindle Reeling', description: 'Women reel the coarse filament onto wooden spindles, preserving the distinctive slub texture.' },
      { step: '04', title: 'Pit Loom Weaving', description: 'Woven on wooden pit-looms with rhythmic reed beatings for an airy, tactile drape.' }
    ],
    materials: ['Organic Forest Tussar Silk Yarn', 'Natural Plant Gums', 'Herbal Softeners', 'Wooden Pit Looms'],
    culturalSignificance: 'A living forest economy that sustains thousands of indigenous women spinners and weaver households in eastern Bihar.',
    artisanIds: ['artisan-5'],
    featured: false
  },
  {
    id: 'craft-6',
    name: 'Bawan Buti Heritage Handloom',
    slug: 'bawan-buti',
    shortDescription: 'The rare 52-motif weaving discipline of Nalanda, embodying ancient Buddhist iconography on handloom cloth.',
    description: 'Bawan Buti ("52 motifs") is a heritage handloom technique unique to the weavers of Nalanda and Biharsharif. Each textile features exactly 52 identical miniature motifs—such as the Buddhist Dharmachakra, lotus flower, peepal leaf, or conch—painstakingly picked out with extra weft thread across the fabric body by hand.',
    history: 'Conceived in the vicinity of ancient Nalanda University, Bawan Buti textiles once graced the historic Buddhist pilgrimage circuits and the halls of the Indian Parliament.',
    region: 'Nepura & Biharsharif, Nalanda District, Bihar',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    ],
    process: [
      { step: '01', title: 'Jacquard-Free Extra Weft Planning', description: 'Weavers plot the placement of 52 symmetrical motifs purely through mental mathematical counts.' },
      { step: '02', title: 'Manual Needle Insertion', description: 'As the shuttle passes, the artisan lifts individual warp threads with a pointed wooden needle.' },
      { step: '03', title: 'Interlocking Buti Motifs', description: 'Colored contrast threads are interlocked to form dense, raised geometric emblems.' },
      { step: '04', title: 'Temple Finishing', description: 'Edges are hand-knotted with traditional fringe tassels.' }
    ],
    materials: ['Mercerized Fine Cotton Warp', 'Organic Linen & Silk Weft', 'Vegetable Dyes', 'Traditional Frame Looms'],
    culturalSignificance: 'A rare mathematical weaving testament connecting contemporary interiors with Nalanda’s thousand-year intellectual legacy.',
    artisanIds: ['artisan-6'],
    featured: false
  }
];

export const ARTISANS_DATA: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Devi Devi',
    slug: 'devi-devi',
    village: 'Ranti',
    district: 'Madhubani',
    state: 'Bihar',
    craft: 'Sikki Grass Weaving',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1600&q=80',
    biography: 'Devi Devi is a master sculptor and senior artisan with 28 years of dedicated practice in Sikki grass craft. Born in the craft heartland of Ranti village, she learned the discipline as an eight-year-old girl observing her grandmother by the fireside. Today, she leads a collective of 45 women artisans, training younger generations and converting traditional ritual baskets into modern pendant luminaires and minimalist tableware that have traveled to exhibitions in New Delhi, London, and Tokyo.',
    story: '“Grass is not just dry fiber to us; it is the gift of the monsoon waters. When I sit with my Takua needle, my hands know the exact tension needed so that a basket can last fifty years without bending. Through Sakhi–Saheli, we are not asking for charity—we are setting our own prices and seeing our designs illuminate contemporary apartments across the world.”',
    quote: 'Craft gives us independent bank accounts, artistic sovereignty, and dignity in our community.',
    yearsOfExperience: 28,
    skills: ['Structural 3D Grass Coiling', 'Natural Vegetable Dye Infusion', 'Contemporary Luminaire Prototyping', 'Master Quality Grading'],
    productCount: 4,
    featured: true,
    verified: true,
    createdAt: '2023-01-15'
  },
  {
    id: 'artisan-2',
    name: 'Kanti Kumari',
    slug: 'kanti-kumari',
    village: 'Bhusra',
    district: 'Muzaffarpur',
    state: 'Bihar',
    craft: 'Sujuni Narrative Embroidery',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    biography: 'Kanti Kumari is an acclaimed Sujuni textile creator and community organiser who has spent 19 years transforming traditional quilt-making into powerful narrative art. Her tapestries depict subtle stories of village solidarity, girls attending school, and the conservation of Bihar’s sacred wetlands. Her work has been acquired by craft historians and featured in design retrospectives.',
    story: '“Every piece begins with quiet contemplation. When my needle pierces the khadi, I do not follow a rigid stencil. I draw with my memory. One thread represents the mango blossom, another the river Gandak, and another the journey of a woman claiming her own space. Sakhi–Saheli treats us as co-designers, which changes everything.”',
    quote: 'Our stitches carry the unwritten histories of women who never had books.',
    yearsOfExperience: 19,
    skills: ['Freehand Charcoal Narrative Drawing', 'High-Density Ripple Quilting', 'Azo-Free Color Matching', 'Textile Preservation'],
    productCount: 4,
    featured: true,
    verified: true,
    createdAt: '2023-02-10'
  },
  {
    id: 'artisan-3',
    name: 'Urmila Devi',
    slug: 'urmila-devi',
    village: 'Jitwarpur',
    district: 'Madhubani',
    state: 'Bihar',
    craft: 'Madhubani / Mithila Painting',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80',
    biography: 'Urmila Devi is a veteran practitioner of the Kachni (line-work) idiom of Mithila art. Practicing for over 32 years in Jitwarpur, she is famed for her microscopic line density, drawing concentric geometries and mythological flora using nothing more than a bamboo twig nib without sketch guides. She has mentored over 120 young village women in preserving pigment formulas made from soot, bilva leaves, and turmeric.',
    story: '“When people look at Mithila art, they often see decorative patterns. But each line is a prayer for balance between humanity and nature. By translating our ancient line-work to minimal canvas panels and organic homeware, we keep our culture alive in contemporary spaces.”',
    quote: 'The bamboo twig does not hesitate; the hand moves with the certainty of our ancestors.',
    yearsOfExperience: 32,
    skills: ['Fine Kachni Cross-Hatching', 'Botanical Pigment Extraction', 'Architectural Border Geometry', 'Museum-Grade Framing Curation'],
    productCount: 3,
    featured: true,
    verified: true,
    createdAt: '2023-01-20'
  },
  {
    id: 'artisan-4',
    name: 'Shahnaz Begum',
    slug: 'shahnaz-begum',
    village: 'Barh',
    district: 'Patna',
    state: 'Bihar',
    craft: 'Khatwa Appliqué & Cutwork',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1600&q=80',
    biography: 'Shahnaz Begum is a master appliqué artist whose geometric precision transforms handloom cotton scraps into breathtaking contemporary table and bed textiles. With 15 years of rigorous practice, she leads a women’s self-help cluster of 30 artisans along the Ganges belt, fostering economic independence and artistic discipline.',
    story: '“Khatwa demands extreme patience. A single millimeter discrepancy in folding the fabric ruins the symmetry of the lotus. We take great pride in making pieces that sit proudly in modern apartments in Mumbai, Bangalore, and New York.”',
    quote: 'Precision is our language. Every cut must honor the fabric.',
    yearsOfExperience: 15,
    skills: ['Reverse Cutwork Precision', 'Invisible Blind Hemming', 'Geometric Lattice Drafting', 'Zero-Waste Fabric Optimization'],
    productCount: 3,
    featured: true,
    verified: true,
    createdAt: '2023-03-01'
  },
  {
    id: 'artisan-5',
    name: 'Parvati Manjhi',
    slug: 'parvati-manjhi',
    village: 'Amarpur',
    district: 'Banka',
    state: 'Bihar',
    craft: 'Bhagalpuri Tussar Silk',
    profileImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1600&q=80',
    biography: 'Parvati Manjhi represents the indigenous forest community that nurtures wild Tussar silkworm cocoons and hand-spins the raw filament on wooden taklis. Her 22 years of textile experience guarantee an extraordinary tactile quality in every handwoven stole and throw.',
    story: '“Wild silk breathes like skin. It is warm in winter and cool under the summer breeze. Hand-spinning allows the yarn to retain its soul, something industrial mills can never replicate.”',
    quote: 'The forest provides the cocoon; our hands provide the song of the yarn.',
    yearsOfExperience: 22,
    skills: ['Thigh & Spindle Hand-Reeling', 'Natural Slub Texture Balancing', 'Organic Vat Dyeing', 'Hand-Tasseled Hemming'],
    productCount: 2,
    featured: false,
    verified: true,
    createdAt: '2023-04-12'
  },
  {
    id: 'artisan-6',
    name: 'Sunita Devi',
    slug: 'sunita-devi',
    village: 'Nepura',
    district: 'Nalanda',
    state: 'Bihar',
    craft: 'Bawan Buti Heritage Handloom',
    profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1600&q=80',
    biography: 'Sunita Devi is one of the few surviving master weavers in Nepura village who can weave all 52 historical Buddhist symbols by memory on a handloom without punch cards. Her work is a rare bridge between historical Buddhist aesthetics and modern interior styling.',
    story: '“Weaving Bawan Buti is like meditation. Each of the 52 motifs requires counting the threads one by one. There are no shortcuts. When a client buys our textile, they bring a piece of Nalanda’s peace into their home.”',
    quote: 'Every motif is counted with reverence; every centimeter holds our heritage.',
    yearsOfExperience: 18,
    skills: ['Extra Weft Mathematical Picking', 'Nalanda Buddhist Iconography', 'Fine Combed Cotton Warp Setup', 'Double-Sided Motif Finishing'],
    productCount: 2,
    featured: false,
    verified: true,
    createdAt: '2023-05-08'
  }
];

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'cat-1',
    name: 'Living & Decor',
    slug: 'living-decor',
    description: 'Sculptural lighting, heirloom storage vessels, decorative bells, and architectural craft accents for contemporary rooms.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'cat-2',
    name: 'Art & Wall Panels',
    slug: 'art-wall-panels',
    description: 'Museum-grade Mithila line paintings, narrative Sujuni textile art frames, and handmade wall hangings.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'cat-3',
    name: 'Textiles & Soft Furnishings',
    slug: 'textiles-furnishings',
    description: 'Hand-stitched Sujuni throws, Khatwa geometric cushion covers, and handspun Tussar silk bed runners.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'cat-4',
    name: 'Dining & Entertaining',
    slug: 'dining-entertaining',
    description: 'Golden Sikki bread baskets, handwoven table runners, Bawan Buti placemats, and natural woven coasters.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'cat-5',
    name: 'Wearable Heritage',
    slug: 'wearable-heritage',
    description: 'Handspun raw Tussar silk stoles, handcrafted jewelry boxes, and artisanal accessories celebrating Bihar craftsmanship.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    featured: true
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Sikki Sculptural Pendant Luminaire',
    slug: 'sikki-sculptural-pendant-luminaire',
    shortDescription: 'Contemporary open-weave ceiling lamp shade hand-sculpted from wild golden Sikki grass.',
    description: 'An architectural statement piece combining the organic warmth of wetland Sikki grass with contemporary lighting design. The open coiled weave diffuses warm, amber-toned light while casting intricate shadow geometries across ceilings and walls. Hand-coiled by master artisan Devi Devi in Madhubani, each piece takes over four days of rigorous hand work.',
    price: 4850,
    compareAtPrice: 5800,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Living & Decor',
    categorySlug: 'living-decor',
    craft: 'Sikki Grass Weaving',
    craftSlug: 'sikki-grass',
    artisanId: 'artisan-1',
    artisanName: 'Devi Devi',
    artisanVillage: 'Ranti, Madhubani',
    materials: ['Wild Golden Sikki Grass', 'Inner Munj Reed Core', 'Brass Hardware Collar'],
    dimensions: '38 cm Diameter × 28 cm Height',
    weight: '620 g',
    colors: ['Natural Golden Amber'],
    inventory: 14,
    sku: 'SS-SIK-LUM-001',
    tags: ['Lighting', 'Handwoven', 'Living Room', 'Organic', 'Contemporary'],
    featured: true,
    bestseller: true,
    newArrival: false,
    customizable: true,
    handmadeTime: '4 days of hand coiling',
    careInstructions: 'Gently dust with a soft, dry bristle brush. Avoid direct water exposure. For indoor dry spaces.',
    story: 'Conceived in collaboration between contemporary industrial designers and the Ranti women’s collective to create lighting that brings quiet, sacred warmth to modern urban rooms.',
    status: 'active',
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2024-01-10'
  },
  {
    id: 'prod-2',
    name: 'Sujuni ‘Vriksha & Chidiya’ Hand-Quilted Cushion Cover',
    slug: 'sujuni-vriksha-chidiya-cushion-cover',
    shortDescription: 'Narrative running-stitch cushion cover in unbleached organic khadi with botanical motifs.',
    description: 'Handcrafted on pure handloom cotton using thousands of minute Sujuni running stitches, this cushion cover tells the story of the sacred Bodhi tree and nesting riverbirds. Master artisan Kanti Kumari uses fine black and terracotta cotton threads to construct the tree of life, contrasted with dense white rippled quilting in the background.',
    price: 2450,
    compareAtPrice: 2900,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Textiles & Soft Furnishings',
    categorySlug: 'textiles-furnishings',
    craft: 'Sujuni Narrative Embroidery',
    craftSlug: 'sujuni-embroidery',
    artisanId: 'artisan-2',
    artisanName: 'Kanti Kumari',
    artisanVillage: 'Bhusra, Muzaffarpur',
    materials: ['100% Handloom Khadi Cotton', 'Cotton Embroidery Floss', 'Concealed YKK Zipper'],
    dimensions: '45 cm × 45 cm (18″ × 18″)',
    weight: '240 g',
    colors: ['Off-White / Terracotta / Charcoal'],
    inventory: 22,
    sku: 'SS-SUJ-CSH-002',
    tags: ['Cushion', 'Textile', 'Embroidery', 'Khadi', 'Heirloom'],
    featured: true,
    bestseller: true,
    newArrival: false,
    customizable: false,
    handmadeTime: '3.5 days of needlework',
    careInstructions: 'Dry clean recommended or gentle hand-wash in cold water with mild ph-neutral detergent. Line dry in shade.',
    story: 'Kanti Kumari spent two decades mentoring young girls in her village, teaching them that their needle is both an artistic tool and an instrument of independence.',
    status: 'active',
    rating: 4.8,
    reviewCount: 42,
    createdAt: '2024-01-15'
  },
  {
    id: 'prod-3',
    name: 'Madhubani Monochrome ‘Kamal Vana’ Art Panel',
    slug: 'madhubani-monochrome-kamal-vana-panel',
    shortDescription: 'Museum-grade Kachni line drawing of the sacred lotus grove rendered with fine bamboo nibs.',
    description: 'A striking contemporary departure from multicolored folk renditions: Urmila Devi uses the austere purity of Kachni (micro cross-hatching) in deep charcoal soot ink on hand-pressed cotton rag paper. Depicting the aquatic ecosystem of northern Bihar with blooming lotuses, sacred fish, and gentle ripples, this piece was made using natural lamp-black ink.',
    price: 6800,
    compareAtPrice: 8200,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Art & Wall Panels',
    categorySlug: 'art-wall-panels',
    craft: 'Madhubani / Mithila Painting',
    craftSlug: 'madhubani-mithila',
    artisanId: 'artisan-3',
    artisanName: 'Urmila Devi',
    artisanVillage: 'Jitwarpur, Madhubani',
    materials: ['Acid-Free Hand-Pressed Cotton Paper (300 GSM)', 'Natural Soot Pigment', 'Hand-carved Bamboo Nib'],
    dimensions: '56 cm × 76 cm (Framed: Archival Teak Finish)',
    weight: '1.4 kg',
    colors: ['Charcoal on Natural Ivory Paper'],
    inventory: 8,
    sku: 'SS-MAD-PAN-003',
    tags: ['Wall Art', 'Painting', 'Monochrome', 'Collector Item', 'Mithila'],
    featured: true,
    bestseller: false,
    newArrival: true,
    customizable: false,
    handmadeTime: '6 days of microscopic nib drawing',
    careInstructions: 'Keep away from direct prolonged midday UV sunlight. Framed behind UV-reflective glass.',
    story: 'Rendered in a single continuous stream of creative concentration without pre-drawn graphite outlines, following a 32-year lineage of master painting.',
    status: 'active',
    rating: 5.0,
    reviewCount: 19,
    createdAt: '2024-02-01'
  },
  {
    id: 'prod-4',
    name: 'Sikki Kautuk Handwoven Serving & Bread Vessel',
    slug: 'sikki-kautuk-serving-vessel',
    shortDescription: 'Sculptural shallow centerpiece basket woven from sun-cured golden grass with geometric rim.',
    description: 'Designed as a functional centerpiece for sourdough breads, seasonal fruits, or quiet dining presentation. The natural golden sheen of Sikki grass imparts warmth to stone and wood tables. Its tight coil structural integrity guarantees decades of daily use.',
    price: 1950,
    compareAtPrice: 2400,
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Dining & Entertaining',
    categorySlug: 'dining-entertaining',
    craft: 'Sikki Grass Weaving',
    craftSlug: 'sikki-grass',
    artisanId: 'artisan-1',
    artisanName: 'Devi Devi',
    artisanVillage: 'Ranti, Madhubani',
    materials: ['Natural Sikki Wetland Grass', 'Munj Reed Base'],
    dimensions: '32 cm Diameter × 7 cm Depth',
    weight: '340 g',
    colors: ['Natural Wheat Gold'],
    inventory: 35,
    sku: 'SS-SIK-VES-004',
    tags: ['Tableware', 'Basket', 'Dining', 'Entertaining', 'Gift'],
    featured: true,
    bestseller: true,
    newArrival: false,
    customizable: true,
    handmadeTime: '2 days of weaving',
    careInstructions: 'Wipe with a slightly damp cloth and allow to dry thoroughly in open air before storage.',
    story: 'An everyday artifact elevated into an architectural dining bowl by modernizing the scale and edge-coiling geometry.',
    status: 'active',
    rating: 4.9,
    reviewCount: 54,
    createdAt: '2024-01-22'
  },
  {
    id: 'prod-5',
    name: 'Khatwa Indigo Geometric Table Runner',
    slug: 'khatwa-indigo-geometric-table-runner',
    shortDescription: 'Architectural cutwork runner in plant-dyed natural indigo and unbleached cotton.',
    description: 'Drawing inspiration from Mauryan architectural jali screens and river eddies, this table runner features meticulous reverse appliqué cutwork hand-stitched by Shahnaz Begum and her women’s collective in Barh. Layered against deep indigo cloth, the raw edges are invisibly hemmed by hand.',
    price: 3200,
    compareAtPrice: 3800,
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Dining & Entertaining',
    categorySlug: 'dining-entertaining',
    craft: 'Khatwa / Appliqué & Patchwork',
    craftSlug: 'khatwa-applique',
    artisanId: 'artisan-4',
    artisanName: 'Shahnaz Begum',
    artisanVillage: 'Barh, Patna',
    materials: ['Natural Fermented Indigo-Dyed Cotton', 'Handspun Khadi Ground Fabric'],
    dimensions: '180 cm Length × 36 cm Width',
    weight: '380 g',
    colors: ['Deep Indigo / Unbleached Cotton'],
    inventory: 18,
    sku: 'SS-KHA-RUN-005',
    tags: ['Table Runner', 'Indigo', 'Khatwa', 'Handmade', 'Dining Decor'],
    featured: false,
    bestseller: false,
    newArrival: true,
    customizable: true,
    handmadeTime: '4 days of hand hemming',
    careInstructions: 'Gentle hand wash separately in cold water with gentle liquid soap. Iron on reverse side while slightly damp.',
    story: 'Constructed by a collective of mothers who gathered in courtyards after afternoon domestic chores to pool their artistic talents into export-grade textiles.',
    status: 'active',
    rating: 4.7,
    reviewCount: 21,
    createdAt: '2024-02-18'
  },
  {
    id: 'prod-6',
    name: 'Bhagalpuri Handspun Wild Tussar Stole',
    slug: 'bhagalpuri-handspun-wild-tussar-stole',
    shortDescription: 'Sumptuous breathable raw silk stole with hand-reeled slub texture and fringed borders.',
    description: 'Woven on traditional wooden pit looms from non-violent wild forest Tussar cocoons hand-reeled by Parvati Manjhi. The stole has a distinctive natural golden-beige luster, a crisp yet supple hand-feel, and subtle slubs that celebrate the organic unpredictability of true hand spinning.',
    price: 3850,
    compareAtPrice: 4600,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Wearable Heritage',
    categorySlug: 'wearable-heritage',
    craft: 'Bhagalpuri Handspun Tussar Silk',
    craftSlug: 'bhagalpur-tussar-silk',
    artisanId: 'artisan-5',
    artisanName: 'Parvati Manjhi',
    artisanVillage: 'Amarpur, Banka',
    materials: ['100% Wild Forest Tussar Silk Yarn', 'Natural Undyed Luster'],
    dimensions: '200 cm Length × 70 cm Width',
    weight: '160 g',
    colors: ['Natural Honey Gold'],
    inventory: 16,
    sku: 'SS-TUS-STL-006',
    tags: ['Silk', 'Stole', 'Wearable', 'Luxury', 'Organic Silk'],
    featured: true,
    bestseller: false,
    newArrival: true,
    customizable: false,
    handmadeTime: '3 days of handloom weaving',
    careInstructions: 'Dry clean only. Store wrapped in breathable muslin cloth with cedar chips.',
    story: 'Parvati’s family has worked with forest-dwelling tribal communities for generations to harvest cocoons ethically while preserving wild silkworm biodiversity.',
    status: 'active',
    rating: 4.9,
    reviewCount: 29,
    createdAt: '2024-02-25'
  },
  {
    id: 'prod-7',
    name: 'Sujuni ‘Nari Shakti’ Heirloom Bed Throw',
    slug: 'sujuni-nari-shakti-heirloom-bed-throw',
    shortDescription: 'Masterpiece narrative quilt in triple-ply handloom cotton with ripple stitching.',
    description: 'An exceptional collector piece: Kanti Kumari and three senior artisans spent over three weeks hand-quilting this generous throw. Featuring undulating ripple stitching and detailed narrative vignettes of women planting saplings, harvesting grain, and reading by lamplight, it is a testament to the living soul of Sujuni.',
    price: 12500,
    compareAtPrice: 15000,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Textiles & Soft Furnishings',
    categorySlug: 'textiles-furnishings',
    craft: 'Sujuni Narrative Embroidery',
    craftSlug: 'sujuni-embroidery',
    artisanId: 'artisan-2',
    artisanName: 'Kanti Kumari',
    artisanVillage: 'Bhusra, Muzaffarpur',
    materials: ['Triple-Ply Organic Khadi Cotton', 'Natural Botanical Dyes'],
    dimensions: '220 cm × 150 cm (Single Bed / Generous Throw)',
    weight: '1.2 kg',
    colors: ['Ecru with Madder & Charcoal Accents'],
    inventory: 5,
    sku: 'SS-SUJ-THR-007',
    tags: ['Bedding', 'Throw', 'Heirloom', 'Collector', 'Sujuni'],
    featured: true,
    bestseller: false,
    newArrival: false,
    customizable: true,
    handmadeTime: '21 days of collaborative needlework',
    careInstructions: 'Professional dry clean only. Cherish as a living textile heirloom.',
    story: 'Created as a celebration of the Muzaffarpur rural women’s cooperative’s 40th anniversary of collective empowerment.',
    status: 'active',
    rating: 5.0,
    reviewCount: 16,
    createdAt: '2024-01-05'
  },
  {
    id: 'prod-8',
    name: 'Bawan Buti Heritage Placemat Set (Set of 4)',
    slug: 'bawan-buti-heritage-placemat-set',
    shortDescription: 'Handwoven cotton dining mats featuring 52 picked extra-weft Buddhist lotus motifs.',
    description: 'Crafted on ancestral frame looms by Sunita Devi in Nepura, Nalanda. Each mat features symmetrical lotus and peepal leaf motifs manually inserted with pointed wooden picks. Woven in crisp unbleached cotton with warm terracotta-toned motifs, they bring ancient contemplative grace to daily dining.',
    price: 2600,
    compareAtPrice: 3100,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Dining & Entertaining',
    categorySlug: 'dining-entertaining',
    craft: 'Bawan Buti Heritage Handloom',
    craftSlug: 'bawan-buti',
    artisanId: 'artisan-6',
    artisanName: 'Sunita Devi',
    artisanVillage: 'Nepura, Nalanda',
    materials: ['100% Combed Handloom Cotton', 'Mercerized Motif Threads'],
    dimensions: '48 cm × 34 cm each (Set of 4)',
    weight: '440 g',
    colors: ['Oatmeal Ground / Terracotta Motifs'],
    inventory: 15,
    sku: 'SS-BAW-MAT-008',
    tags: ['Dining', 'Tableware', 'Bawan Buti', 'Nalanda', 'Set'],
    featured: false,
    bestseller: false,
    newArrival: true,
    customizable: true,
    handmadeTime: '3 days of extra-weft weaving',
    careInstructions: 'Machine wash on delicate cold cycle or hand wash. Warm iron while slightly damp.',
    story: 'Sunita Devi weaves in the identical tradition that clothed monks and dignitaries visiting the world’s oldest residential university in Nalanda.',
    status: 'active',
    rating: 4.8,
    reviewCount: 17,
    createdAt: '2024-03-05'
  }
];

export const EXHIBITIONS_DATA: Exhibition[] = [
  {
    id: 'exh-1',
    title: 'Hunar: Living Traditions of the Mithila Basin',
    slug: 'hunar-mithila-basin',
    description: 'An immersive retrospective of contemporary Sikki grass sculpture and Kachni line drawings by master women practitioners of Madhubani. Featuring live craft demonstrations and architectural luminaire installations.',
    location: 'New Delhi, India',
    venue: 'Visual Arts Gallery, India Habitat Centre, Lodhi Road',
    date: 'November 14 – 22, 2026',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    artisans: ['Devi Devi', 'Urmila Devi'],
    status: 'upcoming'
  },
  {
    id: 'exh-2',
    title: 'The Modern Loom: Bihar Craft Pavilion',
    slug: 'modern-loom-bihar-pavilion',
    description: 'Curated showcase of contemporary interior textiles, Sujuni narrative tapestries, and handspun raw Tussar silk at India’s premier street and design cultural festival.',
    location: 'Mumbai, India',
    venue: 'Kala Ghoda Arts Precinct, Fort',
    date: 'January 10 – 18, 2026',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    artisans: ['Kanti Kumari', 'Parvati Manjhi', 'Shahnaz Begum'],
    status: 'ongoing'
  },
  {
    id: 'exh-3',
    title: 'Earth & Grass: Contemporary Craft Showcase',
    slug: 'earth-and-grass-patna',
    description: 'A dialogue between regional clay, wild wetland grass, and contemporary industrial product architecture inside the iconic modernist Bihar Museum campus.',
    location: 'Patna, Bihar',
    venue: 'Special Exhibitions Gallery, Bihar Museum, Bailey Road',
    date: 'August 12 – September 04, 2025',
    coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    artisans: ['Devi Devi', 'Sunita Devi'],
    status: 'concluded'
  }
];

export const STORIES_DATA: Story[] = [
  {
    id: 'story-1',
    title: 'The Grass of Gold: How Sikki Survives the Monsoons and Reinvents the Modern Home',
    slug: 'the-grass-of-gold-sikki',
    excerpt: 'Deep in the wetlands of northern Bihar, a wild reed is transformed with needle and hand into luminous, structural homeware.',
    content: `When the Gandak and Kosi rivers swell each monsoon, the marshes of northern Bihar turn into shimmering inland seas. As the floodwaters recede in October, a hardy wild reed shoots up from the damp silt: Sikki.

To the untrained eye, it is merely wild grass. But to master artisan Devi Devi and generations of women in Madhubani, it is 'Sone ki ghaas'—the grass of gold.

"We do not use chemicals or varnishes," explains Devi Devi, holding a golden filament up to the courtyard morning sun. "The natural silica inside the grass creates this luster when cured under the open sky. It is resilient, insect-repellent, and breathes with the weather."

Traditionally, a bride was sent to her marital home with Sikki baskets filled with sweets and sindoor. If her baskets were tightly coiled and watertight, she was revered as a master of patience.

Through Sakhi–Saheli, this ancient vernacular technique has met contemporary architectural design. Working with young industrial designers, Devi Devi and her collective scaled the traditional coil into wide, open-weave pendant lamp shades. Suspended in contemporary living rooms in Delhi, Bengaluru, and London, the shades cast intricate radial shadows—bringing the sacred geometry of Mithila into urban homes.`,
    category: 'Craft Knowledge',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    author: 'Sakhi–Saheli Editorial',
    artisanSlug: 'devi-devi',
    craftSlug: 'sikki-grass',
    publishedAt: 'February 14, 2026'
  },
  {
    id: 'story-2',
    title: 'Stitch by Stitch: How Sujuni Became the Secret Diary of Bihar’s Women',
    slug: 'how-sujuni-became-secret-diary',
    excerpt: 'Far from conventional ornamental embroidery, Sujuni needlework has served as a fearless visual chronicle of women’s lived realities.',
    content: `In the village of Bhusra in Muzaffarpur district, afternoon shadows lengthen across the courtyard as four generations of women sit on a jute charpai. Their needles move in synchronized rhythm, creating undulating ripples across unbleached cotton khadi.

This is Sujuni: a craft born not in royal ateliers, but in domestic intimacy.

Historically, mothers layered old, soft cotton saris with running stitches to cradle newborns. But in the late twentieth century, something transformative occurred. Women began using the needle as an instrument of social commentary.

"A woman could not always speak her mind in an open panchayat," shares Kanti Kumari, her fingers gliding over a motif of a girl cycling toward a village school. "So she drew it in thread. She stitched domestic arguments, droughts, the courage to leave difficult homes, and the joy of harvest."

Today, Sakhi–Saheli works with Kanti Kumari’s collective to ensure every artisan retains design sovereignty. Rather than forcing artisans into rigid corporate templates, we provide premium organic khadi and natural dyes, letting their authentic narratives take center stage in cushions, bed quilts, and framed museum panels.`,
    category: 'Artisan Stories',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    author: 'Ananya Sen, Design Anthropologist',
    artisanSlug: 'kanti-kumari',
    craftSlug: 'sujuni-embroidery',
    publishedAt: 'January 28, 2026'
  },
  {
    id: 'story-3',
    title: 'The Discipline of Kachni: Inside Urmila Devi’s Bamboo Nib Drawings',
    slug: 'the-discipline-of-kachni-mithila',
    excerpt: 'Why master artists in Jitwarpur reject mechanical rulers, relying on sheer breath and memory to create microscopic linear universes.',
    content: `Enter Urmila Devi’s workspace in Jitwarpur, and the first thing that strikes you is the absolute quiet. On a low wooden desk sits a jar of soot-black pigment ground from mustard oil lamp residue, and a handful of freshly shaved wild bamboo twigs.

Urmila Devi picks up a twig nib, dips it lightly into the soot ink, and touches the paper. Without a pencil outline or ruler, she draws parallel lines barely half a millimeter apart.

"In Kachni painting, your breath must be steady," she explains. "If your mind wanders to the cooking stove or the market, the line trembles. The rhythm comes from thirty years of waking before sunrise."

While commercial tourist markets are flooded with garish printed knockoffs, Sakhi–Saheli champions the uncompromising purity of authentic Mithila line work. We support Urmila Devi in working on archival 300 GSM cotton rag paper, ensuring her masterworks will survive for generations as authentic cultural treasures.`,
    category: 'Artisan Stories',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    author: 'Sakhi–Saheli Editorial',
    artisanSlug: 'urmila-devi',
    craftSlug: 'madhubani-mithila',
    publishedAt: 'January 12, 2026'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SS-2026-8492',
    userId: 'user-cust-1',
    customerName: 'Priya Narayanan',
    customerEmail: 'priya.n@example.com',
    customerPhone: '+91 98450 12345',
    items: [
      {
        productId: 'prod-1',
        productName: 'Sikki Sculptural Pendant Luminaire',
        productImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
        price: 4850,
        quantity: 1,
        artisanName: 'Devi Devi',
        craft: 'Sikki Grass Weaving'
      },
      {
        productId: 'prod-4',
        productName: 'Sikki Kautuk Handwoven Serving & Bread Vessel',
        productImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
        price: 1950,
        quantity: 1,
        artisanName: 'Devi Devi',
        craft: 'Sikki Grass Weaving'
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      name: 'Priya Narayanan',
      phone: '+91 98450 12345',
      street: '42, 4th Main, Defense Colony, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
      isDefault: true
    },
    subtotal: 6800,
    shippingFee: 0,
    discount: 500,
    total: 6300,
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    trackingNumber: 'DTDC-SS-9921448',
    estimatedDelivery: '2026-10-12',
    createdAt: '2026-10-02T10:14:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'SS-2026-8511',
    userId: 'user-cust-1',
    customerName: 'Priya Narayanan',
    customerEmail: 'priya.n@example.com',
    customerPhone: '+91 98450 12345',
    items: [
      {
        productId: 'prod-2',
        productName: 'Sujuni ‘Vriksha & Chidiya’ Hand-Quilted Cushion Cover',
        productImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        price: 2450,
        quantity: 2,
        artisanName: 'Kanti Kumari',
        craft: 'Sujuni Narrative Embroidery'
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      name: 'Priya Narayanan',
      phone: '+91 98450 12345',
      street: '42, 4th Main, Defense Colony, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
      isDefault: true
    },
    subtotal: 4900,
    shippingFee: 0,
    discount: 0,
    total: 4900,
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderStatus: 'crafting',
    trackingNumber: 'BLUEDART-SS-118834',
    estimatedDelivery: '2026-10-16',
    createdAt: '2026-10-05T14:32:00Z'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Arundhati Roy (Curator & Admin)',
    email: 'admin@sakhisaheli.org',
    role: 'admin',
    phone: '+91 98110 54321',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    addresses: [],
    wishlist: ['prod-1', 'prod-3'],
    isActive: true,
    createdAt: '2023-01-01'
  },
  {
    id: 'user-artisan',
    name: 'Devi Devi (Master Artisan)',
    email: 'artisan@sakhisaheli.org',
    role: 'artisan',
    phone: '+91 94312 88776',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    addresses: [],
    wishlist: [],
    isActive: true,
    createdAt: '2023-01-15'
  },
  {
    id: 'user-cust-1',
    name: 'Priya Narayanan',
    email: 'customer@example.com',
    role: 'customer',
    phone: '+91 98450 12345',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    addresses: [
      {
        id: 'addr-1',
        name: 'Priya Narayanan',
        phone: '+91 98450 12345',
        street: '42, 4th Main, Defense Colony, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
        isDefault: true
      }
    ],
    wishlist: ['prod-1', 'prod-6'],
    isActive: true,
    createdAt: '2024-01-01'
  }
];
