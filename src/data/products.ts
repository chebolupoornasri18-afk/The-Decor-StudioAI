import { Category, Product } from '../types';

import heroImage from '../assets/images/hero_luxury_indian_room_1790614637897.jpg';
import brassImage from '../assets/images/product_brass_nilavilakku_1790614654315.jpg';
import ceramicImage from '../assets/images/product_ceramic_urli_lotus_1790614669744.jpg';
import woodenImage from '../assets/images/product_wooden_jharokha_art_1790614682859.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'vases-pottery',
    name: 'Vases & Pottery',
    iconName: 'Urn',
    count: 14,
    description: 'Artisanal clay, terracotta urns and glazed studio ceramics',
    highlightTag: 'Master Potter',
  },
  {
    id: 'lamps-lighting',
    name: 'Lamps & Lighting',
    iconName: 'Flame',
    count: 18,
    description: 'Antique brass Vilakku, hanging lanterns & warm ambient lamps',
    highlightTag: 'Heirloom Brass',
  },
  {
    id: 'floral-decor',
    name: 'Floral Decor',
    iconName: 'Flower2',
    count: 12,
    description: 'Floating lotus vessels, urlis, and handcrafted botanical accents',
    highlightTag: 'Festive Charm',
  },
  {
    id: 'wall-art',
    name: 'Wall Art',
    iconName: 'Frame',
    count: 15,
    description: 'Carved temple jharokhas, Tanjore motifs and handloom tapestries',
    highlightTag: 'Heritage Craft',
  },
  {
    id: 'candles',
    name: 'Candles',
    iconName: 'Sparkles',
    count: 11,
    description: 'Mysore sandalwood, pure beeswax and brass vessel candles',
    highlightTag: 'Aromatics',
  },
  {
    id: 'plants-planters',
    name: 'Plants & Planters',
    iconName: 'Leaf',
    count: 10,
    description: 'Hammered brass pots and hand-thrown terracotta planters',
    highlightTag: 'Living Decor',
  },
  {
    id: 'wooden-crafts',
    name: 'Wooden Crafts',
    iconName: 'Trees',
    count: 16,
    description: 'Reclaimed teakwood, rosewood carved panels and figurines',
    highlightTag: 'Solid Teak',
  },
  {
    id: 'traditional-decor',
    name: 'Traditional Decor',
    iconName: 'Compass',
    count: 19,
    description: 'Sacred bells, ritual brassware and architectural antique accents',
    highlightTag: 'Sacred Art',
  },
  {
    id: 'table-decor',
    name: 'Table Decor',
    iconName: 'Sparkle',
    count: 13,
    description: 'Engraved brass trays, incense diffusers and stone coasters',
    highlightTag: 'Table Accents',
  },
  {
    id: 'gift-decor',
    name: 'Gift Decor',
    iconName: 'Gift',
    count: 9,
    description: 'Curated gift boxes with ceremonial diyas and kolam motifs',
    highlightTag: 'Bespoke Sets',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'brass-kuthu-vilakku',
    name: 'Mayil Nilavilakku (Peacock Diya Lamp)',
    categoryId: 'lamps-lighting',
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 84,
    description:
      'Handcrafted solid antique brass floor lamp featuring an auspicious peacock finial with traditional stepped oil tier.',
    detailedStory:
      'Cast in heavy brass by hereditary metalworkers in Nachiarkoil, Tamil Nadu. The graceful peacock crest symbolizes renewal, while the stepped five-wick reservoir yields a warm, mesmerizing radiance.',
    materials: 'Solid bell-metal brass, hand-buffed antique patina finish',
    dimensions: 'Height: 18 in, Base Diameter: 6 in, Weight: 2.4 kg',
    origin: 'Nachiarkoil, Tamil Nadu',
    image: brassImage,
    inStock: true,
    isBestseller: true,
    collectionIds: ['royal-maroon', 'heritage-home'],
    stylingTip:
      'Place at your entryway or pooja sanctuary, flanked with fresh jasmine buds or marigold petals.',
  },
  {
    id: 'ceramic-lotus-urli',
    name: 'Padmam Glazed Lotus Urli Bowl',
    categoryId: 'floral-decor',
    price: 2199,
    originalPrice: 2799,
    rating: 4.95,
    reviewCount: 112,
    description:
      'Wide artisanal glazed ceramic bowl in wine maroon with antique gold rim, created for floating fresh blossoms and candles.',
    detailedStory:
      'An ode to serene South Indian courtyard tanks. Designed with a gentle curved silhouette that holds water cool for hours, preserving the freshness of floating lotus stems and fragrant tea-lights.',
    materials:
      'Stoneware ceramic with deep maroon reduction glaze and brass rim accent',
    dimensions: 'Diameter: 12 in, Depth: 3.5 in, Weight: 1.8 kg',
    origin: 'Auroville, Puducherry',
    image: ceramicImage,
    inStock: true,
    isBestseller: true,
    collectionIds: ['royal-maroon', 'soft-serenity', 'earth-clay'],
    stylingTip:
      'Float 3 fresh white lotuses or water lilies with floating brass diyas on your coffee table or dining console.',
  },
  {
    id: 'carved-wooden-jharokha',
    name: 'Chettinad Teak Temple Jharokha Arch',
    categoryId: 'wall-art',
    price: 4899,
    originalPrice: 5999,
    rating: 4.88,
    reviewCount: 46,
    description:
      'Hand-carved architectural wall panel inspired by Chettinad palace windows, with distressed natural teak and brass rivets.',
    detailedStory:
      'Each jharokha panel is carved from reclaimed heritage teakwood by master woodworkers in Karaikudi. The intricate foliate border replicates classical Dravidian pillars.',
    materials:
      'Reclaimed plantation teakwood, antique iron rivets, natural beeswax polish',
    dimensions: 'Height: 24 in, Width: 16 in, Depth: 2 in, Weight: 3.2 kg',
    origin: 'Chettinad, Tamil Nadu',
    image: woodenImage,
    inStock: true,
    isBestseller: true,
    collectionIds: ['heritage-home', 'earth-clay'],
    stylingTip:
      'Mount as a standalone focal piece on a deep maroon accent wall or place a brass diya on the central inner sill.',
  },
  {
    id: 'thookku-vilakku-hanging',
    name: 'Kerala Thookku Vilakku (Hanging Diya)',
    categoryId: 'lamps-lighting',
    price: 2499,
    originalPrice: 2999,
    rating: 4.85,
    reviewCount: 62,
    description:
      'Suspended brass oil lamp with linked brass chain and an ornate ornamental canopy bell.',
    detailedStory:
      'Traditional Kerala bell-metal lamp cast using the lost-wax technique. The heavy linked chain features a hand-chiseled swan connector that suspends smoothly from ceilings or wooden rafters.',
    materials: 'Pure cast brass with golden antique lacquer',
    dimensions: 'Bowl Diameter: 6 in, Chain Length: 24 in, Total Weight: 1.6 kg',
    origin: 'Mannar, Kerala',
    image: brassImage,
    inStock: true,
    collectionIds: ['royal-maroon', 'heritage-home'],
    stylingTip:
      'Hang beside a doorway or on a balcony beam with a warm amber bulb or aromatic sesame oil wick.',
  },
  {
    id: 'terracotta-chola-vase',
    name: 'Chola Fluted Terracotta Amphora',
    categoryId: 'vases-pottery',
    price: 1499,
    originalPrice: 1899,
    rating: 4.79,
    reviewCount: 39,
    description:
      'Wheel-thrown earthen terracotta vase with subtle hand-burnished ochre slip and ribbed ridges.',
    detailedStory:
      'Crafted using Cauvery riverbed clay, sun-dried and wood-fired in traditional brick kilns. The earthen surface develops a velvety tactile texture that complements dried pampas or fresh green branches.',
    materials: 'Natural river clay, hand-burnished matte slip',
    dimensions: 'Height: 12 in, Width: 7 in, Weight: 1.4 kg',
    origin: 'Thanjavur, Tamil Nadu',
    image: heroImage,
    inStock: true,
    collectionIds: ['earth-clay', 'modern-tradition'],
    stylingTip:
      'Pair with dried palm fronds or white baby’s breath against a dark maroon or soft beige backdrop.',
  },
  {
    id: 'mysore-sandalwood-candle',
    name: 'Mysore Sandal & Vetiver Brass Candle',
    categoryId: 'candles',
    price: 899,
    originalPrice: 1199,
    rating: 4.92,
    reviewCount: 145,
    description:
      'Hand-poured coconut and beeswax candle inside an engraved reusable brass vessel with warm woody notes.',
    detailedStory:
      'Scented with pure natural Mysore sandalwood oil, khus (vetiver) roots, and sweet cardamom. Once the candle finishes its 45-hour clean burn, the solid brass cup serves as an elegant trinket or vermilion pot.',
    materials: 'Natural soy-coconut wax, cotton wick, solid spun brass tumbler',
    dimensions: 'Diameter: 3.2 in, Height: 3.5 in, Burn Time: ~45 hours',
    origin: 'Mysuru, Karnataka',
    image: ceramicImage,
    inStock: true,
    isBestseller: true,
    collectionIds: ['royal-maroon', 'soft-serenity'],
    stylingTip:
      'Light 20 minutes before guests arrive to imbue the foyer with the tranquil scent of an ancient temple sanctuary.',
  },
  {
    id: 'tanjore-gold-foliage-frame',
    name: 'Padma Mandala Gold Foil Framed Art',
    categoryId: 'wall-art',
    price: 3899,
    originalPrice: 4599,
    rating: 4.96,
    reviewCount: 52,
    description:
      'Intricate 22K gold leaf and semi-precious stone work depicting a cosmic lotus kolam in a teakwood frame.',
    detailedStory:
      'Executed in the classical Thanjavur school tradition with hand-raised gesso relief (sukku paste), gilded with authentic 22-karat gold leaf foil, and set in a rich dark maroon velvet mount.',
    materials:
      '22K gold foil, natural gum gesso, seasoned teakwood frame, museum acrylic',
    dimensions: 'Frame: 14 in x 14 in, Depth: 1.5 in',
    origin: 'Thanjavur, Tamil Nadu',
    image: woodenImage,
    inStock: true,
    collectionIds: ['royal-maroon', 'heritage-home'],
    stylingTip:
      'Position under directional spotlighting to catch the warm, radiant gleam of genuine gold leaf.',
  },
  {
    id: 'hammered-brass-planter',
    name: 'Veda Hammered Brass Planter with Teak Stand',
    categoryId: 'plants-planters',
    price: 2699,
    originalPrice: 3299,
    rating: 4.84,
    reviewCount: 38,
    description:
      'Hand-hammered brass cylindrical vessel raised upon a minimalist four-legged cross teak stand.',
    detailedStory:
      'Combines modern interior proportions with centuries-old metal raising techniques. The subtle hand-hammered dimples catch sunlight like ripples on water.',
    materials:
      'Brushed brass with protective anti-tarnish coat, natural oiled teakwood base',
    dimensions: 'Total Height: 15 in, Pot Diameter: 8.5 in, Stand Height: 8 in',
    origin: 'Moradabad & Bengaluru',
    image: heroImage,
    inStock: true,
    collectionIds: ['modern-tradition', 'earth-clay'],
    stylingTip:
      'Ideal for snake plants, fiddle leaf figs, or cascading money plants in a bright living room corner.',
  },
  {
    id: 'rosewood-chettinad-spice-chest',
    name: 'Aanai Carved Rosewood Keepsake Box',
    categoryId: 'wooden-crafts',
    price: 1899,
    originalPrice: 2399,
    rating: 4.88,
    reviewCount: 29,
    description:
      'Compact hand-carved rosewood treasure box with brass hinges and traditional floral Kolam etchings on the lid.',
    detailedStory:
      'Inspired by traditional Chettinad marriage dowry chests. Features dovetail corner joinery, hand-carved floral vine relief, and an antique brass latch.',
    materials: 'Sustainably sourced Indian Rosewood (Sheesham), solid brass hardware',
    dimensions: 'Length: 8 in, Width: 5.5 in, Height: 4 in',
    origin: 'Madurai, Tamil Nadu',
    image: woodenImage,
    inStock: true,
    collectionIds: ['heritage-home', 'modern-tradition'],
    stylingTip:
      'Use on a study desk or vanity table for jewelry, prayer beads, or stationery essentials.',
  },
  {
    id: 'sacred-brass-nandi',
    name: 'Aura Antique Brass Nandi Figurine',
    categoryId: 'traditional-decor',
    price: 1699,
    originalPrice: 2099,
    rating: 4.94,
    reviewCount: 71,
    description:
      'Sculpted brass representation of the sacred Nandi bull with bell collar and peaceful meditative demeanor.',
    detailedStory:
      'Cast with rich Dravidian proportions. The bell necklace, embroidered blanket, and gentle expression create an atmosphere of profound serenity and grounding energy in the home.',
    materials: 'High-density cast brass, antique hand-rubbed wax finish',
    dimensions: 'Length: 6 in, Height: 4.5 in, Weight: 1.1 kg',
    origin: 'Kumbakonam, Tamil Nadu',
    image: brassImage,
    inStock: true,
    collectionIds: ['royal-maroon', 'heritage-home'],
    stylingTip:
      'Place facing the main entrance or on a pooja console beside an incense burner.',
  },
  {
    id: 'brass-inlay-coasters',
    name: 'Kolam Inlay White Banswara Marble Coasters (Set of 4)',
    categoryId: 'table-decor',
    price: 1199,
    originalPrice: 1499,
    rating: 4.78,
    reviewCount: 54,
    description:
      'Pure white Rajasthan marble discs meticulously inlaid with delicate brass Kolam geometric line motifs.',
    detailedStory:
      'Reviving the centuries-old Pietra Dura inlay technique. Thin filaments of solid brass are embedded into carved grooves of polished natural white marble.',
    materials: 'White Banswara marble, solid brass wire inlay, cork backing',
    dimensions: 'Diameter: 4 in each, Thickness: 0.4 in, Set of 4',
    origin: 'Makrana, Rajasthan',
    image: ceramicImage,
    inStock: true,
    collectionIds: ['modern-tradition', 'soft-serenity'],
    stylingTip:
      'Elevate your evening tea service or cocktail bar with these cool, protective stone discs.',
  },
  {
    id: 'royal-kolam-gift-hamper',
    name: 'The Heritage Kolam Celebration Box',
    categoryId: 'gift-decor',
    price: 2999,
    originalPrice: 3799,
    rating: 5.0,
    reviewCount: 33,
    description:
      'Bespoke silk-wrapped gift box featuring a pair of brass lotus diyas, Mysore sandalwood candle, and brass matchbox holder.',
    detailedStory:
      'The quintessential housewarming or festive blessing. Encased in a rigid dark maroon gift chest adorned with gold-stamped kolam patterns and tied with raw tussar silk ribbon.',
    materials: 'Cast brass pair of diyas, pure soy candle, artisanal presentation box',
    dimensions: 'Box: 12 in x 9 in x 4 in',
    origin: 'Hand-assembled in Chennai',
    image: heroImage,
    inStock: true,
    isBestseller: true,
    collectionIds: ['royal-maroon', 'soft-serenity'],
    stylingTip:
      'The ultimate luxury gift for Diwali, weddings, housewarming, or milestone anniversaries.',
  },
  {
    id: 'ceramic-fluted-bud-vase',
    name: 'Malabar Ivory Fluted Bud Vase',
    categoryId: 'vases-pottery',
    price: 999,
    originalPrice: 1299,
    rating: 4.75,
    reviewCount: 42,
    description:
      'Matte ivory stoneware vessel with graceful vertical fluting and a slender neck for solitary botanical stems.',
    detailedStory:
      'Hand-thrown on a slow potter’s wheel in Auroville. The tactile chalky ivory glaze is inspired by temple jasmine blossoms and traditional white rice flour kolam powder.',
    materials: 'Stoneware clay, mineral matte chalk glaze',
    dimensions: 'Height: 8.5 in, Base: 3.8 in, Opening: 1.2 in',
    origin: 'Auroville, Puducherry',
    image: ceramicImage,
    inStock: true,
    collectionIds: ['soft-serenity', 'modern-tradition'],
    stylingTip:
      'Display a single tuberose stalk or monstera leaf on a bedside nightstand or reading bookshelf.',
  },
  {
    id: 'brass-dhoop-burner',
    name: 'Mayur Brass Dhoop Incense Chalice',
    categoryId: 'table-decor',
    price: 1399,
    originalPrice: 1799,
    rating: 4.89,
    reviewCount: 67,
    description:
      'Perforated brass incense burner with a peacock lid that diffuses aromatic smoke into intricate dancing spirals.',
    detailedStory:
      'Designed with traditional South Indian ventilation fretwork. When natural sambrani or dhoop cones are lit inside, fragrant smoke curls through the lattice openings.',
    materials: 'Cast brass with heat-resistant wooden handle knob',
    dimensions: 'Height: 7 in, Diameter: 4.5 in, Weight: 680 g',
    origin: 'Swamimalai, Tamil Nadu',
    image: brassImage,
    inStock: true,
    collectionIds: ['royal-maroon', 'heritage-home'],
    stylingTip:
      'Burn frankincense or sambrani on Friday evenings to cleanse the living space with tranquil aromatic warmth.',
  },
  {
    id: 'terracotta-diya-candelabra',
    name: 'Athangudi Terracotta Diya Tier',
    categoryId: 'candles',
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 28,
    description:
      'Stackable 3-tier baked terracotta candelabra with hand-painted white rice-paste Kolam borders.',
    detailedStory:
      'Direct from traditional artisan potters of Sivaganga. Each diya reservoir is soaked in organic sesame oil before firing to create a gentle burn and prevent oil seepage.',
    materials: 'Natural baked terracotta, organic rice paste white paint',
    dimensions: 'Height: 5.5 in, Diameter: 6 in',
    origin: 'Chettinad, Tamil Nadu',
    image: heroImage,
    inStock: true,
    collectionIds: ['earth-clay'],
    stylingTip:
      'Arrange on your balcony step or dining center with fresh yellow chrysanthemum heads.',
  },
  {
    id: 'brass-peacock-door-handle',
    name: 'Dravidian Peacock Brass Door Knocker',
    categoryId: 'traditional-decor',
    price: 1899,
    originalPrice: 2299,
    rating: 4.82,
    reviewCount: 19,
    description:
      'Substantial solid brass architectural door pull with sculpted dancing peacock and floral base plate.',
    detailedStory:
      'Cast with heavy hand-worked details. Suitable for main entrance wooden doors, temple room doors, or as a statement wall-mounted art object.',
    materials: 'Heavy brass, mounting hardware included',
    dimensions: 'Length: 9.5 in, Width: 3.5 in, Projection: 2.2 in',
    origin: 'Madurai, Tamil Nadu',
    image: brassImage,
    inStock: true,
    collectionIds: ['heritage-home', 'royal-maroon'],
    stylingTip:
      'Install on a solid teakwood entrance door to greet arriving family and guests with majestic grandeur.',
  },
];
