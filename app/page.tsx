"use client";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Heart,
  House,
  MapPin,
  Menu,
  Phone,
  Search,
  Share2,
  ShieldCheck,
  UserRound,
  Wifi,
  X,
  Droplets,
  Star,
  Users,
  Armchair,
  PlugZap,
} from "lucide-react";
type Hostel = {
  name: string;
  area: string;
  distance: string;
  walk: string;
  price: string;
  roomTypes: string;
  rating: string;
  rooms: number;
  image: string;
  amenities: string[];
  phone: string;
  verified?: boolean;
  verification?: "submitted" | "visited";
  featured?: boolean;
  available?: boolean;
  photos?: string[];
  singlePrice?: string;
  selfContainedPrice?: string;
  details?: string[];
};
type StudentProfile = { fullName: string; phone: string; email: string };
const data = [
  [
    "Precious Executive Hostel",
    "Syaule",
    "3.3 km",
    "20-minute walk",
    "300,000",
    "Single & self-contained",
    "8.8",
    24,
    "photo-1564013799919-ab600027ffc6",
    ["Wi-Fi", "Water", "Security"],
    "+256773351738",
  ],
  [
    "Jamaica Hostel",
    "Busitema Trading Centre",
    "1.2 km",
    "5 min",
    "280,000",
    "Single & double",
    "8.4",
    22,
    "photo-1522708323590-d24dbb6b0267",
    ["Water", "Power", "Security"],
    "+256700123401",
  ],
  [
    "Oburu Hostel",
    "Nangwe East",
    "2.1 km",
    "8 min",
    "250,000",
    "Single rooms",
    "7.9",
    26,
    "photo-1568605114967-8130f3a36994",
    ["Water", "Security", "Parking"],
    "+256700123403",
  ],
  [
    "Mamikki Hostels",
    "Busitema West",
    "2.5 km",
    "9 min",
    "270,000",
    "Single & shared",
    "8.0",
    24,
    "photo-1600607687939-ce8a6c25118c",
    ["Water", "Power", "Parking"],
    "+256700123406",
  ],
  [
    "Mabonga Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "350,000–400,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1560185008-b033106af5c3",
    [
      "Water included",
      "Gated compound",
      "Electricity paid separately",
      "Wi-Fi paid separately",
    ],
    "",
  ],
  [
    "Olympia Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "350,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1600566753086-00f18fb6b3ea",
    ["Gated compound", "No services included"],
    "",
  ],
  [
    "Goodlife Hostel",
    "Busitema North",
    "1.9 km",
    "7 min",
    "290,000",
    "Single & double",
    "8.3",
    25,
    "photo-1600573472591-ee6b68d14c68",
    ["Wi-Fi", "Water", "Security"],
    "+256700123410",
  ],
  [
    "Freedom Hostel Old",
    "Sample location",
    "Distance pending",
    "walking time pending",
    "—",
    "Contact for room details",
    "New",
    0,
    "photo-1560184897-ae75f418493e",
    ["Details pending"],
    "+256750064797",
  ],
  [
    "Freedom Hostel New",
    "Syaule",
    "3.3 km",
    "20-minute walk",
    "550,000–600,000",
    "Self-contained",
    "New",
    14,
    "photo-1600566753051-f0b89df2dd90",
    ["Wi-Fi", "Water"],
    "+256750064797",
  ],
  [
    "Zalane Hostel",
    "Near Busitema University",
    "1.8 km",
    "15-minute walk",
    "500,000",
    "Single rooms",
    "New",
    20,
    "photo-1555854877-bab0e564b8d5",
    ["Wi-Fi", "Water", "Security"],
    "+256789002214",
  ],
  [
    "Kings & Queens Hostel",
    "Syaule",
    "2 km",
    "20–25-minute walk",
    "450,000",
    "Single, double & self-contained",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Wi-Fi", "Water", "Electricity", "Security", "DStv", "Reading rooms"],
    "+256750029927",
  ],
  [
    "New Harriet Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "550,000",
    "Self-contained rooms",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Wi-Fi", "Water", "Electricity"],
    "",
  ],
  [
    "Old Harriet Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "450,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Wi-Fi", "Water", "Electricity", "Security"],
    "",
  ],
  [
    "Triple T Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "1,000,000–1,500,000",
    "Self-contained rooms",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Wi-Fi", "Water", "Electricity", "Security"],
    "",
  ],
  [
    "AA Guilds Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "500,000",
    "Self-contained rooms",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Wi-Fi", "Water", "Electricity"],
    "",
  ],
  [
    "Machio Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "350,000–500,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    [
      "Gated compound",
      "Nearby borehole water",
      "Electricity paid separately",
      "Wi-Fi paid separately",
    ],
    "",
  ],
  [
    "Luna Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "400,000–450,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    [
      "Water included",
      "Gated compound",
      "Electricity paid separately",
      "Wi-Fi paid separately",
    ],
    "",
  ],
  [
    "Sky View Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "350,000–400,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["No services included"],
    "",
  ],
  [
    "Plumber's Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "400,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Water", "Electricity", "No Wi-Fi"],
    "",
  ],
  [
    "Before Plumber Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "400,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Electricity", "Water not included", "No Wi-Fi"],
    "",
  ],
  [
    "Bankproperty Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "450,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Water", "Electricity", "Gated compound", "No Wi-Fi"],
    "",
  ],
  [
    "White House Hostel",
    "Location pending",
    "Distance pending",
    "Walking time pending",
    "450,000",
    "Single rooms with shared toilets",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    [
      "Gated compound",
      "Water not included",
      "Electricity not included",
      "No Wi-Fi",
    ],
    "",
  ],
  [
    "Near University View Hostel",
    "Near Busitema University",
    "Distance pending",
    "Walking time pending",
    "1,500,000",
    "Self-contained rooms",
    "New",
    0,
    "photo-1564013799919-ab600027ffc6",
    ["Water", "Electricity", "CCTV", "Kitchen", "Wi-Fi paid separately"],
    "",
  ],
] as const;
const hostels: Hostel[] = data.map((d, index) => {
  if (index === 0)
    return {
      name: "Precious Executive Hostel",
      area: "Syaule",
      distance: "3.3 km",
      walk: "20-minute walk",
      price: "300,000",
      roomTypes: "Single & self-contained",
      rating: "8.8",
      rooms: 24,
      image: "/precious-executive-entrance.jpg",
      amenities: ["Wi-Fi", "Water", "Security"],
      phone: "+256773351738",
      verified: true,
      available: false,
      photos: [
        "/precious-executive-entrance.jpg",
        "/precious-executive-rooms-a.jpg",
        "/precious-executive-rooms-b.jpg",
        "/precious-executive-compound.jpg",
      ],
      singlePrice: "UGX 300,000–350,000",
      selfContainedPrice: "UGX 380,000–500,000",
      details: [
        "15 single rooms with shared bathrooms and toilets",
        "9 self-contained rooms with private facilities",
        "One student per room",
        "Cooking is allowed",
        "Rooms are unfurnished",
        "Electricity is paid separately",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Jamaica Hostel")
    return {
      name: "Jamaica Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "400,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/jamaica-hostel-exterior.jpg",
      amenities: [
        "Water included",
        "Gated compound",
        "Electricity paid separately",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: [
        "/jamaica-hostel-exterior.jpg",
        "/jamaica-hostel-courtyard-a.jpg",
        "/jamaica-hostel-courtyard-b.jpg",
        "/jamaica-hostel-washrooms.jpg",
        "/jamaica-hostel-courtyard-c.jpg",
      ],
      singlePrice: "UGX 400,000",
      details: [
        "Single rooms are UGX 400,000 per semester",
        "Shared toilets",
        "Water is provided",
        "Electricity is paid individually",
        "Wi-Fi is paid individually",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Goodlife Hostel")
    return {
      name: "Goodlife Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "700,000–900,000",
      roomTypes: "Self-contained rooms",
      rating: "New",
      rooms: 0,
      image: "/goodlife-hostel-exterior.jpg",
      amenities: [
        "Water included",
        "Gated compound",
        "Electricity paid separately",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: [
        "/goodlife-hostel-exterior.jpg",
        "/goodlife-hostel-gate.jpg",
        "/goodlife-hostel-courtyard.jpg",
      ],
      selfContainedPrice: "UGX 700,000–900,000",
      details: [
        "Self-contained rooms range from UGX 700,000 to 900,000 per semester",
        "Water is provided",
        "Electricity is paid individually",
        "Wi-Fi is paid individually",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Mamikki Hostels")
    return {
      name: "Mamikki Hostels",
      area: "Near Busitema University",
      distance: "1.5 km",
      walk: "15-minute walk",
      price: "450,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 20,
      image: "/mamikki-hostel-exterior.jpg",
      amenities: ["Wi-Fi", "Water", "Electricity", "Security"],
      phone: "+256755743442",
      verified: true,
      available: false,
      photos: ["/mamikki-hostel-exterior.jpg", "/mamikki-hostel-corridor.jpg"],
      details: [
        "Single rooms with shared toilets are UGX 450,000 per semester",
        "Water, electricity, Wi-Fi and security are provided",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Oburu Hostel")
    return {
      name: "Oburu Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "280,000–500,000",
      roomTypes: "Shared & single rooms",
      rating: "New",
      rooms: 0,
      image: "/oburu-hostel-entrance.jpg",
      amenities: [
        "Water included",
        "Electricity paid separately",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: ["/oburu-hostel-entrance.jpg", "/oburu-hostel-exterior.jpg"],
      details: [
        "Shared rooms are UGX 280,000 per semester",
        "Single rooms are UGX 500,000 per semester",
        "Water is included",
        "Students pay separately for electricity and Wi-Fi",
      ],
    };
  if (d[0] === "Mabonga Hostel")
    return {
      name: "Mabonga Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "350,000–400,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/mabonga-hostel-exterior.jpg",
      amenities: [
        "Water included",
        "Gated compound",
        "Electricity paid separately",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: ["/mabonga-hostel-exterior.jpg", "/mabonga-hostel-corridor.jpg"],
      singlePrice: "UGX 350,000–400,000",
      details: [
        "Single rooms range from UGX 350,000 to 400,000 per semester",
        "Shared toilets",
        "Water is provided",
        "Electricity is paid individually",
        "Wi-Fi is paid individually",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Olympia Hostel")
    return {
      name: "Olympia Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "350,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/olympia-hostel-courtyard.jpg",
      amenities: ["Gated compound", "No services included"],
      phone: "",
      verified: true,
      photos: [
        "/olympia-hostel-courtyard.jpg",
        "/olympia-hostel-room-block.jpg",
      ],
      singlePrice: "UGX 350,000",
      details: [
        "Single rooms are UGX 350,000 per semester",
        "Shared toilets",
        "Water, electricity and Wi-Fi are not included",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Freedom Hostel Old")
    return {
      name: "Freedom Hostel Old",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "350,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/freedom-hostel-old-c.jpg",
      amenities: [
        "Water included",
        "Wi-Fi included",
        "Electricity paid separately",
      ],
      phone: "+256750064797",
      verified: true,
      photos: [
        "/freedom-hostel-old-c.jpg",
        "/freedom-hostel-old-b.jpg",
        "/freedom-hostel-old-a.jpg",
      ],
      details: [
        "Single rooms with shared toilets are UGX 350,000 per semester",
        "Water and Wi-Fi are included",
        "Electricity is paid separately",
      ],
    };
  if (d[0] === "Freedom Hostel New")
    return {
      name: "Freedom Hostel New",
      area: "Syaule",
      distance: "3.3 km",
      walk: "20-minute walk",
      price: "550,000–600,000",
      roomTypes: "Self-contained",
      rating: "New",
      rooms: 14,
      image: "/freedom-hostel-new-a.jpg",
      amenities: ["Wi-Fi", "Water"],
      phone: "+256750064797",
      verified: true,
      available: false,
      photos: ["/freedom-hostel-new-a.jpg", "/freedom-hostel-new-b.jpg"],
      selfContainedPrice: "UGX 550,000–600,000",
      details: [
        "14 self-contained rooms",
        "Water and Wi-Fi are provided",
        "Electricity is paid separately",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Zalane Hostel")
    return {
      name: "Zalane Hostel",
      area: "Near Busitema University",
      distance: "1.8 km",
      walk: "15-minute walk",
      price: "500,000",
      roomTypes: "Single rooms",
      rating: "New",
      rooms: 20,
      image: "/zalane-hostel-exterior.jpg",
      amenities: ["Wi-Fi", "Water", "Electricity", "Security"],
      phone: "+256789002214",
      verified: true,
      available: false,
      photos: [
        "/zalane-hostel-exterior.jpg",
        "/zalane-hostel-courtyard.jpg",
        "/zalane-hostel-room.jpg",
        "/zalane-hostel-bathroom.jpg",
      ],
      details: [
        "Single rooms are UGX 500,000 per semester",
        "Water, electricity, Wi-Fi and security are provided",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Kings & Queens Hostel")
    return {
      name: "Kings & Queens Hostel",
      area: "Syaule · just before Precious Executive Hostel",
      distance: "2 km",
      walk: "20–25-minute walk",
      price: "450,000",
      roomTypes: "Single, double & self-contained",
      rating: "New",
      rooms: 0,
      image: "/kings-and-queens-entrance.jpg",
      amenities: [
        "Wi-Fi",
        "Water",
        "Electricity",
        "Security",
        "DStv",
        "Reading rooms",
      ],
      phone: "+256750029927",
      verified: true,
      available: false,
      photos: [
        "/kings-and-queens-entrance.jpg",
        "/kings-and-queens-exterior-a.jpg",
        "/kings-and-queens-exterior-b.jpg",
      ],
      singlePrice: "UGX 450,000",
      selfContainedPrice: "UGX 600,000",
      details: [
        "Single rooms are UGX 450,000 per semester",
        "Self-contained rooms are UGX 600,000 per semester",
        "Double-room price and arrangement: contact the hostel",
        "Water, electricity, Wi-Fi, DStv and security are included",
        "Separate sections for male and female students",
        "One student per single or self-contained room",
        "Cooking is allowed",
        "Reading rooms are available",
        "Total room count is not yet confirmed",
      ],
    };
  if (d[0] === "New Harriet Hostel")
    return {
      name: "New Harriet Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "550,000",
      roomTypes: "Self-contained rooms",
      rating: "New",
      rooms: 0,
      image: "/new-harriet-hostel-b.jpg",
      amenities: ["Wi-Fi", "Water", "Electricity"],
      phone: "",
      verified: true,
      available: false,
      photos: [
        "/new-harriet-hostel-b.jpg",
        "/new-harriet-hostel-a.jpg",
        "/new-harriet-hostel-c.jpg",
        "/new-harriet-hostel-d.jpg",
      ],
      selfContainedPrice: "UGX 550,000",
      details: [
        "Self-contained rooms at UGX 550,000 per semester",
        "Water, electricity and Wi-Fi are included",
        "Open to male and female students",
        "Currently fully occupied",
        "Location, distance and room count pending",
        "Contact number pending",
      ],
    };
  if (d[0] === "Old Harriet Hostel")
    return {
      name: "Old Harriet Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "450,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/old-harriet-hostel-exterior.jpg",
      amenities: ["Wi-Fi", "Water", "Electricity", "Security"],
      phone: "",
      verified: true,
      photos: [
        "/old-harriet-hostel-exterior.jpg",
        "/old-harriet-hostel-corridor-a.jpg",
        "/old-harriet-hostel-corridor-b.jpg",
      ],
      singlePrice: "UGX 450,000",
      details: [
        "Single rooms are UGX 450,000 per semester",
        "Shared toilets",
        "Water, electricity, Wi-Fi and security are provided",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Triple T Hostel")
    return {
      name: "Triple T Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "1,000,000–1,500,000",
      roomTypes: "Self-contained rooms",
      rating: "New",
      rooms: 0,
      image: "/triple-t-hostel-c.jpg",
      amenities: ["Wi-Fi", "Water", "Electricity", "Security"],
      phone: "",
      verified: true,
      photos: [
        "/triple-t-hostel-c.jpg",
        "/triple-t-hostel-d.jpg",
        "/triple-t-hostel-a.jpg",
        "/triple-t-hostel-b.jpg",
      ],
      selfContainedPrice: "UGX 1,000,000–1,500,000",
      details: [
        "Self-contained rooms range from UGX 1,000,000 to 1,500,000 per semester",
        "Water, electricity, Wi-Fi and security are provided",
      ],
    };
  if (d[0] === "AA Guilds Hostel")
    return {
      name: "AA Guilds Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "500,000",
      roomTypes: "Self-contained rooms",
      rating: "New",
      rooms: 0,
      image: "/aa-guilds-hostel-exterior.jpg",
      amenities: ["Water", "Electricity", "Wi-Fi"],
      phone: "",
      verified: true,
      photos: [
        "/aa-guilds-hostel-exterior.jpg",
        "/aa-guilds-hostel-courtyard.jpg",
      ],
      selfContainedPrice: "UGX 500,000",
      details: [
        "Self-contained rooms are UGX 500,000 per semester",
        "Water, electricity and Wi-Fi are provided",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Machio Hostel")
    return {
      name: "Machio Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "350,000–500,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/machio-hostel-exterior-a.jpg",
      amenities: [
        "Gated compound",
        "Nearby borehole water",
        "Electricity paid separately",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: [
        "/machio-hostel-exterior-a.jpg",
        "/machio-hostel-exterior-b.jpg",
        "/machio-hostel-exterior-c.jpg",
      ],
      singlePrice: "UGX 350,000–500,000",
      details: [
        "Single rooms range from UGX 350,000 to 500,000 per semester",
        "Shared toilets",
        "Water is collected from a nearby borehole",
        "Electricity is paid individually",
        "Wi-Fi is paid individually",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Luna Hostel")
    return {
      name: "Luna Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "400,000–450,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/luna-hostel-gate.jpg",
      amenities: [
        "Water included",
        "Gated compound",
        "Electricity paid separately",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: [
        "/luna-hostel-gate.jpg",
        "/luna-hostel-courtyard-a.jpg",
        "/luna-hostel-courtyard-b.jpg",
      ],
      singlePrice: "UGX 400,000–450,000",
      details: [
        "Single rooms range from UGX 400,000 to 450,000 per semester",
        "Shared toilets",
        "Water is provided",
        "Electricity is paid individually",
        "Wi-Fi is paid individually",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Sky View Hostel")
    return {
      name: "Sky View Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "350,000–400,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/sky-view-hostel-courtyard-a.jpg",
      amenities: ["No services included"],
      phone: "",
      verified: true,
      photos: [
        "/sky-view-hostel-courtyard-a.jpg",
        "/sky-view-hostel-courtyard-b.jpg",
        "/sky-view-hostel-shared-toilet.jpg",
      ],
      singlePrice: "UGX 350,000–400,000",
      details: [
        "Single rooms range from UGX 350,000 to 400,000 per semester",
        "Shared toilets",
        "Water, electricity and Wi-Fi are not included",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Plumber's Hostel")
    return {
      name: "Plumber's Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "400,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/plumbers-hostel-courtyard.jpg",
      amenities: ["Water", "Electricity", "No Wi-Fi"],
      phone: "",
      verified: true,
      photos: [
        "/plumbers-hostel-courtyard.jpg",
        "/plumbers-hostel-corridor.jpg",
      ],
      singlePrice: "UGX 400,000",
      details: [
        "Single rooms are UGX 400,000 per semester",
        "Shared toilets",
        "Water and electricity are provided",
        "Wi-Fi is not provided",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Before Plumber Hostel")
    return {
      name: "Before Plumber Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "400,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/before-plumber-hostel-exterior.jpg",
      amenities: ["Electricity", "Water not included", "No Wi-Fi"],
      phone: "",
      verified: true,
      photos: ["/before-plumber-hostel-exterior.jpg"],
      singlePrice: "UGX 400,000",
      details: [
        "Single rooms are UGX 400,000 per semester",
        "Shared toilets",
        "Electricity is provided",
        "Water and Wi-Fi are not provided",
        "Open to male and female students",
        "Temporary listing name: Before Plumber Hostel",
      ],
    };
  if (d[0] === "Bankproperty Hostel")
    return {
      name: "Bankproperty Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "450,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/bankproperty-hostel-courtyard-a.jpg",
      amenities: ["Water", "Electricity", "Gated compound", "No Wi-Fi"],
      phone: "",
      verified: true,
      photos: [
        "/bankproperty-hostel-courtyard-a.jpg",
        "/bankproperty-hostel-courtyard-b.jpg",
      ],
      singlePrice: "UGX 450,000",
      details: [
        "Single rooms are UGX 450,000 per semester",
        "Shared toilets",
        "Water and electricity are included",
        "Wi-Fi is unavailable",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "White House Hostel")
    return {
      name: "White House Hostel",
      area: "Location pending",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "450,000",
      roomTypes: "Single rooms with shared toilets",
      rating: "New",
      rooms: 0,
      image: "/white-house-hostel-courtyard-a.jpg",
      amenities: [
        "Gated compound",
        "Water not included",
        "Electricity not included",
        "No Wi-Fi",
      ],
      phone: "",
      verified: true,
      photos: [
        "/white-house-hostel-courtyard-a.jpg",
        "/white-house-hostel-courtyard-b.jpg",
      ],
      singlePrice: "UGX 450,000",
      details: [
        "Single rooms are UGX 450,000 per semester",
        "Shared toilets",
        "Water and electricity are not included",
        "Wi-Fi is unavailable",
        "Gated compound",
        "Open to male and female students",
      ],
    };
  if (d[0] === "Near University View Hostel")
    return {
      name: "Near University View Hostel",
      area: "Near Busitema University",
      distance: "Distance pending",
      walk: "Walking time pending",
      price: "1,500,000",
      roomTypes: "Self-contained rooms",
      rating: "New",
      rooms: 0,
      image: "/near-university-view-hostel-exterior-a.jpg",
      amenities: [
        "Water",
        "Electricity",
        "CCTV",
        "Kitchen",
        "Wi-Fi paid separately",
      ],
      phone: "",
      verified: true,
      photos: [
        "/near-university-view-hostel-exterior-a.jpg",
        "/near-university-view-hostel-exterior-b.jpg",
        "/near-university-view-hostel-courtyard.jpg",
      ],
      selfContainedPrice: "UGX 1,500,000",
      details: [
        "Self-contained rooms are UGX 1,500,000 per semester",
        "Water and electricity are included",
        "Wi-Fi is paid individually",
        "Kitchen available",
        "CCTV security cameras",
        "Open to male and female students",
      ],
    };
  return {
    name: d[0],
    area: d[1],
    distance: d[2],
    walk: d[3],
    price: d[4],
    roomTypes: d[5],
    rating: d[6],
    rooms: d[7],
    image: `https://images.unsplash.com/${d[8]}?auto=format&fit=crop&w=1200&q=80`,
    amenities: [...d[9]],
    phone: d[10],
  };
});
const orderedHostels = hostels
  .map((h) => ({
    ...h,
    verification: h.verification ?? ("submitted" as const),
  }))
  .sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      Number(b.verification === "visited") -
        Number(a.verification === "visited"),
  );
const map = (name: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " Busitema University Uganda")}`;
const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const enquiryWhatsApp = (
  hostelName: string,
  reference?: string,
  phone = "+256750064797",
) => {
  const number = phone.replace(/\D/g, "").replace(/^0/, "256");
  const message = reference
    ? `Hello, I have submitted a room request for ${hostelName} on Busitema Stays. My reference is ${reference}. Please help me confirm availability.`
    : `Hello, I am interested in a room at ${hostelName}. Please share the current availability and booking details.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
const priceFloor = (price: string) =>
  Number(price.replaceAll(",", "").match(/\d+/)?.[0] || 0);
const hasIncludedService = (h: Hostel, service: string) => {
  const items = h.amenities.map((a) => a.toLowerCase());
  if (service === "security")
    return items.some(
      (a) => a.includes("security") || a.includes("gate") || a.includes("cctv"),
    );
  if (service === "wifi")
    return items.some(
      (a) =>
        (a === "wi-fi" ||
          a === "wifi" ||
          a === "wi-fi included" ||
          a === "wifi included") &&
        !a.includes("paid") &&
        !a.includes("no "),
    );
  return items.some(
    (a) =>
      (a === service ||
        a === `${service} included` ||
        a === `${service} provided`) &&
      !a.includes("paid") &&
      !a.includes("not included") &&
      !a.includes("no "),
  );
};
function HostelCardGallery({ hostel }: { hostel: Hostel }) {
  const photos = hostel.photos?.length ? hostel.photos : [hostel.image];
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const move = (direction: number) => {
    const next = Math.max(0, Math.min(photos.length - 1, current + direction));
    track.current?.scrollTo({
      left: (track.current.clientWidth || 0) * next,
      behavior: "smooth",
    });
    setCurrent(next);
  };
  const sync = () => {
    const element = track.current;
    if (element?.clientWidth)
      setCurrent(Math.round(element.scrollLeft / element.clientWidth));
  };
  return (
    <>
      <div
        className="card-photo-track"
        ref={track}
        onScroll={sync}
        aria-label={`${hostel.name} photos`}
      >
        {photos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt={`${hostel.name} photo ${index + 1} of ${photos.length}`}
          />
        ))}
      </div>
      {photos.length > 1 && (
        <div className="card-gallery-navigation">
          <button
            className="photo-arrow photo-previous"
            type="button"
            onClick={() => move(-1)}
            disabled={current === 0}
            aria-label={`Previous photo of ${hostel.name}`}
          >
            <ChevronLeft />
          </button>
          <button
            className="photo-arrow photo-next"
            type="button"
            onClick={() => move(1)}
            disabled={current === photos.length - 1}
            aria-label={`Next photo of ${hostel.name}`}
          >
            <ChevronRight />
          </button>
          <span className="photo-count" aria-live="polite">
            {current + 1}/{photos.length}
          </span>
        </div>
      )}
    </>
  );
}
export default function Home() {
  const [query, setQuery] = useState(""),
    [searchOpen, setSearchOpen] = useState(false),
    [quickCategory, setQuickCategory] = useState("all"),
    [selectedServices, setSelectedServices] = useState<string[]>([]),
    [budget, setBudget] = useState("all"),
    [room, setRoom] = useState("all"),
    [service, setService] = useState("all"),
    [sort, setSort] = useState("recommended"),
    [menu, setMenu] = useState(false),
    [selected, setSelected] = useState<Hostel | null>(null),
    [saved, setSaved] = useState<string[]>([]),
    [savedReady, setSavedReady] = useState(false),
    [sending, setSending] = useState(false),
    [success, setSuccess] = useState(""),
    [error, setError] = useState(""),
    [profile, setProfile] = useState<StudentProfile | null>(null),
    [profileReady, setProfileReady] = useState(false),
    [catalog, setCatalog] = useState<Hostel[]>(orderedHostels);
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return catalog
      .filter((h) => h.name.toLowerCase().includes(q))
      .sort(
        (a, b) =>
          Number(!a.name.toLowerCase().startsWith(q)) -
          Number(!b.name.toLowerCase().startsWith(q)),
      )
      .slice(0, 6);
  }, [query, catalog]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = catalog.filter((h) => {
      const text =
        `${h.name} ${h.area} ${h.roomTypes} ${h.amenities.join(" ")}`.toLowerCase();
      const roomText = h.roomTypes.toLowerCase();
      const roomMatch =
        room === "all" ||
        (room === "single" && roomText.includes("single")) ||
        (room === "self-contained" && roomText.includes("self-contained")) ||
        (room === "shared" &&
          (roomText.includes("shared rooms") || roomText.includes("double")));
      const distanceValue = Number(h.distance.match(/[\d.]+/)?.[0] || 999);
      const quickMatch =
        quickCategory === "all" ||
        (quickCategory === "verified" && h.verification === "visited") ||
        (quickCategory === "available" && h.available !== false) ||
        (quickCategory === "essentials" &&
          hasIncludedService(h, "water") &&
          hasIncludedService(h, "electricity")) ||
        (quickCategory === "single" && roomText.includes("single")) ||
        (quickCategory === "self-contained" &&
          roomText.includes("self-contained")) ||
        (quickCategory === "shared" &&
          (roomText.includes("shared") || roomText.includes("double"))) ||
        (quickCategory === "near" &&
          (distanceValue <= 2 ||
            h.area.toLowerCase().includes("near busitema")));
      return (
        (!q || text.includes(q)) &&
        (budget === "all" || priceFloor(h.price) <= Number(budget)) &&
        roomMatch &&
        quickMatch &&
        selectedServices.every((item) => hasIncludedService(h, item)) &&
        (service === "all" || hasIncludedService(h, service))
      );
    });
    return [...matches].sort((a, b) =>
      sort === "price"
        ? priceFloor(a.price) - priceFloor(b.price)
        : sort === "name"
          ? a.name.localeCompare(b.name)
          : Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            Number(b.verification === "visited") -
              Number(a.verification === "visited"),
    );
  }, [query, budget, room, service, sort, quickCategory, selectedServices, catalog]);
  const clearFilters = () => {
    setQuery("");
    setQuickCategory("all");
    setSelectedServices([]);
    setBudget("all");
    setRoom("all");
    setService("all");
    setSort("recommended");
  };
  const toggleSave = (name: string) =>
    setSaved((v) =>
      v.includes(name) ? v.filter((x) => x !== name) : [...v, name],
    );
  const openHostel = (h: Hostel) => {
    setSelected(h);
    setSuccess("");
    window.history.pushState({}, "", `/hostels/${slug(h.name)}`);
  };
  const closeHostel = () => {
    setSelected(null);
    window.history.pushState({}, "", "/");
  };
  const shareHostel = async (h: Hostel) => {
    const url = `${window.location.origin}/hostels/${slug(h.name)}`;
    try {
      if (navigator.share)
        await navigator.share({
          title: h.name,
          text: `View ${h.name} on Busitema Stays`,
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        alert("Hostel link copied");
      }
    } catch {}
  };
  useEffect(() => {
    const services = document.querySelector(".multi-service-filter"),
      filters = document.querySelector(".hostel-filters");
    if (services && filters)
      filters.insertBefore(services, filters.children[2] || null);
  }, []);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("busitema-student-profile");
      if (!stored) {
        window.location.replace("/login");
        return;
      }
      const parsed=JSON.parse(stored) as StudentProfile;
      queueMicrotask(() => setProfile(parsed));
    } catch {
      localStorage.removeItem("busitema-student-profile");
      window.location.replace("/login");
    } finally {
      queueMicrotask(() => setProfileReady(true));
    }
  }, []);
  useEffect(() => {
    fetch("/api/hostels")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(({edits}:{edits:Array<{name:string;status:string;payload:Partial<Hostel>}>}) => {
        const merged=new Map(orderedHostels.map(hostel=>[hostel.name.toLowerCase(),hostel]));
        for(const edit of edits){
          const key=edit.name.toLowerCase();
          if(edit.status==="hidden"){merged.delete(key);continue;}
          const base=merged.get(key)||{name:edit.name,area:"Location pending",distance:"Distance pending",walk:"Walking time pending",price:"Price pending",roomTypes:"Room details pending",rating:"New",rooms:0,image:"/near-university-view-hostel-exterior-a.jpg",amenities:[],phone:"",verification:"submitted" as const};
          merged.set(key,{...base,...edit.payload,name:edit.name});
        }
        const nextCatalog=[...merged.values()].sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||Number(b.verification==="visited")-Number(a.verification==="visited"));
        setCatalog(nextCatalog);
        const requested=new URLSearchParams(window.location.search).get("hostel");
        const match=requested&&nextCatalog.find(hostel=>slug(hostel.name)===requested);
        if(match)setSelected(match);
      })
      .catch(()=>{
        const requested=new URLSearchParams(window.location.search).get("hostel");
        const match=requested&&orderedHostels.find(hostel=>slug(hostel.name)===requested);
        if(match)setSelected(match);
      });
  }, []);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("busitema-saved-hostels");
      if (stored){const parsed=JSON.parse(stored) as string[];queueMicrotask(() => setSaved(parsed));}
    } catch {
    } finally {
      queueMicrotask(() => setSavedReady(true));
    }
  }, []);
  useEffect(() => {
    if (savedReady)
      localStorage.setItem("busitema-saved-hostels", JSON.stringify(saved));
  }, [saved, savedReady]);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    try {
      const payload = {
        ...Object.fromEntries(new FormData(form)),
        ...profile,
        hostelName: selected?.name,
      };
      const r = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setSuccess(d.reference);
    } catch (x) {
      setError(x instanceof Error ? x.message : "Could not send request");
    } finally {
      setSending(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("busitema-student-profile");
    window.location.replace("/login");
  };
  if (!profileReady || !profile)
    return (
      <main className="profile-loading">
        <div className="profile-loading-brand" role="status" aria-live="polite">
          <img
            src="/busitema-hostel-finder-logo-gold.png"
            alt="Busitema Stays"
          />
          <span>Opening Busitema Stays…</span>
        </div>
      </main>
    );
  return (
    <main className="market-page" id="top">
      <div className="app-strip">
        <div className="app-icon">
          <House />
        </div>
        <div>
          <strong>Your room search starts here</strong>
          <span>Compare trusted student hostels around Busitema</span>
        </div>
        <a href="#hostels">Browse hostels</a>
      </div>
      <div className="festival">
        <b>BUSITEMA STUDENT HOUSING</b>
        <span>
          Real hostel details, semester prices and room photos in one place
        </span>
      </div>
      <header className="market-header">
        <button
          className="icon-button"
          onClick={() => setMenu(!menu)}
          aria-label="Open menu"
          aria-expanded={menu}
        >
          <Menu />
        </button>
        <a className="market-logo" href="#top" aria-label="Busitema Stays home">
          <img src="/logo-mark.svg" alt="" />
          <span>BUSITEMA</span>
          <b>STAYS</b>
        </a>
        <nav className="market-nav" aria-label="Main navigation">
          <a className="active" href="#hostels">
            <Search />
            Find a hostel
          </a>
          <a href="/student">
            <UserRound />
            My bookings
          </a>
          <a href="/manager">
            <BedDouble />
            For managers
          </a>
          <button
            className="profile-button"
            type="button"
            onClick={logout}
            title="Sign out"
          >
            <UserRound />
            <span>{profile.fullName.split(" ")[0]}</span>
          </button>
        </nav>
      </header>
      {menu && (
        <nav className="market-menu" aria-label="Mobile navigation">
          <a href="#hostels" onClick={() => setMenu(false)}>
            Find a hostel
          </a>
          <a href="/student">My bookings</a>
          <a href="/manager">For managers</a>
          <a href="/partners">List your hostel</a>
        </nav>
      )}
      <nav className="mobile-bottom-nav" aria-label="Main mobile navigation">
        <a className="active" href="#hostels">
          <Search />
          <span>Find a hostel</span>
        </a>
        <a href="/student">
          <UserRound />
          <span>My bookings</span>
        </a>
        <a href="/manager">
          <BedDouble />
          <span>For managers</span>
        </a>
        <button type="button" onClick={logout}>
          <UserRound />
          <span>Sign out</span>
        </button>
      </nav>
      <section className="catalog-hero">
        <span>BUSITEMA UNIVERSITY HOSTELS</span>
        <h1>Find a room that fits your pocket.</h1>
        <p>Search and filter verified hostels by what matters to you.</p>
        <div className="search-autocomplete">
          <div className="market-search">
            <Search />
            <input
              aria-label="Search hostels"
              aria-autocomplete="list"
              aria-expanded={searchOpen && suggestions.length > 0}
              aria-controls="hostel-suggestions"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchOpen(false);
              }}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              placeholder="Search by hostel, area, room or service"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                }}
                aria-label="Clear search"
              >
                <X />
              </button>
            )}
          </div>
          {searchOpen && suggestions.length > 0 && (
            <div
              className="hostel-suggestions"
              id="hostel-suggestions"
              role="listbox"
              aria-label="Matching hostels"
            >
              {suggestions.map((h) => (
                <button
                  key={h.name}
                  type="button"
                  role="option"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery(h.name);
                    setSearchOpen(false);
                    document
                      .getElementById("hostels")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Search />
                  <span>
                    <b>{h.name}</b>
                    <small>
                      {h.area} · UGX {h.price}
                    </small>
                  </span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="hostel-filters">
          <label>
            <span>Maximum budget</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="all">Any budget</option>
              <option value="400000">Up to UGX 400k</option>
              <option value="500000">Up to UGX 500k</option>
              <option value="600000">Up to UGX 600k</option>
              <option value="1000000">Up to UGX 1m</option>
              <option value="1500000">Up to UGX 1.5m</option>
            </select>
          </label>
          <label>
            <span>Room type</span>
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value="all">Any room</option>
              <option value="single">Single</option>
              <option value="self-contained">Self-contained</option>
              <option value="shared">Shared/double</option>
            </select>
          </label>
          <label>
            <span>Included service</span>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="all">Any service</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="wifi">Wi-Fi</option>
              <option value="security">Security/gate</option>
              <option value="kitchen">Kitchen</option>
            </select>
          </label>
          <label>
            <span>Sort results</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price">Lowest price</option>
              <option value="name">Hostel name</option>
            </select>
          </label>
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
        <p className="search-feedback" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "hostel matches" : "hostels match"} your
          search and filters.
        </p>
      </section>
      <div className="sample-banner">
        <BadgeCheck />
        <span>
          <b>Clear listing status:</b> “Details submitted” means the information
          and photos were provided. “Verified visit” appears only after an
          in-person check.
        </span>
      </div>
      <nav className="quick-categories" aria-label="Quick hostel categories">
        {[
          { id: "all", label: "All hostels" },
          { id: "verified", label: "Verified visits" },
          { id: "available", label: "Available" },
          { id: "essentials", label: "Water + electricity" },
          { id: "single", label: "Single rooms" },
          { id: "self-contained", label: "Self-contained" },
          { id: "shared", label: "Shared rooms" },
          { id: "near", label: "Near campus" },
        ].map((category) => (
          <button
            key={category.id}
            type="button"
            className={quickCategory === category.id ? "active" : ""}
            aria-pressed={quickCategory === category.id}
            onClick={() => setQuickCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </nav>
      <details className="multi-service-filter">
        <summary>
          Included services{" "}
          {selectedServices.length > 0 && (
            <b>{selectedServices.length} selected</b>
          )}
        </summary>
        <div>
          {[
            { id: "water", label: "Water" },
            { id: "electricity", label: "Electricity" },
            { id: "wifi", label: "Wi-Fi" },
            { id: "security", label: "Security" },
            { id: "kitchen", label: "Kitchen" },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              className={selectedServices.includes(item.id) ? "selected" : ""}
              aria-pressed={selectedServices.includes(item.id)}
              onClick={() =>
                setSelectedServices((current) =>
                  current.includes(item.id)
                    ? current.filter((value) => value !== item.id)
                    : [...current, item.id],
                )
              }
            >
              {item.label}
            </button>
          ))}
        </div>
        {selectedServices.length > 0 && (
          <small>
            Showing hostels with all {selectedServices.length} selected service
            {selectedServices.length === 1 ? "" : "s"}.
          </small>
        )}
      </details>
      <section className="catalog-section" id="hostels">
        <div className="catalog-heading">
          <div>
            <small>HOSTELS NEAR CAMPUS</small>
            <h2>
              {filtered.length} place{filtered.length === 1 ? "" : "s"}{" "}
              available
            </h2>
          </div>
          <span>Prices shown per semester</span>
        </div>
        {filtered.length ? (
          <div className="catalog-grid">
            {filtered.map((h) => (
              <article
                className={`catalog-card ${h.verification === "visited" ? "verified-card" : ""} ${h.featured ? "featured-card" : ""}`}
                key={h.name}
              >
                <div className="catalog-image">
                  <HostelCardGallery hostel={h} />
                  <div className="listing-labels">
                    {h.featured && (
                      <span className="featured-tag">
                        <Star fill="currentColor" /> FEATURED
                      </span>
                    )}
                    <span
                      className={`sample-tag ${h.verification === "visited" ? "verified-tag" : "submitted-tag"}`}
                    >
                      <BadgeCheck />
                      {h.verification === "visited"
                        ? "VERIFIED VISIT"
                        : "DETAILS SUBMITTED"}
                    </span>
                  </div>
                  <button
                    className={`save-hostel ${saved.includes(h.name) ? "saved" : ""}`}
                    onClick={() => toggleSave(h.name)}
                    aria-label={`Save ${h.name}`}
                  >
                    <Heart
                      fill={saved.includes(h.name) ? "currentColor" : "none"}
                    />
                  </button>
                  {h.available === false ? (
                    <b className="full-badge">FULLY OCCUPIED</b>
                  ) : (
                    <b>
                      <Star fill="currentColor" /> {h.rating}
                    </b>
                  )}
                </div>
                <div className="catalog-body">
                  <span className="catalog-location">
                    <MapPin />
                    {h.distance} from campus · {h.walk}
                  </span>
                  <h3>{h.name}</h3>
                  <p>
                    {h.area} · {h.roomTypes}
                  </p>
                  <div className="catalog-amenities">
                    {h.amenities.map((a) => (
                      <span key={a}>
                        {a === "Wi-Fi" ? (
                          <Wifi />
                        ) : a === "Water" ? (
                          <Droplets />
                        ) : (
                          <ShieldCheck />
                        )}
                        {a}
                      </span>
                    ))}
                  </div>
                  <div className="catalog-price">
                    <div>
                      <small>From</small>
                      <strong>UGX {h.price}</strong>
                      <span>
                        {h.rooms
                          ? `${h.rooms} rooms total · per semester`
                          : "Room count pending · per semester"}
                      </span>
                    </div>
                    <button onClick={() => openHostel(h)}>
                      {h.available === false
                        ? "Join waiting list"
                        : "View rooms"}{" "}
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <Search />
            <h3>
              {quickCategory === "verified"
                ? "No verified visits yet"
                : "No matching hostel"}
            </h3>
            <p>
              {quickCategory === "verified"
                ? "Hostels will appear here after an in-person verification check."
                : "Try another name, location or service."}
            </p>
          </div>
        )}
      </section>
      <section className="why">
        <h2>Book with confidence</h2>
        <div>
          <span>
            <BadgeCheck />
            <b>Compare clearly</b>
            <small>See room types, services and semester prices.</small>
          </span>
          <span>
            <ShieldCheck />
            <b>Confirm before paying</b>
            <small>The manager first confirms that a room is available.</small>
          </span>
          <span>
            <Phone />
            <b>Easy follow-up</b>
            <small>Call or track your request from My bookings.</small>
          </span>
        </div>
      </section>
      {selected && (
        <div className="market-modal" onClick={closeHostel}>
          <section
            className="listing-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-x"
              onClick={closeHostel}
              aria-label="Close hostel details"
            >
              <X />
            </button>
            {success ? (
              <div className="success">
                <BadgeCheck />
                <h2>
                  {selected.available === false
                    ? "Added to waiting list"
                    : "Request received"}
                </h2>
                <p>
                  Your reference is <b>{success}</b>.{" "}
                  {selected.available === false
                    ? "The hostel manager can contact you when a suitable room becomes available."
                    : "Wait for confirmation before paying."}
                </p>
                <a
                  className="submit-book"
                  style={{
                    display: "block",
                    margin: "18px 0 10px",
                    textDecoration: "none",
                  }}
                  href={enquiryWhatsApp(selected.name, success)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Continue on WhatsApp
                </a>
                <button onClick={closeHostel}>Done</button>
              </div>
            ) : (
              <>
                {selected.photos ? (
                  <div className="hostel-photo-grid">
                    {selected.photos.map((photo, i) => (
                      <img
                        key={photo}
                        src={photo}
                        alt={`${selected.name} ${["entrance", "room block", "inner section", "compound"][i] || `photo ${i + 1}`}`}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    className="modal-hostel-image"
                    src={selected.image}
                    alt={`View of ${selected.name}`}
                  />
                )}
                <div className="detail-header">
                  <span
                    className={`modal-kicker ${selected.verification === "visited" ? "verified-copy" : "submitted-copy"}`}
                  >
                    <BadgeCheck />
                    {selected.verification === "visited"
                      ? "VERIFIED VISIT"
                      : "DETAILS SUBMITTED"}
                  </span>
                  <div className="modal-title-row">
                    <h2>{selected.name}</h2>
                    <button type="button" onClick={() => shareHostel(selected)}>
                      <Share2 /> Share
                    </button>
                  </div>
                  <p>
                    <MapPin />
                    {selected.area}
                  </p>
                </div>
                {selected.available === false && (
                  <div className="availability-alert">
                    <ShieldCheck />
                    <span>
                      <b>Currently fully occupied</b>No rooms are available now.
                      Join the waiting list to be contacted when one opens.
                    </span>
                  </div>
                )}
                <section className="detail-section">
                  <h3>Room and price</h3>
                  <div className="modal-summary">
                    <span>
                      <MapPin />
                      {selected.distance} from campus · {selected.walk}
                    </span>
                    <span>
                      <BedDouble />
                      {selected.roomTypes}
                    </span>
                    {selected.singlePrice ? (
                      <>
                        <span>
                          <b>Single:</b> {selected.singlePrice} per semester
                        </span>
                        {selected.selfContainedPrice && (
                          <span>
                            <b>Self-contained:</b> {selected.selfContainedPrice}{" "}
                            per semester
                          </span>
                        )}
                      </>
                    ) : (
                      <span>
                        <b>UGX {selected.price}</b> per semester
                      </span>
                    )}
                  </div>
                </section>
                <section className="detail-section">
                  <h3>Included services</h3>
                  <div className="detail-amenities">
                    {selected.amenities.map((a) => (
                      <span key={a}>
                        {a.toLowerCase().includes("wi-fi") ? (
                          <Wifi />
                        ) : a.toLowerCase().includes("water") ? (
                          <Droplets />
                        ) : a.toLowerCase().includes("electric") ? (
                          <PlugZap />
                        ) : (
                          <ShieldCheck />
                        )}
                        {a}
                      </span>
                    ))}
                  </div>
                </section>
                {selected.details && (
                  <section className="detail-section">
                    <h3>What you should know</h3>
                    <div className="verified-facts">
                      {selected.details.map((detail, i) => (
                        <span key={detail}>
                          {i === 0 || i === 1 ? (
                            <BedDouble />
                          ) : i === 2 || i === 6 ? (
                            <Users />
                          ) : i === 4 ? (
                            <Armchair />
                          ) : i === 5 ? (
                            <PlugZap />
                          ) : (
                            <BadgeCheck />
                          )}
                          {detail}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                <div className="modal-links">
                  <a href={map(selected.name)} target="_blank" rel="noreferrer">
                    <MapPin /> View location
                  </a>
                  {selected.phone && (
                    <>
                      <a href={`tel:${selected.phone}`}>
                        <Phone /> Call
                      </a>
                      <a
                        href={enquiryWhatsApp(
                          selected.name,
                          undefined,
                          selected.phone,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                    </>
                  )}
                </div>
                <section className="request-section">
                  <div>
                    <small>
                      {selected.available === false
                        ? "WAITING LIST"
                        : "ROOM REQUEST"}
                    </small>
                    <h3>
                      {selected.available === false
                        ? "Get notified when a room opens"
                        : "Interested in this hostel?"}
                    </h3>
                    <p>
                      Your saved contact details are ready. Choose the room and
                      move-in date, then send your request.
                    </p>
                  </div>
                  <form id="room-request-form" onSubmit={submit}>
                    <label>
                      Full name
                      <input name="fullName" value={profile.fullName} readOnly />
                    </label>
                    <label>
                      Phone number
                      <input
                        name="phone"
                        inputMode="tel"
                        value={profile.phone}
                        readOnly
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        value={profile.email}
                        readOnly
                      />
                    </label>
                    <div>
                      <label>
                        Room type
                        <select name="roomType" required>
                          <option value="">Choose room</option>
                          <option>Single</option>
                          {(!selected.verified ||
                            selected.roomTypes
                              .toLowerCase()
                              .includes("double") ||
                            selected.roomTypes
                              .toLowerCase()
                              .includes("shared")) && (
                            <option>Double/shared</option>
                          )}
                          {selected.roomTypes
                            .toLowerCase()
                            .includes("self-contained") && (
                            <option>Self-contained</option>
                          )}
                        </select>
                      </label>
                      <label>
                        Gender
                        <select name="gender" required>
                          <option value="">Choose</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </label>
                    </div>
                    {selected.available === false && (
                      <label>
                        Maximum semester budget (UGX)
                        <input
                          name="maxBudget"
                          inputMode="numeric"
                          placeholder="e.g. 400000"
                          required
                        />
                      </label>
                    )}
                    <label>
                      {selected.available === false
                        ? "Preferred move-in date"
                        : "Expected move-in date"}
                      <input name="moveInDate" type="date" required />
                    </label>
                    {error && <p className="form-error">{error}</p>}
                    <button className="submit-book" disabled={sending}>
                      {sending
                        ? "Sending…"
                        : selected.available === false
                          ? "Join waiting list"
                          : "Request this room"}
                    </button>
                  </form>
                </section>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
