export interface Site {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  features?: string[];
  photoCaption?: string;
}

export interface Connection {
  id: string;
  name: string;
  sites: string[];
  description: string;
}

export interface Observation {
  id: string;
  siteId: string;
  timestamp: string;
  note: string;
  videoTitle: string;
  videoChannel: string;
}

export const sites: Record<string, Site> = {
  sacsayhuaman: {
    id: "sacsayhuaman",
    name: "Sacsayhuamán",
    location: "Cusco, Peru",
    coordinates: [-13.5094, -71.9828],
    features: ["Polygonal masonry"],
    photoCaption: "Tight-fitting blocks without mortar.",
  },
  delphi: {
    id: "delphi",
    name: "Delphi",
    location: "Phocis, Greece",
    coordinates: [38.4824, 22.5010],
    features: ["Polygonal masonry"],
  },
  osaka: {
    id: "osaka",
    name: "Osaka Castle",
    location: "Osaka, Japan",
    coordinates: [34.6873, 135.5262],
    features: ["Polygonal masonry"],
  },
  edo: {
    id: "edo",
    name: "Edo Castle",
    location: "Tokyo, Japan",
    coordinates: [35.6852, 139.7528],
    features: ["Polygonal masonry"],
  },
  cusco: {
    id: "cusco",
    name: "Cusco Foundations",
    location: "Cusco, Peru",
    coordinates: [-13.5170, -71.9785],
    features: ["Polygonal masonry"],
  },
};

export const polygonalMasonryConnection: Connection = {
  id: "polygonal-masonry",
  name: "Polygonal masonry",
  sites: ["sacsayhuaman", "delphi", "osaka", "edo", "cusco"],
  description:
    "Similar stonework shows up in different places and contexts. Stone Atlas keeps the comparison with the evidence, so explanations can be weighed against what's actually there.",
};

export const sampleObservation: Observation = {
  id: "obs-1",
  siteId: "sacsayhuaman",
  timestamp: "12:43",
  note: "The curves don't make sense for simple hand tools.",
  videoTitle: "Sacsayhuamán: Impossible Masonry?",
  videoChannel: "Uncharted History",
};

export type TourStop = "idle" | "stop1" | "stop2" | "stop3" | "stop4" | "free";

export interface TourStopConfig {
  id: TourStop;
  label: string;
  center: [number, number];
  zoom: number;
  activeSites: string[];
  showConnections: boolean;
}

export const tourStops: TourStopConfig[] = [
  {
    id: "idle",
    label: "",
    center: [20, 0],
    zoom: 2,
    activeSites: [],
    showConnections: false,
  },
  {
    id: "stop1",
    label: "One place",
    center: [-13.5094, -71.9828],
    zoom: 15,
    activeSites: ["sacsayhuaman"],
    showConnections: false,
  },
  {
    id: "stop2",
    label: "A pattern",
    center: [15, 40],
    zoom: 2,
    activeSites: ["sacsayhuaman", "delphi", "osaka", "edo", "cusco"],
    showConnections: true,
  },
  {
    id: "stop3",
    label: "From a video",
    center: [-13.5094, -71.9828],
    zoom: 14,
    activeSites: ["sacsayhuaman"],
    showConnections: false,
  },
  {
    id: "stop4",
    label: "The record",
    center: [-13.5094, -71.9828],
    zoom: 15,
    activeSites: ["sacsayhuaman"],
    showConnections: false,
  },
];

export const tourCopy = {
  entry: {
    body: "A shared atlas of ancient sites — videos, sources, and notes kept with the places they belong to.",
    primaryButton: "Start a short tour",
    secondaryButton: "Explore freely",
    micro: "About two minutes. You can leave anytime.",
  },
  leaveDialog: {
    title: "Leave the tour?",
    body: "You'll stay on the map where you are.",
    keepGoing: "Keep going",
    exploreFree: "Explore freely",
  },
  stop1: {
    cardTitle: "Sacsayhuamán",
    cardMeta: "Cusco, Peru",
    featureChip: "Polygonal masonry",
    body: "Start with a place and what's been noticed there.",
    photoCaption: "Tight-fitting blocks without mortar.",
    control: "View site record",
    next: "See where else this shows up",
  },
  stop2: {
    panelTitle: "Polygonal masonry",
    meta: "5 places",
    body: "Similar stonework shows up in different places and contexts. Stone Atlas keeps the comparison with the evidence, so explanations can be weighed against what's actually there.",
    next: "How a video moment is kept",
  },
  stop3: {
    sectionLines: [
      "Observations can be pinned to a place, and to a moment in a video.",
      "YouTube and Facebook comments can help build the database instead of getting buried.",
    ],
    videoTitle: "Sacsayhuamán: Impossible Masonry?",
    videoChannel: "Uncharted History",
    timestamp: "12:43",
    observationNote: "The curves don't make sense for simple hand tools.",
    addNote: "In the atlas, this note stays on the site.",
    next: "What stays on the record",
  },
  stop4: {
    panelTitle: "Sacsayhuamán",
    panelSubtitle: "Site record",
    items: {
      correction: {
        title: "Correction",
        detail: "Material updated: granite → andesite",
        byline: "Yuki · 1 week ago",
        source: "1982 excavation report (English translation)",
      },
      photograph: {
        caption: "Wall detail, north face",
        byline: "Mateo · 2 weeks ago",
      },
      source: {
        title: "Protzen, J.P. (1993). Inca Architecture and Construction at Ollantaytambo",
        meta: "Oxford University Press",
      },
      explanation: {
        title: "Could similar building constraints explain the resemblance?",
        status: "Open",
        body: "Explanations live in the atlas too. People can add evidence, counterexamples, or another reading.",
        actions: ["Support", "Challenge", "Add evidence"],
      },
    },
    closing: [
      "Corrections, sources, and claims stay with the record they change.",
      "If you want to look around on your own, the map is open.",
    ],
    primaryCta: "Explore freely",
    secondaryCta: "Share a note",
    textLink: "Create an account",
  },
  afterTourTip: "Click any site to open its record. Connections and videos stay attached.",
  tipDismiss: "Got it",
};
