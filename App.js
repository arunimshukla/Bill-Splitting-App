import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle } from 'lucide-react';

const BillSplittingApp = () => {
  const [totalBill, setTotalBill] = useState(100);
  const [people, setPeople] = useState([
    { name: 'Person 1', percentage: 50 },
    { name: 'Person 2', percentage: 50 },
  ]);

  useEffect(() => {
    adjustPercentages();
  }, [people]);

  const adjustPercentages = () => {
    const totalPercentage = people.reduce((sum, person) => sum + person.percentage, 0);
    if (totalPercentage !== 100) {
      const diff = 100 - totalPercentage;
      const newPeople = [...people];
      newPeople[0].percentage += diff;
      setPeople(newPeople);
    }
  };

  const handlePercentageChange = (index, newValue) => {
    const newPeople = [...people];
    newPeople[index].percentage = newValue[0];
    setPeople(newPeople);
  };

  const addPerson = () => {
    if (people.length < 10) {
      setPeople([...people, { name: `Person ${people.length + 1}`, percentage: 0 }]);
    }
  };

  const removePerson = (index) => {
    if (people.length > 2) {
      const newPeople = people.filter((_, i) => i !== index);
      setPeople(newPeople);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Bill Splitting App</h1>
      <div className="mb-6">
        <label className="block mb-2">Total Bill:</label>
        <Input
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(parseFloat(e.target.value) || 0)}
          className="bg-gray-800 text-white"
        />
      </div>
      {people.map((person, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span>{person.name}</span>
            <span>${(totalBill * person.percentage / 100).toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <Slider
              value={[person.percentage]}
              onValueChange={(newValue) => handlePercentageChange(index, newValue)}
              max={100}
              step={1}
              className="flex-grow mr-4"
            />
            <span className="w-12 text-right">{person.percentage}%</span>
            {index > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePerson(index)}
                className="ml-2"
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
      <Button onClick={addPerson} disabled={people.length >= 10} className="mb-4">
        <PlusCircle className="h-4 w-4 mr-2" /> Add Person
      </Button>
      <div className="mt-6 text-xl font-semibold">
        Total: ${totalBill.toFixed(2)} (100%)
      </div>
    </div>
  );
};

export default BillSplittingApp;
