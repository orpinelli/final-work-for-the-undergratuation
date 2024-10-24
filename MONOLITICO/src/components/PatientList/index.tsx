import PatientCard from '../PatientCard';

interface Patient {
  id: string;
  name: string;
}

interface PatientListProps {
  patients: Patient[];
  onEdit?: (id: string) => void; // Torna `onEdit` opcional
  onNavigate: (id: string) => void;
}

export default function PatientList({ patients, onEdit, onNavigate }: PatientListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onEdit={onEdit} 
          onNavigate={onNavigate} 
        />
      ))}
    </div>
  );
}
