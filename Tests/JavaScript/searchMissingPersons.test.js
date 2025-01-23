//JavaScript test file using jest for searchMissingPersons function


const searchMissingPersons = require('./searchMissingPersons');

describe('searchMissingPersons Function', () => {
  const sampleData = [
    {
      caseID: '123',
      physical: { name: 'John Doe', age: 20, height: "5'11", weight: '180 lbs', hair: 'Brown' },
      dateAndLocation: { date: '2025-01-01', location: 'Oklahoma City' },
      description: 'Last seen getting mail',
      contactInfo: { phone: '123-456-7890', email: 'email@example.com' },
      classification: 'Endangered',
    },
    {
      caseID: '124',
      physical: { name: 'Bobby Bob' },
      dateAndLocation: { location: 'Norman, Oklahoma' },
      description: 'Last seen walking on campus',
      classification: 'Catastrophe',
    },
  ];
    
  test('should return matching records by case ID', () => {
    const result = searchMissingPersons('123', sampleData);
    expect(result).toHaveLength(1);
    expect(result[0].physical.name).toBe('John Doe');
  });

  test('should return matching records by location', () => {
    const result = searchMissingPersons('Oklahoma City', sampleData);
    expect(result).toHaveLength(1);
    expect(result[0].dateAndLocation.location).toBe('Oklahoma City');
  });

  test('should return matching records by classification', () => {
    const result = searchMissingPersons('Catastrophe', sampleData);
    expect(result).toHaveLength(1);
    expect(result[0].classification).toBe('Catastrophe');
  });

  test('should return matching records by partial name', () => {
    const result = searchMissingPersons('Bobby', sampleData);
    expect(result).toHaveLength(1);
    expect(result[0].physical.name).toBe('Bobby Bob');
  });

  test('should return an empty array if no matches are found', () => {
    const result = searchMissingPersons('Texas', sampleData);
    expect(result).toEqual([]);
  });

  test('should handle case-insensitive search', () => {
    const result = searchMissingPersons('jOhN', sampleData);
    expect(result).toHaveLength(1);
    expect(result[0].physical.name).toBe('John Doe');
  });

  test('should return an empty array if criteria is not provided', () => {
    const result = searchMissingPersons('', sampleData);
    expect(result).toEqual([]);
  });

  test('should return multiple matches for shared criteria', () => {
    const result = searchMissingPersons('Oklahoma', sampleData);
    expect(result).toHaveLength(2);
    expect(result[0].dateAndLocation.location).toContain('Oklahoma');
    expect(result[1].dateAndLocation.location).toContain('Oklahoma');
  });
});
