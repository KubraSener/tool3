
import React, { useState } from 'react';

const DropdownForm = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [activeRules, setActiveRules] = useState([]);
  const [selectedAbTesting, setSelectedAbTesting] = useState('');
  const [selectedBudgetType, setSelectedBudgetType] = useState('');

  const platforms = ['Google', 'Facebook', 'LinkedIn'];
  const accounts = ['Kübra Şener', 'Melih Erpek', 'Buse Elbirlik'];
  const rules = {
    Google: [
      { name: 'Budget', inputType: 'number' },
      { name: 'Campaign Name', inputType: 'text' },
      { name: 'Target GBM budget', inputType: 'number' },
      { name: 'Keywords', inputType: 'text' },
      { name: 'Ad Group Name', inputType: 'text' },
    ],
    Facebook: [
      { name: 'Budget', inputType: 'number' },
      { name: 'Campaign Name', inputType: 'text' },
      { name: 'A/B Testing', inputType: 'radio', options: ['Yes', 'No'] },
      { name: 'Budget Type', inputType: 'dropdown', options: ['Daily Budget', 'Lifetime Budget'] },
      { name: 'Ad Set Name', inputType: 'text' },
    ],
    LinkedIn: [
      { name: 'Budget', inputType: 'number' },
      { name: 'Currency', inputType: 'dropdown', options: ['TL', 'USD', 'EURO'] },
    ],
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
    setActiveRules([]);
    setSelectedAbTesting('');
    setSelectedBudgetType('');
  };

  const handleRuleClick = (rule) => {
    setActiveRules((prev) => (
      prev.includes(rule) ? prev.filter(r => r !== rule) : [...prev, rule]
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <label className="text-red-400">Select Platform</label>
      <select
        value={selectedPlatform}
        onChange={handlePlatformChange}
        className="w-full py-2 px-3 border rounded-md"
      >
        <option value="">Select a platform</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </select>

      {selectedPlatform && (
        <>
          <div className="mt-4">
            <label className="block text-lg font-medium mb-2 text-red-400">Select Account</label>
            <select className="w-full py-2 px-3 border rounded-md">
              {accounts.map((account) => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2 text-red-500">Select Rules</h3>
            <div className="flex flex-wrap gap-2">
              {rules[selectedPlatform].map((rule) => (
                <button
                  key={rule.name}
                  onClick={() => handleRuleClick(rule.name)}
                  className={`py-2 px-4 rounded-full border ${activeRules.includes(rule.name) ? 'bg-red-500 text-white border-red-500' : 'bg-white text-red-500 border-red-500'
                    }`}
                >
                  {rule.name}
                </button>
              ))}
            </div>
          </div>

          {activeRules.map((rule) => {
            const ruleConfig = rules[selectedPlatform].find(r => r.name === rule);
            return (
              <div key={rule} className="mt-4">
                <label className="block text-sm font-medium mb-1">{rule}</label>
                {ruleConfig.inputType === 'text' && (
                  <input type="text" className="w-full py-2 px-3 border rounded-md" />
                )}
                {ruleConfig.inputType === 'number' && (
                  <input type="number" className="w-full py-2 px-3 border rounded-md" />
                )}
                {ruleConfig.inputType === 'checkbox' && (
                  <input type="checkbox" className="w-full py-2 px-3 border rounded-md" />
                )}
                {ruleConfig.inputType === 'radio' && (
                  <div className="flex gap-2">
                    {ruleConfig.options.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name={rule}
                          value={option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                {ruleConfig.inputType === 'dropdown' && (
                  <select className="w-full py-2 px-3 border rounded-md">
                    {ruleConfig.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
        </>
      )}

      <button type="button" className="w-full py-2 px-4 bg-red-500 text-white rounded-md text-lg mt-5">
        Submit
      </button>
    </div>
  );
};

export default DropdownForm;



