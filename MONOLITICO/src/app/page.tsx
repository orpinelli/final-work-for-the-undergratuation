'use client'

import { useState, useEffect } from 'react';
import PatientSearch from '@/components/PatientSearch';
import PatientList from '@/components/PatientList';
import AddPatientModal from '@/components/AddPatientModal';

interface Patient {
  id: string;
  name: string;
  cpf?: string;
  age?: number;
  height?: number;
  birthDate?: string;
}

export default function HomePage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleAddPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: String(Date.now()) };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const handleEditPatient = (id: string) => {
    const patientToEdit = patients.find((p) => p.id === id);
    if (patientToEdit) {
      setSelectedPatient(patientToEdit);
      setShowEditModal(true);
    }
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    const updatedPatients = patients.map((p) =>
      p.id === updatedPatient.id ? updatedPatient : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setShowEditModal(false);
  };

  const handleNavigateToPatient = (id: string) => {
    window.location.assign(`/paciente/${id}`);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Pacientes</h1>
      <PatientSearch onSearch={handleSearch} />
      <button 
        onClick={() => setShowAddModal(true)} 
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Adicionar Paciente
      </button>
      <PatientList 
        patients={filteredPatients} 
        onEdit={handleEditPatient}
        onNavigate={handleNavigateToPatient}
      />
      {showAddModal && (
        <AddPatientModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={(patient) => {
            handleAddPatient(patient);
            setShowAddModal(false);
          }}
        />
      )}
      {showEditModal && selectedPatient && (
        <AddPatientModal
          onClose={() => setShowEditModal(false)}
          onAdd={(patient) => handleUpdatePatient({ ...selectedPatient, ...patient })}
          initialData={selectedPatient} // Adicionar dados iniciais para edição
        />
      )}
    </div>
  );
}
