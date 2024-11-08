interface Patient {
  id: string;
  name: string;
}

interface PatientCardProps {
  patient: Patient;
  onEdit?: (id: string) => void; 
  onNavigate: (id: string) => void;
  onDelete?: (id: string) => void; 
}

export default function PatientCard({ patient, onEdit, onNavigate, onDelete }: PatientCardProps) {
  const handleCardClick = () => {
    onNavigate(patient.id);
  };

  return (
    <div 
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex justify-between items-center"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-semibold flex-grow">{patient.name}</h3>
      <div className="flex items-center">
        {onEdit && (
          <span 
            className="material-icons text-gray-500 hover:text-gray-700 cursor-pointer ml-2 text-lg"
            onClick={(e) => {
              e.stopPropagation(); 
              onEdit(patient.id);
            }}
          >
            edit
          </span>
        )}
        {onDelete && (
          <span 
            className="material-icons text-red-500 hover:text-red-700 cursor-pointer ml-2 text-lg"
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(patient.id);
            }}
          >
            delete
          </span>
        )}
      </div>
    </div>
  );
}
