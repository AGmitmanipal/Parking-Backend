use("parkingappDB");

// ===== CONFIG =====
const ZONE_NAME = "AB1 Manipal";
const PARTS = 11;

// GPS points EXACTLY from your images
const polygon = [
  { lat: 13.347125, lng: 74.796471 },
  { lat: 13.347360, lng: 74.796607 },
  { lat: 13.347396, lng: 74.796578 },
  { lat: 13.347209, lng: 74.796438 }
];

// Compute center (useful for map centering)
const CENTER = {
  lat: (13.347125 + 13.347360 + 13.347396 + 13.347209) / 4,
  lng: (74.796471 + 74.796607 + 74.796578 + 74.796438) / 4
};

// ===== GENERATE 11 SLOTS (SCHEMA-CORRECT) =====
const slots = [];

for (let i = 0; i < PARTS; i++) {
  slots.push({
    slotId: `slot-${i + 1}`,
    index: i,
    tag: `P${i + 1}`,
    polygon,              // same GPS polygon for now
    status: "free",
    occupiedBy: null,
    lastUpdated: new Date()
  });
}

// ===== UPSERT ZONE =====
db.parkingzones.insertOne({
  name: ZONE_NAME,
  polygon,
  slots,
  capacity: PARTS,
  available: PARTS,
  parts: PARTS,
  loc: CENTER,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print(`✅ Zone "${ZONE_NAME}" saved with ${PARTS} slots (schema-accurate)`);
