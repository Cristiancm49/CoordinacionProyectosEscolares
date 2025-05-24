export async function getProyectosAsignados(idUsuario) {
    const res = await fetch(`http://localhost:4000/api/estudiantes/${idUsuario}/proyectos`);
    if (!res.ok) throw new Error('Error al obtener proyectos');
    return await res.json();
  }
  