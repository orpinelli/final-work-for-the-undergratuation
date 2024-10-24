import { useState } from 'react';

interface PatientSearchProps {
  onSearch: (query: string) => void;
}

export default function PatientSearch({ onSearch }: PatientSearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex gap-2 mb-5">
      <input 
        type="text" 
        placeholder="Buscar Paciente..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="flex-1 p-2 rounded-lg border border-gray-300"
      />
      <button 
        onClick={handleSearch} 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Pesquisar
      </button>
    </div>
  );
}
