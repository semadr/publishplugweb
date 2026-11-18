import type { SourceType } from "./pricing";

export const SOURCE_OPTIONS: {
  value: SourceType;
  label: string;
  blurb: string;
  needs: string;
}[] = [
  {
    value: "idea",
    label: "Idea or outline",
    blurb: "You have the idea; our ghostwriters write the book with you.",
    needs: "Ghostwriting is ₦2 per word of the finished book.",
  },
  {
    value: "manuscript",
    label: "Raw manuscript",
    blurb: "A finished or rough draft, ready for editing and design.",
    needs: "Upload a .docx, .pdf or .txt file in your workspace.",
  },
  {
    value: "audio",
    label: "Audio recording",
    blurb: "Talks, voice notes or sermons shaped into a readable book.",
    needs: "Upload .mp3, .m4a or .wav files (up to 200 MB each).",
  },
  {
    value: "monograph",
    label: "Monograph",
    blurb: "Academic research rewritten for a general reader.",
    needs: "You must confirm you still hold the rights to the text.",
  },
  {
    value: "interview",
    label: "Interview",
    blurb: "Recorded conversations turned into a structured book.",
    needs: "A signed consent form is required from every interviewee.",
  },
];

export const MODULE_LABELS: Record<string, { name: string; pillar: string }> = {
  A: { name: "Create", pillar: "Content" },
  B: { name: "Design", pillar: "Book design" },
  C: { name: "Publish", pillar: "Formats" },
  D: { name: "Launch & distribute", pillar: "Marketing and distribution" },
  P: { name: "Packages", pillar: "All-in-one" },
};

export const GENRES = [
  "Fiction",
  "Memoir & biography",
  "Business",
  "Self-help",
  "Faith & spirituality",
  "Children's",
  "Poetry",
  "Academic & non-fiction",
  "Other",
];

export const TRIM_SIZES = [
  { value: "5x8", label: '5 × 8 in' },
  { value: "5.5x8.5", label: '5.5 × 8.5 in' },
  { value: "6x9", label: '6 × 9 in' },
  { value: "8.5x11", label: '8.5 × 11 in' },
];
