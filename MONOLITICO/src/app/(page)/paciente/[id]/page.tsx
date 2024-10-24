'use client'

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

// Receba o ID diretamente através das props do Next.js 14 para páginas
export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Use `use()` para resolver `params` como uma Promise
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients) {
        const patients: Patient[] = JSON.parse(storedPatients);
        const foundPatient = patients.find((p) => p.id === id);
        setPatient(foundPatient || null);
      }
    }
  }, [id]);

  if (!patient) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Paciente</h1>
      <p><strong>Nome:</strong> {patient.name}</p>
      <p><strong>CPF:</strong> {patient.cpf || 'Não informado'}</p>
      <p><strong>Idade:</strong> {patient.age || 'Não informado'}</p>
      <p><strong>Altura:</strong> {patient.height ? `${patient.height} cm` : 'Não informado'}</p>
      <p><strong>Data de Nascimento:</strong> {patient.birthDate || 'Não informado'}</p>
    </div>
  );
}
