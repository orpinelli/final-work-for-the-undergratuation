import { useState, useEffect, useRef } from 'react';

interface AddPatientModalProps {
  onClose: () => void;
  onAdd: (patient: {
    name: string;
    cpf?: string;
    age?: number;
    height?: number;
    birthDate?: string;
  }) => void;
  initialData?: { // Suporte a dados iniciais para edição
    name: string;
    cpf?: string;
    age?: number;
    height?: number;
    birthDate?: string;
  };
}

export default function AddPatientModal({ onClose, onAdd, initialData }: AddPatientModalProps) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [birthDate, setBirthDate] = useState('');
  
  // Criar uma referência para o modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCpf(initialData.cpf || '');
      setAge(initialData.age || '');
      setHeight(initialData.height || '');
      setBirthDate(initialData.birthDate || '');
    }
  }, [initialData]);

  // Detectar clique fora do modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Fechar o modal se o clique for fora dele
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAdd = () => {
    if (name) {
      onAdd({ name, cpf, age: age ? Number(age) : undefined, height: height ? Number(height) : undefined, birthDate });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Editar Paciente' : 'Adicionar Paciente'}</h2>
        <input 
          type="text" 
          placeholder="Nome (Obrigatório)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input 
          type="text" 
          placeholder="CPF" 
          value={cpf} 
          onChange={(e) => setCpf(e.target.value)} 
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input 
          type="number" 
          placeholder="Idade" 
          value={age} 
          onChange={(e) => setAge(e.target.valueAsNumber || '')} 
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input 
          type="number" 
          placeholder="Altura (cm)" 
          value={height} 
          onChange={(e) => setHeight(e.target.valueAsNumber || '')} 
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <input 
          type="date" 
          placeholder="Data de Nascimento" 
          value={birthDate} 
          onChange={(e) => setBirthDate(e.target.value)} 
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleAdd} 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {initialData ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}
