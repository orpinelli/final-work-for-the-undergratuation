'use client'
import Header from '@/components/Header/page';
import { useEffect, useState } from 'react';
import { use } from 'react';

interface Patient {
  id: string;
  name: string;
  cpf?: string;
  age?: number;
  height?: number;
  birthDate?: string;
}

interface MedicalRecord {
  patientId: string; 
  date: string;
  paymentDate?: string;
  description: string;
  prescription?: string;
  payment?: number;
}

export default function ProntuarioMedico({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [newRecord, setNewRecord] = useState<MedicalRecord>({
    patientId: id, 
    date: '',
    paymentDate: '',
    description: '',
    prescription: '',
    payment: 0,
  });
  const [editRecordIndex, setEditRecordIndex] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients) {
        const patients: Patient[] = JSON.parse(storedPatients);
        const foundPatient = patients.find((p) => p.id === id);
        setPatient(foundPatient || null);
      }

      const storedRecords = localStorage.getItem(`medical-records-${id}`);
      if (storedRecords) {
        setMedicalRecords(JSON.parse(storedRecords));
      }
    }
  }, [id]);

  const handleAddOrEditRecord = () => {
    if (newRecord.date && newRecord.description) {
      newRecord.patientId = id; 
      let updatedRecords;
      if (editRecordIndex !== null) {
        updatedRecords = [...medicalRecords];
        updatedRecords[editRecordIndex] = newRecord;
      } else {
        updatedRecords = [...medicalRecords, newRecord];
      }

      setMedicalRecords(updatedRecords);
      localStorage.setItem(`medical-records-${id}`, JSON.stringify(updatedRecords));
      setNewRecord({ patientId: id, date: '', paymentDate: '', description: '', prescription: '', payment: 0 });
      setEditRecordIndex(null);
    }
  };

  const handleEditRecord = (index: number) => {
    setNewRecord(medicalRecords[index]);
    setEditRecordIndex(index);
  };

  const handleDeleteRecord = (index: number) => {
    const updatedRecords = medicalRecords.filter((_, i) => i !== index);
    setMedicalRecords(updatedRecords);
    localStorage.setItem(`medical-records-${id}`, JSON.stringify(updatedRecords));
  };

  if (!patient) return <p>Carregando...</p>;

  return (
    <div className="p-6">
        <Header />
      <h1 className="text-2xl font-bold mb-6">Prontuário Médico - {patient.name}</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">{editRecordIndex !== null ? 'Editar Registro Médico' : 'Adicionar Novo Registro Médico'}</h2>
        <input 
          type="date"
          value={newRecord.date}
          onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <textarea 
          placeholder="Descrição do Atendimento"
          value={newRecord.description}
          onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <div className="flex gap-3">
          <input 
            type="number"
            placeholder="Valor Pago (R$)"
            value={newRecord.payment || ''}
            onChange={(e) => setNewRecord({ ...newRecord, payment: Number(e.target.value) })}
            className="w-1/2 p-2 border rounded-lg"
          />
          <input 
            type="date"
            placeholder="Data do Pagamento"
            value={newRecord.paymentDate || ''}
            onChange={(e) => setNewRecord({ ...newRecord, paymentDate: e.target.value })}
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>
        <textarea 
          placeholder="Prescrição (Opcional)"
          value={newRecord.prescription}
          onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
          className="w-full mb-3 p-2 border rounded-lg"
        />
        <button 
          onClick={handleAddOrEditRecord}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {editRecordIndex !== null ? 'Salvar Alterações' : 'Adicionar Registro'}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Histórico Médico</h2>
        {medicalRecords.length > 0 ? (
          <ul>
            {medicalRecords.map((record, index) => (
              <li key={index} className="mb-3 border-b pb-2 flex justify-between">
                <div>
                  <p><strong>Data da Sessão:</strong> {record.date}</p>
                  <p><strong>Descrição:</strong> {record.description}</p>
                  {record.prescription && <p><strong>Prescrição:</strong> {record.prescription}</p>}
                </div>
                <div className="flex gap-2 items-center">
                  {record.payment && (
                    <p className="mr-2">
                      <strong>Valor Pago:</strong> R$ {record.payment.toFixed(2)} 
                      <span className="text-gray-600 ml-2">({record.paymentDate || 'Data não informada'})</span>
                    </p>
                  )}
                  <button 
                    onClick={() => handleEditRecord(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteRecord(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum registro médico disponível.</p>
        )}
      </div>
    </div>
  );
}
