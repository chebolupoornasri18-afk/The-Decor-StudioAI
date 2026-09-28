import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Product knowledge base for the AI Assistant
const CATALOG_ITEMS = [
  { id: 'brass-kuthu-vilakku', name: 'Mayil Nilavilakku (Peacock Diya Lamp)', category: 'Lamps & Lighting', price: 3499, style: 'Traditional, Heritage, Luxury', room: 'Living Room, Pooja, Foyer' },
  { id: 'ceramic-lotus-urli', name: 'Padmam Glazed Lotus Urli Bowl', category: 'Floral Decor', price: 2199, style: 'Traditional, Soft Serenity, Earth & Clay', room: 'Living Room, Dining, Bedroom' },
  { id: 'carved-wooden-jharokha', name: 'Chettinad Teak Temple Jharokha Arch', category: 'Wall Art', price: 4899, style: 'Traditional, Heritage, Vintage', room: 'Living Room, Bedroom, Foyer' },
  { id: 'thookku-vilakku-hanging', name: 'Kerala Thookku Vilakku (Hanging Diya)', category: 'Lamps & Lighting', price: 2499, style: 'Traditional, Royal, Heritage', room: 'Balcony, Foyer, Pooja' },
  { id: 'terracotta-chola-vase', name: 'Chola Fluted Terracotta Amphora', category: 'Vases & Pottery', price: 1499, style: 'Earthy, Boho, Minimal', room: 'Living Room, Bedroom, Dining' },
  { id: 'mysore-sandalwood-candle', name: 'Mysore Sandal & Vetiver Brass Candle', category: 'Candles', price: 899, style: 'Cozy, Soft Serenity, Luxury', room: 'Bedroom, Living Room, Bathroom' },
  { id: 'tanjore-gold-foliage-frame', name: 'Padma Mandala Gold Foil Framed Art', category: 'Wall Art', price: 3899, style: 'Luxury, Heritage, Royal', room: 'Living Room, Pooja, Bedroom' },
  { id: 'hammered-brass-planter', name: 'Veda Hammered Brass Planter with Teak Stand', category: 'Plants & Planters', price: 2699, style: 'Modern, Traditional, Earthy', room: 'Living Room, Balcony, Study' },
  { id: 'rosewood-chettinad-spice-chest', name: 'Aanai Carved Rosewood Keepsake Box', category: 'Wooden Crafts', price: 1899, style: 'Heritage, Vintage, Cozy', room: 'Bedroom, Study, Foyer' },
  { id: 'sacred-brass-nandi', name: 'Aura Antique Brass Nandi Figurine', category: 'Traditional Decor', price: 1699, style: 'Traditional, Sacred, Heritage', room: 'Pooja, Foyer, Living Room' },
  { id: 'brass-inlay-coasters', name: 'Kolam Inlay White Banswara Marble Coasters (Set of 4)', category: 'Table Decor', price: 1199, style: 'Modern, Minimal, Luxury', room: 'Dining, Living Room' },
  { id: 'royal-kolam-gift-hamper', name: 'The Heritage Kolam Celebration Box', category: 'Gift Decor', price: 2999, style: 'Royal, Traditional, Luxury', room: 'Living Room, Pooja' },
  { id: 'ceramic-fluted-bud-vase', name: 'Malabar Ivory Fluted Bud Vase', category: 'Vases & Pottery', price: 999, style: 'Soft Serenity, Minimal, Cozy', room: 'Bedroom, Study, Dining' },
  { id: 'brass-dhoop-burner', name: 'Mayur Brass Dhoop Incense Chalice', category: 'Table Decor', price: 1399, style: 'Traditional, Sacred, Cozy', room: 'Pooja, Living Room' },
  { id: 'terracotta-diya-candelabra', name: 'Athangudi Terracotta Diya Tier', category: 'Candles & Diya', price: 799, style: 'Earthy, Traditional, Festive', room: 'Balcony, Foyer, Living Room' },
  { id: 'brass-peacock-door-handle', name: 'Dravidian Peacock Brass Door Knocker', category: 'Traditional Decor', price: 1899, style: 'Heritage, Royal', room: 'Entrance, Foyer' },
];

/**
 * Intelligent fallback generator when Gemini API is offline or key is unconfigured.
 * Guarantees that users always get a responsive, budget-friendly decor plan!
 */
