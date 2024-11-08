import PatientCard from '../PatientCard';

interface Patient {
  id: string;
  name: string;
}

interface PatientListProps {
  patients: Patient[];
  onEdit?: (id: string) => void; 
  onNavigate: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PatientList({ patients, onEdit, onNavigate, onDelete }: PatientListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onEdit={onEdit} 
          onNavigate={onNavigate} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
