'use client';

import React, { useState } from "react";
import LabGrid from "./component/LabGrid";

const teacherUser: User = {
  name: "Aldaberto",
  email: "aldaberto@example.com",
  password: "securepassword",
  role: "professor",
};

const adminUser: User = {
  name: "Andarreto",
  email: "andarreto@example.com",
  password: "notsecurepassword",
  role: "admin",
};

const mockLabs = [
  { id: 1, name: "Quantum Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 20, location: "Building A", softwares: ["GitLab"] },
  { id: 2, name: "Nebula Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 15, location: "Building B", softwares: ["Arduino"] },
  { id: 3, name: "Photon Lab", status: "emManutencao" as "emManutencao", accessible: true, pcQuantity: 25, location: "Building C", softwares: ["Adobe Photoshop"] },
  { id: 4, name: "Cosmos Lab", status: "indisponiveis" as "indisponiveis", accessible: false, pcQuantity: 10, location: "Building D", softwares: ["GitLab"] },
  { id: 5, name: "Galaxy Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 30, location: "Building E", softwares: ["Arduino"] },
  { id: 6, name: "Astro Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 18, location: "Building F", softwares: ["Adobe Photoshop"] },
  { id: 7, name: "Nova Lab", status: "emManutencao" as "emManutencao", accessible: true, pcQuantity: 22, location: "Building G", softwares: ["GitLab"] },
  { id: 8, name: "Stellar Lab", status: "indisponiveis" as "indisponiveis", accessible: false, pcQuantity: 12, location: "Building H", softwares: ["Arduino"] },
  { id: 9, name: "Pulsar Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 28, location: "Building I", softwares: ["Adobe Photoshop"] },
  { id: 10, name: "Meteor Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 16, location: "Building J", softwares: ["GitLab"] },
  { id: 11, name: "Comet Lab", status: "emManutencao" as "emManutencao", accessible: true, pcQuantity: 24, location: "Building K", softwares: ["Arduino"] },
  { id: 12, name: "Orbit Lab", status: "indisponiveis" as "indisponiveis", accessible: false, pcQuantity: 14, location: "Building L", softwares: ["Adobe Photoshop"] },
  { id: 13, name: "Eclipse Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 26, location: "Building M", softwares: ["GitLab"] },
  { id: 14, name: "Aurora Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 19, location: "Building N", softwares: ["Arduino"] },
  { id: 15, name: "Zenith Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 32, location: "Building O", softwares: ["Adobe Photoshop"] },
  { id: 16, name: "Horizon Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 17, location: "Building P", softwares: ["GitLab"] },
  { id: 17, name: "Vortex Lab", status: "emManutencao" as "emManutencao", accessible: true, pcQuantity: 23, location: "Building Q", softwares: ["Arduino"] },
  { id: 18, name: "Celestial Lab", status: "indisponiveis" as "indisponiveis", accessible: false, pcQuantity: 11, location: "Building R", softwares: ["Adobe Photoshop"] },
  { id: 19, name: "Equinox Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 27, location: "Building S", softwares: ["GitLab"] },
  { id: 20, name: "Solstice Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 13, location: "Building T", softwares: ["Arduino"] },
  { id: 21, name: "Lunar Lab", status: "emManutencao" as "emManutencao", accessible: true, pcQuantity: 21, location: "Building U", softwares: ["Adobe Photoshop"] },
  { id: 22, name: "Solar Lab", status: "indisponiveis" as "indisponiveis", accessible: false, pcQuantity: 9, location: "Building V", softwares: ["GitLab"] },
  { id: 23, name: "Nebulae Lab", status: "disponiveis" as "disponiveis", accessible: true, pcQuantity: 29, location: "Building W", softwares: ["Arduino"] },
  { id: 24, name: "Galactic Lab", status: "bloqueados" as "bloqueados", accessible: false, pcQuantity: 20, location: "Building X", softwares: ["Adobe Photoshop"] }
];

interface Lab {
  id: number;
  name: string;
  status: "disponiveis" | "bloqueados" | "emManutencao" | "indisponiveis";
  accessible: boolean;
  pcQuantity: number;
  location: string;
  softwares: string[];
}

interface User {
  name: string;
  email: string;
  password: string;
  role: "professor" | "admin";
}

const HomePage = () => {
  const [accessibilityIncluded, setAccessibilityIncluded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pcQuantity, setPcQuantity] = useState<number|string>(0);
  const [selectedFilters, setSelectedFilters] = useState({
    disponiveis: true,
    bloqueados: true,
    emManutencao: true,
    indisponiveis: true,
  });
  const [softwareFilters, setSoftwareFilters] = useState<string[]>([]);

  const availableSoftwares = ["GitLab", "Arduino", "Adobe Photoshop"];
  const [ currentUser, setCurrentUser ] = useState<User>(teacherUser);

  const filteredLabs = mockLabs.filter((lab) => {
    const matchesStatus = selectedFilters[lab.status as keyof typeof selectedFilters];
    const matchesAccessibility = !accessibilityIncluded || lab.accessible;
    const matchesSearch = lab.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesPcQuantity = lab.pcQuantity >= Number(pcQuantity);
    return matchesStatus && matchesAccessibility && matchesSearch && matchesPcQuantity;
  }) as Lab[];

  const toggleSoftwareFilter = (software: string) => {
    if (softwareFilters.includes(software)) {
      setSoftwareFilters(softwareFilters.filter((s) => s !== software));
    } else {
      setSoftwareFilters([...softwareFilters, software]);
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [filter]: !selectedFilters[filter as keyof typeof selectedFilters],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-purple-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold" ><button onClick={()=>{
          currentUser?.role === "admin" ? setCurrentUser(teacherUser) : setCurrentUser(adminUser)
        }}>LAB MANAGER Corp</button></h1>
        <div className="flex ml-2 items-center flex-row-reverse">
          <div
            title="User avatar"
            className={`w-12 h-12 rounded-full ${currentUser?.role === "admin" ? "bg-violet-400" : "bg-purple-400"}`}
          />
          <div className="flex flex-col text-right">
            <h2 className="mr-2">{currentUser?.name}</h2>
            <span className="mr-2">{currentUser?.role}</span>
          </div>
        </div>
      </header>
      <main className="p-6">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="w-64 bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-4">Filtros</h2>
            <div className="mb-4">
              <label className="block mb-2">Qtde computadores mín.</label>
              <input
              type="number"
              className="w-full border p-2 rounded"
              value={pcQuantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setPcQuantity(value && value >= 0 ? value : "");
              }}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={accessibilityIncluded}
                  onChange={() =>
                    setAccessibilityIncluded(!accessibilityIncluded)
                  }
                />
                <span className="ml-2">Acessibilidade inclusa</span>
              </label>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Status</h3>
              {["disponiveis", "bloqueados", "emManutencao", "indisponiveis"].map(
                (filter) => (
                  <label key={filter} className="block mb-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters[filter as keyof typeof selectedFilters]}
                      onChange={() => handleFilterChange(filter)}
                    />
                    <span className="ml-2 capitalize">{filter}</span>
                  </label>
                )
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Softwares instalados</h3>
              {availableSoftwares.map((software) => (
                <label key={software} className="block mb-2">
                  <input
                    className=""
                    type="checkbox"
                    checked={softwareFilters.includes(software)}
                    onChange={() => toggleSoftwareFilter(software)}
                  />
                  <span className="ml-2">{software}</span>
                </label>
              ))}
            </div>
          </aside>
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Pesquisar laboratório..."
                className="w-full border p-2 rounded focus:outline-purple-700"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <LabGrid filteredLabs={filteredLabs} user={currentUser}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
