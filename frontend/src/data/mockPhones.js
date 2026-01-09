/**
 * Mock dataset used when no backend is configured.
 * Slugs are used for routing: /phone/:slug
 */
export const MOCK_PHONES = [
  {
    slug: "pixel-9-pro",
    title: "Pixel 9 Pro",
    brand: "Google",
    publishedAt: "2025-01-12",
    excerpt:
      "A clean Android flagship with strong computational photography and a bright LTPO display.",
    tags: ["Flagship", "Android", "Camera"],
    specs: {
      display: {
        size: "6.3\"",
        type: "LTPO OLED, 120Hz",
        resolution: "1440 x 3120",
        brightness: "Up to 2400 nits (peak)"
      },
      chipset: {
        name: "Google Tensor G5",
        process: "4nm",
        gpu: "Mali-class GPU"
      },
      camera: {
        rear: "50MP wide + 48MP ultrawide + 48MP telephoto",
        front: "12MP",
        video: "4K60, HDR"
      },
      memory: {
        ram: "12GB",
        storage: "256GB / 512GB",
        expandable: "No"
      },
      battery: {
        capacity: "4900 mAh",
        charging: "Fast wired + wireless",
        endurance: "All-day"
      }
    }
  },
  {
    slug: "galaxy-s25-ultra",
    title: "Galaxy S25 Ultra",
    brand: "Samsung",
    publishedAt: "2025-02-03",
    excerpt:
      "A big-screen premium device focused on productivity, zoom camera reach, and a polished One UI experience.",
    tags: ["Flagship", "S Pen", "Big Battery"],
    specs: {
      display: {
        size: "6.8\"",
        type: "Dynamic AMOLED 2X, 120Hz",
        resolution: "1440 x 3088",
        brightness: "Up to 2600 nits (peak)"
      },
      chipset: {
        name: "Snapdragon 8 Gen (Elite)",
        process: "3nm-class",
        gpu: "Adreno-class GPU"
      },
      camera: {
        rear: "200MP wide + 50MP ultrawide + 50MP periscope + 10MP telephoto",
        front: "12MP",
        video: "8K, 4K120"
      },
      memory: {
        ram: "12GB / 16GB",
        storage: "256GB / 512GB / 1TB",
        expandable: "No"
      },
      battery: {
        capacity: "5000 mAh",
        charging: "45W wired + wireless",
        endurance: "Excellent"
      }
    }
  },
  {
    slug: "oneplus-13",
    title: "OnePlus 13",
    brand: "OnePlus",
    publishedAt: "2024-12-18",
    excerpt:
      "Performance-first flagship with fast charging, smooth software, and a high refresh rate display.",
    tags: ["Fast Charging", "Performance", "Android"],
    specs: {
      display: {
        size: "6.7\"",
        type: "AMOLED, 120Hz",
        resolution: "1440 x 3216",
        brightness: "Up to 2500 nits (peak)"
      },
      chipset: {
        name: "Snapdragon 8 Gen (Elite)",
        process: "3nm-class",
        gpu: "Adreno-class GPU"
      },
      camera: {
        rear: "50MP wide + 48MP ultrawide + 64MP telephoto",
        front: "16MP",
        video: "4K60, HDR"
      },
      memory: {
        ram: "12GB / 16GB",
        storage: "256GB / 512GB",
        expandable: "No"
      },
      battery: {
        capacity: "5400 mAh",
        charging: "100W wired",
        endurance: "Excellent"
      }
    }
  }
];
