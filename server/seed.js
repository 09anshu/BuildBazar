const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const products = [
  // ══════════════════════════════════════
  // ── CEMENT (8 products) ──
  // ══════════════════════════════════════
  {
    name: 'UltraBond OPC Cement 50 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'High quality Ordinary Portland Cement suitable for all general construction work. Provides superior strength and durability for foundations, columns, beams, and slabs.',
    price: 365,
    countInStock: 500,
    rating: 4.5,
    numReviews: 28,
  },
  {
    name: 'ACC Gold Cement 50 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'ACC',
    category: 'Cement',
    description: 'Premium quality cement with superior binding properties. Ideal for high-rise buildings and heavy-duty construction projects.',
    price: 390,
    countInStock: 350,
    rating: 4.3,
    numReviews: 19,
  },
  {
    name: 'UltraTech PPC Cement 50 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'Portland Pozzolana Cement with excellent workability and long-term strength. Reduces heat of hydration and resists sulfate attack.',
    price: 345,
    countInStock: 420,
    rating: 4.4,
    numReviews: 34,
  },
  {
    name: 'Ambuja Cement 50 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'ACC',
    category: 'Cement',
    description: 'Known for its consistent quality and strength. Suitable for all types of construction including residential, commercial and industrial buildings.',
    price: 375,
    countInStock: 280,
    rating: 4.2,
    numReviews: 22,
  },
  {
    name: 'TMT Band OPC Cement 50 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'Fast setting OPC cement ideal for quick construction. Achieves high early strength making it perfect for pre-cast concrete elements.',
    price: 1150,
    countInStock: 150,
    rating: 4.6,
    numReviews: 12,
  },
  {
    name: 'White Cement 25 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'Premium white cement for decorative applications, tile joints, and smooth finishing. High whiteness index for aesthetic construction work.',
    price: 680,
    countInStock: 200,
    rating: 4.3,
    numReviews: 15,
  },
  {
    name: 'Rapid Set Cement 25 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'ACC',
    category: 'Cement',
    description: 'Fast-setting cement that achieves working strength in 1 hour. Ideal for emergency repairs, patching, and time-critical construction.',
    price: 520,
    countInStock: 180,
    rating: 4.1,
    numReviews: 9,
  },
  {
    name: 'Waterproof Cement 50 kg bag',
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'Integral waterproofing cement for basements, water tanks, and wet areas. Reduces water permeability by up to 90%.',
    price: 475,
    countInStock: 320,
    rating: 4.5,
    numReviews: 20,
  },

  // ══════════════════════════════════════
  // ── STEEL (6 products) ──
  // ══════════════════════════════════════
  {
    name: 'TMT Rebar 12 mm Per bundle',
    image: 'https://images.unsplash.com/photo-1516747773440-cf6f3d6f6c8e?q=80&w=800&auto=format&fit=crop',
    brand: 'Tata Steel',
    category: 'Steel',
    description: 'High strength Fe-500D grade TMT rebars. Excellent bendability and weldability. Corrosion resistant with superior rib pattern.',
    price: 17950,
    countInStock: 120,
    rating: 4.7,
    numReviews: 42,
  },
  {
    name: 'TMT Rebar 8 mm Per bundle',
    image: 'https://images.unsplash.com/photo-1516747773440-cf6f3d6f6c8e?q=80&w=800&auto=format&fit=crop',
    brand: 'Tata Steel',
    category: 'Steel',
    description: 'Ideal for light reinforcement work in slabs and partition walls. Fe-500D grade with excellent ductility and earthquake resistance.',
    price: 12500,
    countInStock: 200,
    rating: 4.5,
    numReviews: 31,
  },
  {
    name: 'Steel I-Beam 150mm x 6m',
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=800&auto=format&fit=crop',
    brand: 'Tata Steel',
    category: 'Steel',
    description: 'Structural steel I-beam for heavy load-bearing applications. Perfect for commercial building construction, bridges, and industrial structures.',
    price: 28500,
    countInStock: 45,
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: 'Binding Wire 20 Gauge 25 kg',
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=800&auto=format&fit=crop',
    brand: 'Tata Steel',
    category: 'Steel',
    description: 'Galvanized binding wire for tying reinforcement bars. Soft annealed for easy handling and high tensile strength.',
    price: 2800,
    countInStock: 300,
    rating: 4.1,
    numReviews: 18,
  },
  {
    name: 'TMT Rebar 16 mm Per bundle',
    image: 'https://images.unsplash.com/photo-1516747773440-cf6f3d6f6c8e?q=80&w=800&auto=format&fit=crop',
    brand: 'Tata Steel',
    category: 'Steel',
    description: 'Heavy-duty TMT rebars for columns, beams, and foundations. Fe-500D grade with CRS technology for superior corrosion resistance.',
    price: 22400,
    countInStock: 90,
    rating: 4.6,
    numReviews: 25,
  },
  {
    name: 'MS Angle 50x50x6 mm 6m Length',
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=800&auto=format&fit=crop',
    brand: 'Tata Steel',
    category: 'Steel',
    description: 'Mild steel angle bar for structural framing, fabrication, and support brackets. Hot-rolled with clean finish.',
    price: 3200,
    countInStock: 160,
    rating: 4.3,
    numReviews: 12,
  },

  // ══════════════════════════════════════
  // ── TOOLS (7 products) ──
  // ══════════════════════════════════════
  {
    name: 'Site Drill Pro Kit 13mm',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Professional grade 13mm impact drill kit with 100+ accessories. Variable speed control, reverse function, and hammer action.',
    price: 8499,
    countInStock: 65,
    rating: 4.6,
    numReviews: 53,
  },
  {
    name: 'Angle Grinder 4 inch 850W',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Heavy-duty angle grinder for cutting and grinding metal, stone, and concrete. Anti-vibration handle and dust protection.',
    price: 3250,
    countInStock: 110,
    rating: 4.4,
    numReviews: 38,
  },
  {
    name: 'Digital Laser Level 30m Range',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Self-leveling cross-line laser with 30m range. Green laser for high visibility. Includes mounting clamp and carry case.',
    price: 5999,
    countInStock: 40,
    rating: 4.7,
    numReviews: 21,
  },
  {
    name: 'Concrete Vibrator 2HP',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Electric concrete vibrator with flexible shaft. Essential for removing air pockets from freshly poured concrete.',
    price: 12500,
    countInStock: 25,
    rating: 4.3,
    numReviews: 14,
  },
  {
    name: 'Professional Tool Belt Set',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Heavy-duty leather tool belt with 12 pockets. Includes hammer loop, tape measure holder, and adjustable waist strap.',
    price: 1850,
    countInStock: 150,
    rating: 4.2,
    numReviews: 27,
  },
  {
    name: 'Circular Saw 7 inch 1500W',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Powerful circular saw for cutting wood, plywood, and MDF boards. Adjustable cutting depth and bevel angle. Dust blower for clear cut line.',
    price: 6800,
    countInStock: 55,
    rating: 4.5,
    numReviews: 30,
  },
  {
    name: 'Demolition Hammer 5kg 1100W',
    image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?q=80&w=800&auto=format&fit=crop',
    brand: 'Bosch',
    category: 'Tools',
    description: 'Heavy-duty demolition hammer for breaking concrete, chipping tiles, and channelling. Anti-vibration system for operator comfort.',
    price: 15999,
    countInStock: 20,
    rating: 4.6,
    numReviews: 11,
  },

  // ══════════════════════════════════════
  // ── MACHINERY (5 products) ──
  // ══════════════════════════════════════
  {
    name: 'Concrete Mixer 10 CFT',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Machinery',
    description: 'Heavy-duty concrete mixer with 10 cubic feet drum capacity. Diesel powered engine for remote site operation.',
    price: 85000,
    countInStock: 8,
    rating: 4.5,
    numReviews: 9,
  },
  {
    name: 'Bar Bending Machine 32mm',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Machinery',
    description: 'Electric bar bending machine capable of bending TMT bars up to 32mm diameter. Adjustable angle settings for precise bends.',
    price: 45000,
    countInStock: 12,
    rating: 4.4,
    numReviews: 7,
  },
  {
    name: 'Plate Compactor 5.5HP',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Machinery',
    description: 'Reversible plate compactor for compacting soil, gravel, and asphalt. 5.5HP petrol engine with centrifugal force of 20kN.',
    price: 38500,
    countInStock: 15,
    rating: 4.3,
    numReviews: 11,
  },
  {
    name: 'Tower Hoist 500 kg Capacity',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Machinery',
    description: 'Electric tower hoist for lifting construction materials to elevated floors. 500kg capacity with 30m height reach. Safety brake system.',
    price: 72000,
    countInStock: 6,
    rating: 4.5,
    numReviews: 5,
  },
  {
    name: 'Mini Excavator 1.5 Ton',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Machinery',
    description: 'Compact mini excavator ideal for tight spaces. 1.5 ton operating weight with rubber tracks. Perfect for trenching, digging, and grading.',
    price: 95000,
    countInStock: 3,
    rating: 4.7,
    numReviews: 4,
  },

  // ══════════════════════════════════════
  // ── SAFETY EQUIPMENT (10 products) ──
  // ══════════════════════════════════════
  {
    name: 'Safety Helmet ISI Certified',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Karam',
    category: 'Safety',
    description: 'ISI certified industrial safety helmet with adjustable ratchet headband. High impact ABS shell with ventilation and sweat band.',
    price: 450,
    countInStock: 500,
    rating: 4.5,
    numReviews: 67,
  },
  {
    name: 'Safety Harness Full Body',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Karam',
    category: 'Safety',
    description: 'Full body safety harness with double lanyard and shock absorber. EN 361 certified for working at heights. Adjustable chest and leg straps.',
    price: 3200,
    countInStock: 80,
    rating: 4.6,
    numReviews: 23,
  },
  {
    name: 'High Visibility Safety Vest Pack of 5',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Karam',
    category: 'Safety',
    description: 'Reflective safety vests with 2-inch reflective strips. EN 20471 Class 2 certified. Breathable mesh fabric for all-day comfort on site.',
    price: 850,
    countInStock: 300,
    rating: 4.3,
    numReviews: 45,
  },
  {
    name: 'Industrial Safety Shoes Steel Toe',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Karam',
    category: 'Safety',
    description: 'Steel toe safety shoes with anti-slip sole. Oil and acid resistant. ISI certified for construction sites with ankle protection.',
    price: 1650,
    countInStock: 120,
    rating: 4.4,
    numReviews: 33,
  },
  {
    name: 'Safety Goggles Anti-Fog Clear',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: '3M',
    category: 'Safety',
    description: 'Chemical splash and impact resistant safety goggles. Anti-fog and anti-scratch polycarbonate lens. Indirect ventilation for comfort.',
    price: 320,
    countInStock: 400,
    rating: 4.3,
    numReviews: 52,
  },
  {
    name: 'Ear Muffs Noise Cancelling 28dB',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: '3M',
    category: 'Safety',
    description: 'Professional hearing protection ear muffs with 28dB noise reduction. Padded headband and cushioned ear cups for all-day comfort on noisy sites.',
    price: 780,
    countInStock: 200,
    rating: 4.5,
    numReviews: 29,
  },
  {
    name: 'Dust Mask N95 Pack of 20',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: '3M',
    category: 'Safety',
    description: 'N95 rated particulate respirator masks for dust, pollen, and mist protection. Adjustable nose clip and breathable design for long use.',
    price: 550,
    countInStock: 600,
    rating: 4.4,
    numReviews: 71,
  },
  {
    name: 'Cut Resistant Gloves Pack of 3',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Karam',
    category: 'Safety',
    description: 'Level 5 cut resistant gloves with nitrile palm coating. Ideal for handling steel rebar, sheet metal, and glass. Touchscreen compatible.',
    price: 650,
    countInStock: 350,
    rating: 4.2,
    numReviews: 38,
  },
  {
    name: 'First Aid Kit 50-Person Site Pack',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: '3M',
    category: 'Safety',
    description: 'Comprehensive 120-piece first aid kit for construction sites. Includes bandages, burn gel, eye wash, splints, and CPR mask. Wall-mountable case.',
    price: 2200,
    countInStock: 75,
    rating: 4.6,
    numReviews: 16,
  },
  {
    name: 'Safety Net 10m x 5m Construction Grade',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Karam',
    category: 'Safety',
    description: 'Heavy-duty HDPE construction safety net for fall protection and debris containment. UV stabilized with reinforced edges and tie ropes.',
    price: 3800,
    countInStock: 50,
    rating: 4.4,
    numReviews: 12,
  },

  // ══════════════════════════════════════
  // ── ELECTRICAL (6 products) ──
  // ══════════════════════════════════════
  {
    name: 'Copper Wire 2.5 sqmm 90m Roll',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Havells',
    category: 'Electrical',
    description: 'FR-LSH insulated single core copper wire. Flame retardant and low smoke. ISI certified for domestic and commercial wiring.',
    price: 4200,
    countInStock: 180,
    rating: 4.6,
    numReviews: 44,
  },
  {
    name: 'MCB Distribution Board 8-Way',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Havells',
    category: 'Electrical',
    description: 'Double door MCB distribution board with 8-way capacity. Powder coated CRCA sheet metal body. Pre-wired neutral and earth bars.',
    price: 1850,
    countInStock: 90,
    rating: 4.4,
    numReviews: 22,
  },
  {
    name: 'PVC Conduit Pipe 25mm 50 Pcs',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Finolex',
    category: 'Electrical',
    description: 'Heavy gauge PVC conduit pipes for concealed electrical wiring. Self-extinguishing flame retardant material. ISI marked.',
    price: 2400,
    countInStock: 250,
    rating: 4.2,
    numReviews: 18,
  },
  {
    name: 'LED Flood Light 100W Waterproof',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Havells',
    category: 'Electrical',
    description: 'IP65 waterproof LED flood light for construction site illumination. 10000 lumens output with cool white light. Die-cast aluminium body.',
    price: 1450,
    countInStock: 140,
    rating: 4.5,
    numReviews: 35,
  },
  {
    name: 'ELCB 63A Double Pole',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Havells',
    category: 'Electrical',
    description: 'Earth leakage circuit breaker for shock protection. 63A rated with 30mA sensitivity. Essential safety device for all electrical installations.',
    price: 980,
    countInStock: 200,
    rating: 4.3,
    numReviews: 26,
  },
  {
    name: 'Electrical Wire 4 sqmm 90m Roll',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Finolex',
    category: 'Electrical',
    description: 'Multi-strand copper wire with PVC insulation for power circuits and heavy appliance wiring. 90m roll with ISI certification.',
    price: 6500,
    countInStock: 120,
    rating: 4.5,
    numReviews: 19,
  },

  // ══════════════════════════════════════
  // ── PLUMBING (5 products) ──
  // ══════════════════════════════════════
  {
    name: 'CPVC Pipe 1 inch 3m Length Pack of 10',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Finolex',
    category: 'Plumbing',
    description: 'CPVC pipes for hot and cold water supply systems. Corrosion free with smooth inner bore for better flow. ISI certified.',
    price: 3200,
    countInStock: 180,
    rating: 4.4,
    numReviews: 28,
  },
  {
    name: 'PVC Water Tank 1000 Litre',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Plumbing',
    description: 'Triple-layer insulated PVC water storage tank. UV protected outer layer, food-grade inner layer. Keeps water cool in summer.',
    price: 7500,
    countInStock: 30,
    rating: 4.5,
    numReviews: 22,
  },
  {
    name: 'Submersible Water Pump 1HP',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Havells',
    category: 'Plumbing',
    description: 'Single phase submersible pump for borewell water extraction. 1HP motor with corrosion resistant stainless steel body. 150 feet head.',
    price: 8900,
    countInStock: 25,
    rating: 4.6,
    numReviews: 17,
  },
  {
    name: 'Bathroom Fittings Complete Set',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Plumbing',
    description: 'Complete bathroom CP fittings set including mixer, shower, taps, and accessories. Chrome plated brass body with ceramic cartridge.',
    price: 4500,
    countInStock: 60,
    rating: 4.3,
    numReviews: 31,
  },
  {
    name: 'SWR Drainage Pipe 110mm 3m Pack of 5',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Finolex',
    category: 'Plumbing',
    description: 'Soil, waste, and rainwater PVC drainage pipes. Ring-fit joint system for easy leak-proof installation. ISI certified for building drainage.',
    price: 2800,
    countInStock: 150,
    rating: 4.2,
    numReviews: 14,
  },

  // ══════════════════════════════════════
  // ── PAINT (5 products) ──
  // ══════════════════════════════════════
  {
    name: 'Exterior Emulsion Paint 20L White',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Paint',
    description: 'Weather-resistant exterior emulsion with anti-algal and anti-fungal properties. Excellent coverage of 120-140 sq ft per litre. 7-year warranty.',
    price: 4800,
    countInStock: 100,
    rating: 4.6,
    numReviews: 38,
  },
  {
    name: 'Interior Wall Primer 20L',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Paint',
    description: 'Water-based wall primer for interior surfaces. Excellent adhesion and sealing properties. Smooth base for top coat application.',
    price: 2200,
    countInStock: 150,
    rating: 4.3,
    numReviews: 25,
  },
  {
    name: 'Waterproof Coating 20L',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Paint',
    description: 'Elastomeric waterproof coating for external walls, terraces, and roofs. Bridges cracks up to 2mm. 5-year waterproofing guarantee.',
    price: 5500,
    countInStock: 80,
    rating: 4.5,
    numReviews: 20,
  },
  {
    name: 'Enamel Paint 4L Glossy Finish',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Paint',
    description: 'High gloss synthetic enamel paint for metal and wood surfaces. Excellent flow and leveling. Available in multiple colour shades.',
    price: 1200,
    countInStock: 200,
    rating: 4.2,
    numReviews: 32,
  },
  {
    name: 'Putty Wall Care 40 kg bag',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'Asian Paints',
    category: 'Paint',
    description: 'White cement-based wall putty for smooth surface preparation. Fills minor cracks and provides excellent base for painting.',
    price: 950,
    countInStock: 280,
    rating: 4.4,
    numReviews: 41,
  },

  // ══════════════════════════════════════
  // ── BRICKS, SAND & AGGREGATES ──
  // ══════════════════════════════════════
  {
    name: 'Red Clay Bricks 1000 Pcs',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'Premium quality red clay bricks. Standard size 230x110x75mm. High compressive strength and low water absorption for durable walls.',
    price: 8500,
    countInStock: 250,
    rating: 4.2,
    numReviews: 16,
  },
  {
    name: 'River Sand 1 Cubic Meter',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'UltraTech',
    category: 'Cement',
    description: 'Clean river sand suitable for plastering and concrete work. Silt content below 3%. Consistent grain size for smooth finish.',
    price: 2800,
    countInStock: 100,
    rating: 4.0,
    numReviews: 20,
  },
  {
    name: 'Crushed Stone Aggregates 20mm 1 Ton',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    brand: 'ACC',
    category: 'Cement',
    description: 'Machine crushed stone aggregates for concrete and road construction. Uniform size grading with angular shape for strong interlocking.',
    price: 1800,
    countInStock: 200,
    rating: 4.1,
    numReviews: 14,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Find or create a dummy admin user to assign as product owner
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin',
        email: 'admin@buildbazaar.com',
        password: '$2a$10$8Ux8k7yQ5K3x6F1V8l5k5OqK5v5v5v5v5v5v5v5v5v5v5v5v5v5v5',
        role: 'admin',
      });
      console.log('Created admin user');
    }

    // Add user reference to all products
    const productsWithUser = products.map((p) => ({
      ...p,
      user: adminUser._id,
    }));

    await Product.insertMany(productsWithUser);
    console.log(`Seeded ${productsWithUser.length} products successfully!`);

    // Count by category
    const categoryCounts = {};
    products.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    console.log('Products by category:', categoryCounts);

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