function generateCuratedDecorPlan(roomType: string, aesthetic: string, budget: number, preferences?: string) {
  const normAesthetic = (aesthetic || 'traditional').toLowerCase();
  const room = roomType || 'Living Room';
  const targetBudget = budget > 0 ? budget : 8000;

  // Filter items suitable for room and aesthetic
  let pool = CATALOG_ITEMS.filter((item) => {
    return item.style.toLowerCase().includes(normAesthetic.slice(0, 4)) ||
           item.room.toLowerCase().includes(room.toLowerCase().slice(0, 4));
  });

  if (pool.length < 3) {
    pool = [...CATALOG_ITEMS];
  }

  // Sort by price ascending to assemble within budget
  pool.sort((a, b) => a.price - b.price);

  const selectedItems: any[] = [];
  let currentTotal = 0;

  for (const item of pool) {
    if (currentTotal + item.price <= targetBudget) {
      selectedItems.push({
        productId: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        reason: `Complements the ${aesthetic} ambiance with authentic craftsmanship and warm metal tones.`,
        roomPlacement: `Ideal focal placement in your ${room}.`,
      });
      currentTotal += item.price;
    }
    if (selectedItems.length >= 4) break;
  }

  // If even lowest item is above budget or 0 items selected, take at least 1-2 lowest
  if (selectedItems.length === 0) {
    const cheapest = pool[0];
    selectedItems.push({
      productId: cheapest.id,
      name: cheapest.name,
      category: cheapest.category,
      price: cheapest.price,
      reason: `A standout introductory heirloom item tailored for your ${room}.`,
      roomPlacement: `Anchor placement on your primary shelf or table.`,
    });
    currentTotal = cheapest.price;
  }

  const diff = targetBudget - currentTotal;
  const budgetStatus = diff >= 0
    ? `Looks beautiful and stays within your budget with ₹${diff.toLocaleString('en-IN')} remaining.`
    : `Curated combination close to your budget (₹${currentTotal.toLocaleString('en-IN')}).`;

  return {
    collectionTitle: `Your ${aesthetic} ${room} Collection`,
    aestheticSummary: `A tranquil union of South Indian heritage motifs and modern spatial balance, specially scaled for your ${room}.`,
    designPhilosophy: `Ground the space with a solid anchor piece, layer gentle ambient candlelight, and punctuate with auspicious white kolam accents.`,
    items: selectedItems,
    totalCost: currentTotal,
    budgetStatus,
    stylingAdvice: `Keep walls in deep wine maroon or soft ivory, arrange fresh jasmine buds around the brass elements, and position lighting at varying heights.`,
    colorHarmony: [
      { name: 'Palace Maroon', hex: '#290812' },
      { name: 'Temple Antique Brass', hex: '#D4AF37' },
      { name: 'Kolam Rice White', hex: '#FFFFFF' },
      { name: 'Earthy Terracotta', hex: '#9E4738' },
    ],
    suggestedAlternative: `Consider introducing our Malabar Ivory Fluted Vase (₹999) if you desire an extra delicate floral touch.`,
  };
}

// POST endpoint for AI Decor Plan
app.post('/api/ai-decor-plan', async (req: Request, res: Response) => {
  const { roomType, aesthetic, budget, specificPreferences } = req.body;

  const room = roomType || 'Living Room';
  const style = aesthetic || 'Traditional';
  const targetBudget = Number(budget) || 7500;

  if (!ai || !apiKey) {
    // Graceful fallback with rich curated response
    const fallback = generateCuratedDecorPlan(room, style, targetBudget, specificPreferences);
    return res.json(fallback);
  }

  try {
    const prompt = `You are the chief interior styling AI for "The Decor Studio", a luxury South Indian and modern home decor brand.
The user wants a personalized decor plan:
- Room: ${room}
- Aesthetic: ${style}
- Budget: ₹${targetBudget}
- Additional preferences: ${specificPreferences || 'None'}

Here is our catalog of available authentic items with exact prices in ₹ and IDs:
${JSON.stringify(CATALOG_ITEMS, null, 2)}

Instructions:
1. Select 3 to 5 matching products from the catalog that harmoniously elevate the ${room} in the ${style} aesthetic.
2. Ensure the total price of all selected items STRICTLY does not exceed ₹${targetBudget} (or stays as close as humanly possible if budget is very tight).
3. Calculate the exact numeric sum as totalCost.
4. For each item, provide the matching productId, exact name, category, exact price, a compelling reason why it was chosen, and its specific room placement.
5. Create an evocative collectionTitle (e.g. "Your Traditional Bedroom Collection").
6. Provide an encouraging budgetStatus (e.g. "Looks beautiful and stays within your budget with ₹X remaining").
7. Offer practical South Indian interior styling advice.
8. Return a 4-color harmony palette with name and hex code.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert luxury interior designer specializing in blending South Indian heritage decor with contemporary elegance. Always return strictly valid JSON matching the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            collectionTitle: { type: Type.STRING },
            aestheticSummary: { type: Type.STRING },
            designPhilosophy: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  productId: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  reason: { type: Type.STRING },
                  roomPlacement: { type: Type.STRING },
                },
                required: ['productId', 'name', 'category', 'price', 'reason', 'roomPlacement'],
              },
            },
            totalCost: { type: Type.NUMBER },
            budgetStatus: { type: Type.STRING },
            stylingAdvice: { type: Type.STRING },
            colorHarmony: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                },
                required: ['name', 'hex'],
              },
            },
            suggestedAlternative: { type: Type.STRING },
          },
          required: [
            'collectionTitle',
            'aestheticSummary',
            'designPhilosophy',
            'items',
            'totalCost',
            'budgetStatus',
            'stylingAdvice',
            'colorHarmony',
          ],
        },
      },
    });

    const jsonText = response.text?.trim() || '';
    const parsed = JSON.parse(jsonText);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Gemini AI decor plan error, using curated fallback:', err?.message);
    const fallback = generateCuratedDecorPlan(room, style, targetBudget, specificPreferences);
    return res.json(fallback);
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Decor Studio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
