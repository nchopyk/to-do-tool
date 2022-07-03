module.exports = {
  toBaseDto: (rawSectionData) => ({
    id: rawSectionData.id,
    name: rawSectionData.name,
  }),

  toDetailDto: () => ({})

};
