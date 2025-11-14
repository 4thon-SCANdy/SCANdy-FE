export const TAG_COLOR_MAP = {
  0: "#2BE99A",
  1: "#50B0FF",
  2: "#525252",
  3: "#986DFF",
  4: "#A0D4FF",
  5: "#A6FBD7",
  6: "#AEAEAE",
  7: "#D9C9FF",
  8: "#E8E8E8",
  9: "#F6553C",
  10: "#FE72C1",
  11: "#FFA091",
  12: "#FFC9E8",
  13: "#FFD258",
  14: "#FFEBB5",
};

export const getTagColor = (index) => TAG_COLOR_MAP[index] || "#000000";

export const getColorIndex = (hex) => {
  const entry = Object.entries(TAG_COLOR_MAP).find(
    ([, value]) => value.toLowerCase() === hex.toLowerCase()
  );
  return entry ? Number(entry[0]) : null;
};
