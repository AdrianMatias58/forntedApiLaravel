"use client"

import { useState } from "react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, UserX, UserCheck } from "lucide-react"

// Datos iniciales
const DATOS_INICIALES = [
  { id: "101", nombre: "Dr. Juan Pérez", especialidad: "Cardiología", activo: true },
  { id: "102", nombre: "Dra. Ana Gómez", especialidad: "Pediatría", activo: true },
  { id: "103", nombre: "Lic. Roberto Carlos", especialidad: "Enfermería", activo: false },
];

export default function TablaPersonal() {
  const [empleados, setEmpleados] = useState(DATOS_INICIALES)
  const [busqueda, setBusqueda] = useState("")
  const [metodoFiltro, setMetodoFiltro] = useState("nombre")

  // Función para inhabilitar/habilitar
  const toggleEstado = (id: string) => {
    setEmpleados(prev => prev.map(emp => 
      emp.id === id ? { ...emp, activo: !emp.activo } : emp
    ))
  }

  const empleadosFiltrados = empleados.filter((emp) => {
    const valor = emp[metodoFiltro as keyof typeof emp]?.toString().toLowerCase() || ""
    return valor.includes(busqueda.toLowerCase())
  })

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gestión de Personal Médico</CardTitle>
        </CardHeader>
        <CardContent>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Buscar por ${metodoFiltro}...`}
                className="pl-10"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="w-[200px]">
              <Select value={metodoFiltro} onValueChange={setMetodoFiltro}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">ID</SelectItem>
                  <SelectItem value="nombre">Nombre</SelectItem>
                  <SelectItem value="especialidad">Especialidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleadosFiltrados.map((emp) => (
                  <TableRow key={emp.id} className={!emp.activo ? "opacity-50" : ""}>
                    <TableCell className="font-mono text-xs">#{emp.id}</TableCell>
                    <TableCell className="font-medium">{emp.nombre}</TableCell>
                    <TableCell>{emp.especialidad}</TableCell>
                    <TableCell>
                      <Badge variant={emp.activo ? "default" : "destructive"}>
                        {emp.activo ? "Activo" : "Inhabilitado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => alert(`Editando a ${emp.nombre}`)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar Datos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className={emp.activo ? "text-destructive" : "text-green-600"}
                            onClick={() => toggleEstado(emp.id)}
                          >
                            {emp.activo ? (
                              <><UserX className="mr-2 h-4 w-4" /> Inhabilitar</>
                            ) : (
                              <><UserCheck className="mr-2 h-4 w-4" /> Habilitar</>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}