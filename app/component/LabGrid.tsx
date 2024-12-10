import { useState } from "react";

interface Lab {
  id: number;
  name: string;
  status: "disponiveis" | "bloqueados" | "emManutencao" | "indisponiveis";
  accessible: boolean;
  pcQuantity: number;
  location: string;
  softwares: string[];
}

interface ReservationRequest {
  labId: number;
  professorName: string;
  labName: string;
}

interface User {
  name: string;
  email: string;
  password: string;
  role: "professor" | "admin";
}

interface LabGridProps {
  filteredLabs: Lab[];
  user: User;
}

const LabGrid = ({ filteredLabs, user }: LabGridProps) => {
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [labDetails, setLabDetails] = useState<Lab | null>(null);
  const [reservationRequests, setReservationRequests] = useState<ReservationRequest[]>([]);

  const handleEdit = (lab: Lab) => {
    setEditMode(true);
    setLabDetails(lab);
  };

  const handleSave = () => {
    // Save logic here
    setEditMode(false);
    setSelectedLab(null);
  };

  const handleRequestReservation = (lab: Lab) => {
    setReservationRequests([...reservationRequests, { labId: lab.id, professorName: user.name, labName: lab.name }]);
    alert(`Request to reserve ${lab.name} has been sent.`);
  };

  const handleApproveRequest = (request: ReservationRequest) => {
    // Approve logic here
    alert(`Reservation for ${request.labName} by ${request.professorName} has been approved.`);
    setReservationRequests(reservationRequests.filter((r) => r !== request));
  };

  const handleRejectRequest = (request: ReservationRequest) => {
    // Reject logic here
    alert(`Reservation for ${request.labName} by ${request.professorName} has been rejected.`);
    setReservationRequests(reservationRequests.filter((r) => r !== request));
  };

  return (
    <div>
      {/* Grid de laboratórios */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className={`p-4 rounded shadow text-center cursor-pointer ${
                lab.status === "disponiveis"
                  ? "bg-green-50 border border-green-200"
                  : lab.status === "emManutencao"
                  ? "bg-yellow-50 border border-yellow-200"
                  : lab.status === "bloqueados"
                  ? "bg-red-50 border border-red-200"
                  : "bg-gray-50 border border-gray-200"
              }`}
              onClick={() => setSelectedLab(lab)}
            >
              <div className="relative h-16 w-full bg-gray-300 rounded mb-4">
                {lab.accessible && (
                  <span
                    className="absolute top-2 right-2 text-blue-500 text-lg"
                    title="Acessível"
                  >
                    ♿
                  </span>
                )}
                {lab.status === "disponiveis" && (
                  <span
                    className="absolute bottom-2 right-2 text-green-500 text-lg"
                    title="Disponível"
                  >
                    ✔
                  </span>
                )}
                {lab.status === "emManutencao" && (
                  <span
                    className="absolute bottom-2 right-2 text-yellow-500 text-lg"
                    title="Em manutenção"
                  >
                    ⚙
                  </span>
                )}
                {lab.status === "bloqueados" && (
                  <span
                    className="absolute bottom-2 right-2 text-red-500 text-lg"
                    title="Bloqueado"
                  >
                    ✖
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{lab.name}</h3>
              <p className="text-sm text-gray-600">
                <span
                  className={`font-bold ${
                    lab.status === "disponiveis"
                      ? "text-green-600"
                      : lab.status === "emManutencao"
                      ? "text-yellow-600"
                      : lab.status === "bloqueados"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {lab.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Acessível:{" "}
                <span className={lab.accessible ? "text-blue-600" : "text-gray-500"}>
                  {lab.accessible ? "Sim" : "Não"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Qtde computadores: <span className="text-gray-800">{lab.pcQuantity}</span>
              </p>
              {user.role === "professor" && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                  onClick={() => handleRequestReservation(lab)}
                >
                  Pedir para reservar
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum laboratório encontrado.</p>
      )}

      {/* Modal */}
      {selectedLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            {editMode && user.role === "admin" ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Editar {labDetails?.name}</h2>
                <label className="block mb-2">
                  Nome:
                  <input
                    type="text"
                    value={labDetails?.name}
                    onChange={(e) => setLabDetails({ ...labDetails!, name: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
                <label className="block mb-2">
                  Status:
                  <select
                    value={labDetails?.status}
                    onChange={(e) => setLabDetails({ ...labDetails!, status: e.target.value as Lab["status"] })}
                    className="border p-2 rounded w-full"
                  >
                    <option value="disponiveis">Disponíveis</option>
                    <option value="bloqueados">Bloqueados</option>
                    <option value="emManutencao">Em Manutenção</option>
                    <option value="indisponiveis">Indisponíveis</option>
                  </select>
                </label>
                <label className="block mb-2">
                  Acessível:
                  <input
                    type="checkbox"
                    checked={labDetails?.accessible}
                    onChange={(e) => setLabDetails({ ...labDetails!, accessible: e.target.checked })}
                    className="ml-2"
                  />
                </label>
                <label className="block mb-2">
                  Quantidade de computadores:
                  <input
                    type="number"
                    value={labDetails?.pcQuantity}
                    onChange={(e) => setLabDetails({ ...labDetails!, pcQuantity: parseInt(e.target.value) })}
                    className="border p-2 rounded w-full"
                  />
                </label>
                <label className="block mb-2">
                  Localização:
                  <input
                    type="text"
                    value={labDetails?.location}
                    onChange={(e) => setLabDetails({ ...labDetails!, location: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </label>
                <label className="block mb-2">
                  Softwares instalados:
                  <input
                    type="text"
                    value={labDetails?.softwares.join(", ")}
                    onChange={(e) => setLabDetails({ ...labDetails!, softwares: e.target.value.split(", ") })}
                    className="border p-2 rounded w-full"
                  />
                </label>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => setEditMode(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">{selectedLab.name}</h2>
                <p>Status: {selectedLab.status}</p>
                <p>Acessível: {selectedLab.accessible ? "Sim" : "Não"}</p>
                <p>Quantidade de computadores: {selectedLab.pcQuantity}</p>
                <p>Localização: {selectedLab.location}</p>
                <p>
                  Softwares instalados:{" "}
                  {selectedLab.softwares.length > 0
                    ? selectedLab.softwares.join(", ")
                    : "Nenhum software"}
                </p>
                {user.role === "admin" && (
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                      onClick={() => handleEdit(selectedLab)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => setSelectedLab(null)}
                    >
                      Fechar
                    </button>
                  </div>
                )}
                {user.role === "professor" && (
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => setSelectedLab(null)}
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reservation Requests for Admin */}
      {user.role === "admin" && reservationRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Reservation Requests</h2>
          <ul>
            {reservationRequests.map((request, index) => (
              <li key={index} className="mb-4 p-4 border rounded shadow">
                <p>
                  <strong>Professor:</strong> {request.professorName}
                </p>
                <p>
                  <strong>Lab:</strong> {request.labName}
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    onClick={() => handleApproveRequest(request)}
                  >
                    Aprovar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleRejectRequest(request)}
                  >
                    Rejeitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LabGrid;
