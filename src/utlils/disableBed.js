export const isBedsDisabled = (selectedPropertyType) => {
  return (
    selectedPropertyType === "plot" || selectedPropertyType === "commercial"
  );
};
