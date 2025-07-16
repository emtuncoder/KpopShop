import axios from "axios";

const groups = [
  { name: "LeSserafim", label: "SOURCE MUSIC" },
  { name: "Aespa", label: "SM Entertainment" },
  { name: "I-DLE", label: "CUBE Entertainment" },
  { name: "BabyMonster", label: "YG Entertainment" },
  { name: "IVE", label: "STARSHIP Entertainment" },
  { name: "TWICE", label: "JYP Entertainment" },
  { name: "ITZY", label: "JYP Entertainment" },
  { name: "ILLIT", label: "BELIFT LAB" },
  { name: "Black Pink", label: "YG Entertainment" },
  { name: "CHUU", label: "ATRP" },
  { name: "Fromis_9", label: "PLEDIS Entertainment" },
  { name: "Katseye", label: "HYBE UMG, LLC" },
  { name: "Kep1er", label: "WAKE ONE / SWING Entertainment" },
  { name: "KISS OF LIFE", label: "S2 ENTERTAINMENT" },
  { name: "Newjeans", label: "ADOR" },
  { name: "TripleS", label: "Modhaus" },
  { name: "Viviz", label: "Big Planet Made" },
];

const createLightstickWithChild = async () => {
  try {
    const [artistsRes, categoriesRes, labelsRes] = await Promise.all([
      axios.get("http://localhost:1709/api/artists"),
      axios.get("http://localhost:1709/api/categories"),
      axios.get("http://localhost:1709/api/labels"),
    ]);

    const artists = artistsRes.data;
    const labels = labelsRes.data;
    const categories = categoriesRes.data;
    const lightstickCategory = categories.find((c) => c.name.toLowerCase() === "lightstick");

    if (!lightstickCategory) {
      console.error("❌ 'Lightstick' category not found.");
      return;
    }

    for (const group of groups) {
      const artist = artists.find((a) => a.name === group.name);
      const label = labels.find((l) => l.name === group.label);

      if (!artist || !label) {
        console.warn(`⚠️ Skipped ${group.name} due to missing artist or label`);
        continue;
      }

      const parentPayload = {
        title: `${group.name} Lightstick`,
        SKU: `${group.name.replace(/\s+/g, "").toUpperCase()}-LS`,
        description: `Official ${group.name} lightstick.`,
        price: 890000,
        releasedDate: new Date(),
        artist: artist._id,
        label: label._id,
        category: lightstickCategory._id,
        images: [`/images/lightsticks/${group.name.replace(/\s+/g, "_").toLowerCase()}.jpg`],
        albumContents: [],
        trackList: [],
      };

      const parentRes = await axios.post("http://localhost:1709/api/parentproducts", parentPayload);
      const parentId = parentRes.data._id;

      // Create a default child product
      const childPayload = {
        variant: "Standard",
        stock: 100,
        SKU: `${group.name.replace(/\s+/g, "").toUpperCase()}-LS-ST`,
        images: parentPayload.images,
        price: 890000,
        parent: parentId,
      };

      const childRes = await axios.post("http://localhost:1709/api/products", childPayload);
      const childId = childRes.data._id;

      // Update parent with child
      await axios.put(`http://localhost:1709/api/parentproducts/${parentId}`, {
        childProducts: [childId],
      });

      console.log(`✅ Created Lightstick for ${group.name}`);
    }
  } catch (err) {
    console.error("❌ Failed:", err.response?.data || err.message);
  }
};

createLightstickWithChild();
