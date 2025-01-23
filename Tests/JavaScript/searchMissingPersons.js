const searchMissingPersons = (criteria, data) => {
    if (!criteria || !data || !Array.isArray(data)) return [];
  
    return data.filter(person => {
      // Check if any of the criteria match (case-insensitive)
      const matchesCaseID = person.caseID.toLowerCase().includes(criteria.toLowerCase());
      const matchesName = person.physical.name.toLowerCase().includes(criteria.toLowerCase());
      const matchesLocation = person.dateAndLocation.location.toLowerCase().includes(criteria.toLowerCase());
      const matchesDescription = person.description.toLowerCase().includes(criteria.toLowerCase());
      const matchesClassification = person.classification.toLowerCase().includes(criteria.toLowerCase());
  
      return matchesCaseID || matchesName || matchesLocation || matchesDescription || matchesClassification;
    });
  };
  
  module.exports = searchMissingPersons;
  