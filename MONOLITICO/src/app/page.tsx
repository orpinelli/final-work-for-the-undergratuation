'use client'
import { useState, useEffect } from 'react';
import PatientSearch from '@/components/PatientSearch';
import PatientList from '@/components/PatientList';
import AddPatientModal from '@/components/AddPatientModal';
import Header from '@/components/Header/page';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDeletePatient = (id: string) => {
    setPatientToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePatient = () => {
    if (patientToDelete) {
      const updatedPatients = patients.filter((p) => p.id !== patientToDelete);
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      setPatientToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleNavigateToPatient = (id: string) => {
    window.location.assign(`/paciente/${id}`);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-6">
        <Header />
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
        onDelete={handleDeletePatient}
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
          initialData={selectedPatient} 
        />
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg mb-4">Tem certeza que deseja excluir este paciente?</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDeletePatient} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
