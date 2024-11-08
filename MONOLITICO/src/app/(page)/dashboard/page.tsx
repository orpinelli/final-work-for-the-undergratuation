'use client';

import { useEffect, useState } from 'react';

interface Patient {
  id: string;
  name: string;
}

interface MedicalRecord {
  patientId: string;
  date: string; // Data da sessão
  paymentDate?: string; // Data do pagamento
  description: string;
  payment?: number;
}

export default function Dashboard() {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [payments, setPayments] = useState<{ patientName: string; sessionDate: string; paymentDate: string; amount: number }[]>([]);
  const [sessionsCount, setSessionsCount] = useState<number>(0);
  const [averageIncomePerSession, setAverageIncomePerSession] = useState<number>(0);

  useEffect(() => {

    const storedPatients = localStorage.getItem('patients');
    const storedRecords = Object.keys(localStorage)
      .filter(key => key.startsWith('medical-records-'))
      .map(key => JSON.parse(localStorage.getItem(key) || '[]'))
      .flat() as MedicalRecord[];

    if (storedPatients) {
      const patients: Patient[] = JSON.parse(storedPatients);

      let total = 0;
      let sessions = 0;
      const paymentDetails: { patientName: string; sessionDate: string; paymentDate: string; amount: number }[] = [];

      storedRecords.forEach(record => {
        if (record.payment) {
          const patient = patients.find(p => p.id === record.patientId);
          if (patient) {
            total += record.payment;
            sessions += 1;
            paymentDetails.push({
              patientName: patient.name,
              sessionDate: record.date,
              paymentDate: record.paymentDate || 'Data não informada',
              amount: record.payment,
            });
          }
        }
      });

      const average = sessions ? total / sessions : 0;

      setTotalIncome(total);
      setPayments(paymentDetails);
      setSessionsCount(sessions);
      setAverageIncomePerSession(average);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Financeiro</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Resumo Financeiro Total</h2>
        <p><strong>Total de Receitas:</strong> R$ {totalIncome.toFixed(2)}</p>
        <p><strong>Total de Sessões:</strong> {sessionsCount}</p>
        <p><strong>Média por Sessão:</strong> R$ {averageIncomePerSession.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Pagamentos Registrados</h2>
        {payments.length > 0 ? (
          <ul>
            {payments.map((payment, index) => (
              <li key={index} className="mb-3 border-b pb-2">
                <p><strong>Paciente:</strong> {payment.patientName}</p>
                <p><strong>Data da Sessão:</strong> {payment.sessionDate}</p>
                <p><strong>Data do Pagamento:</strong> {payment.paymentDate}</p>
                <p><strong>Valor Pago:</strong> R$ {payment.amount.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum pagamento registrado.</p>
        )}
      </div>
    </div>
  );
}

