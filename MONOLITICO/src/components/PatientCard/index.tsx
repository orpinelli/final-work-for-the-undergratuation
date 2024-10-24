interface Patient {
  id: string;
  name: string;
}

interface PatientCardProps {
  patient: Patient;
  onEdit?: (id: string) => void; // Torna `onEdit` opcional
  onNavigate: (id: string) => void;
}

export default function PatientCard({ patient, onEdit, onNavigate }: PatientCardProps) {
  const handleCardClick = () => {
    onNavigate(patient.id);
  };

  return (
    <div 
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex justify-between items-center"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-semibold flex-grow">{patient.name}</h3>
      <span className="material-symbols-outlined"
          onClick={(e) => {
            e.stopPropagation(); 
            if (onEdit) {
              onEdit(patient.id);
            }
          }}
        >
   <svg xmlns="http://www.w3.org/2000/svg"
      height="24px" viewBox="0 -960 960 960" 
      width="24px" fill="#5f6368">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 5
        6q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
      </span>
    </div>
  );
}
